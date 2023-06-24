import { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Skeleton,
  styled,
  Theme,
  Tooltip,
  useMediaQuery,
  Zoom,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { FlexBetween, FlexBox } from "../flex-box";
import {
  ContentWrapper,
  ImageWrapper,
  StyledCustomCard,
  StyledChip,
  ProductCardWrapper,
} from "./StyledComponents";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { Add, Remove } from "@mui/icons-material";
import { TProduct } from "@/types/TProduct";
import { ValueVsQuantity } from "@/types/TProductInventory";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import ProductService from "@/service/ProductService";
import { CartItem } from "@/store/Model/CartItem";
import { calculateDiscount, calculateDiscountAsNumber, currency } from "@/lib";
import { GetSKU, classNames, getSizeFromSKU } from "@/helpers/Extensions";
import { AddItem, RemoveItem, UpdateItem } from "@/store/CartItem/Cart-action";
import { AddItemWish } from "@/store/Wishlist/Wishlist-action";
import { TooltipError, TooltipInfo } from "../Tooltips";
import { H4, H6 } from "../Typography";
import Link from "next/link";
import { BlurImage } from "../BlurImage";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { RadioGroup } from "@headlessui/react";
// ========================================================
type ProductCardProps = {
  discount: number;
  product: TProduct;
};

// ========================================================

const ShopCard: FC<ProductCardProps> = ({ product, discount }) => {
  const [qty, setQty] = useState<number | null>(null);
  const [stock, setStock] = useState<number | null>(null);
  const [valueVsQuantity, setValueVsQuantity] = useState<ValueVsQuantity[]>([]);
  const [openTool, setOpenTool] = useState(false);

  const handleToolClose = () => {
    setOpenTool(false);
  };

  const handleToolOpen = () => {
    setOpenTool(true);
  };
  const disableChip = (value) =>
    valueVsQuantity?.find((x) => x.variable == value)?.quantity == 0;
  const downSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const cartItem = useAppSelector((x) =>
    x.Store.CartReducer?.CartItems?.filter((x) => x.id == product.id)
  );
  const _setting = useAppSelector((x) => x.Store.SettingReducer.setting);
  const wishList = useAppSelector((x) =>
    x.Store.WishlistReducer?.wishlistItems?.find((x) => x.id == product.id)
  );
  //const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const [size, setSize] = useState<string>("");

  const executeLongRunningtask = async (value: string) => {
    return new Promise((resolve, reject) => {
      var stock: ValueVsQuantity = {
        quantity: 0,
        variable: value,
      };
      ProductService.getQuantity({
        inventory_type: "domestic",
        sku: value,
      }).then((x) => {
        if (
          x.data.status.response == true &&
          x.data.inventory.quantity != "0"
        ) {
          stock.quantity = x.data.inventory.quantity as unknown as number;
        }
        resolve(stock);
      });
    });
  };
  const executeAllLongRunningTasks = async () => {
    var x = product.subSku ?? "";

    return await Promise.all(x.split(",")?.map(executeLongRunningtask));
  };

  useEffect(() => {
    executeAllLongRunningTasks().then((res) => {
      setValueVsQuantity(res as ValueVsQuantity[]);
    });
  }, []);

  const handleCartAmountChange = (amount) => {
    const { id, name, salePrice, price, mainImage, color } = product;
    var cart: CartItem = {
      id: id,
      name: name,
      price:
        salePrice && salePrice > 0
          ? calculateDiscountAsNumber(price, salePrice)
          : price,
      salePrice: salePrice || 0,
      qty: amount,
      slug: name,
      imgUrl: mainImage || "",
      sku: GetSKU(name, color, size),
      color: color,
      size: size,
      stock:
        valueVsQuantity.find((x) => x.variable == GetSKU(name, color, size))
          ?.quantity || 0,
    };
    setStock(cart?.stock);
    setQty(cart?.qty);

    if (!cartItem?.find((x) => x.sku == GetSKU(name, color, size))) {
      dispatch(AddItem(cart));
      //   enqueueSnackbar("Item Added To Cart", {
      //     action: (key) => (
      //       <SnakeBar
      //         closeSnackbar={() => closeSnackbar(key)}
      //         undoSnackbar={unDoAdd}
      //         cartItem={cart}
      //         snakeId={key}
      //       />
      //     ),
      //   });
    } else if (amount != 0) {
      var qttyy =
        valueVsQuantity.find((x) => x.variable == GetSKU(name, color, size))
          ?.quantity ?? 0;
      if (amount > qttyy) {
        //enqueueSnackbar(`Only avaliable ${qttyy} pieces you can't add more`);
        return;
      }
      dispatch(UpdateItem(cart));
      const oldCartItem = cartItem.find(
        (x) => x.sku == GetSKU(name, color, size)
      );
      //   enqueueSnackbar("Item Added To Cart", {
      //     action: (key) => (
      //       <SnakeBar
      //         closeSnackbar={() => closeSnackbar(key)}
      //         undoSnackbar={unDoUpdate}
      //         cartItem={oldCartItem}
      //         snakeId={key}
      //       />
      //     ),
      //   });
    } else {
      dispatch(RemoveItem(cart));
    }
  };
  const handleCartAmountChangePlusMinus =
    (amount: number, type: "remove" | "add" | "update") => () => {
      var cart: CartItem = {
        id: product?.id,
        name: product?.name,
        price:
          product?.salePrice && product?.salePrice > 0
            ? calculateDiscountAsNumber(product?.price, product?.salePrice)
            : product?.price,
        salePrice: product?.salePrice || 0,
        qty: amount,
        slug: product?.name,
        imgUrl: product?.mainImage || "",
        sku: GetSKU(product?.name, product?.color, size),
        color: product?.color,
        size: size,
        stock:
          valueVsQuantity.find(
            (x) => x.variable == GetSKU(product?.name, product?.color, size)
          )?.quantity || 0,
      };
      var stock = valueVsQuantity.find(
        (x) => x.variable == GetSKU(product?.name, product?.color, size)
      )?.quantity;

      if (amount > (stock || 0)) {
        //enqueueSnackbar(`Only avaliable ${stock} pieces you can't add more`);
        return;
      }
      if (type == "add") {
        setStock(cart.stock);
        setQty(cart.qty);
        dispatch(AddItem(cart));
        //enqueueSnackbar("Item Added To Cart");
      } else if (type == "update") {
        setStock(cart.stock);
        setQty(cart.qty);
        dispatch(UpdateItem(cart));
        // enqueueSnackbar(
        //   cart.qty > amount ? "Item Added To Cart" : "Item Removed From Cart"
        // );
      } else {
        setStock(null);
        setQty(null);
        dispatch(RemoveItem(cart));
        //enqueueSnackbar("Item Removed From Cart");
      }
    };

  const handleAddToWishlist = () => {
    if (wishList) {
      //enqueueSnackbar("Item removed from Wishlist");
    } else {
      //enqueueSnackbar("Item added to Wishlist");
    }
    dispatch(AddItemWish(product));
  };

  useEffect(() => {
    if (size !== "") {
      var _Stock = valueVsQuantity.find(
        (x) => x.variable == GetSKU(product?.name, product?.color, size)
      )?.quantity;
      var Quantity = cartItem?.find(
        (x) => x.sku == GetSKU(product?.name, product?.color, size)
      )?.qty;
      setStock(_Stock || null);
      setQty(Quantity ?? null);
    } else {
      setStock(null);
      setQty(null);
    }
  }, [size]);

  useEffect(() => {
    if (size != "") {
      handleToolClose();
    }
  }, [size]);

  const isDisable = (value) => {
    return valueVsQuantity?.find((x) => x.variable == value)?.quantity == 0;
  };

  return (
    <>
      <ProductCardWrapper
        sx={{
          justifyContent: "flex-start",
          background: "transparent!important",
          boxShadow: "none!important",
        }}
        data-aos={"fade-top"}
        data-aos-easing="linear"
        data-aos-duration={"500"}
        role={"drawer"}
      >
        <ImageWrapper position={"relative"} style={{ height: "100%" }}>
          {!!discount && (
            <StyledChip
              color="secondary"
              size="small"
              label={`${discount}% off`}
            />
          )}

          <Link
            href={`/product/${product.name.toLowerCase()}-${product.color.toString()}`}
            className="custom_inside-slider"
          >
            <Swiper
              className="mySwiper"
              modules={[Pagination, Navigation]}
              pagination={{
                clickable: true,
              }}
              navigation={false}
            >
              <>
                {product.productImages?.slice(0, 4).map((slide, i) => (
                  <SwiperSlide key={i}>
                    <BlurImage
                      image={slide.reducedImage}
                      title={product.friendlyName}
                      loading={"eager"}
                      priority={"high"}
                      aspect={true}
                      q={80}
                    />
                  </SwiperSlide>
                ))}
              </>
            </Swiper>
          </Link>

          <Box
            position={"absolute"}
            sx={{ top: 15, right: 5, zIndex: 9, cursor: "pointer" }}
          >
            <Box display={"grid"} rowGap={1}>
              <Tooltip
                title={wishList ? "Remove From Wishlist" : "Add To Wishlist"}
                placement="top"
              >
                {!wishList ? (
                  <VscHeart
                    color={"#000000bf"}
                    size={"20px"}
                    onClick={() => handleAddToWishlist()}
                  />
                ) : (
                  <VscHeartFilled
                    color={"#d23f57"}
                    size={"20px"}
                    onClick={() => handleAddToWishlist()}
                  />
                )}
              </Tooltip>
            </Box>
          </Box>
        </ImageWrapper>

        <ContentWrapper
          sx={{
            padding: "4px 0px 4px 2px!important",
            background: "transparent",
          }}
        >
          <FlexBox>
            <Box flex="1 1 0" minWidth="0px" mr={1}>
              <Link
                href={`/product/${product.name.toLowerCase()}-${product.color.toString()}`}
              >
                <H4
                  title={product.name}
                  color={"#1c1d26"}
                  sx={{
                    whiteSpace: "nowrap",
                    display: "block!important",
                  }}
                  className=" text-18"
                >
                  {product.friendlyName ?? product.name}
                </H4>
                <H6
                  mb={0}
                  title={product.shortDescription}
                  className="title"
                  color={"#1c1d26"}
                  sx={{ fontSize: "11px" }}
                >
                  {product.shortDescription.toUpperCase()}
                </H6>
              </Link>
              <FlexBetween>
                <FlexBox alignItems="center" gap={1} mb={1}>
                  <Box color="primary.main">
                    <H6 color="black" fontWeight={100}>
                      {calculateDiscount(product.price, discount, _setting)}
                    </H6>
                  </Box>

                  {!!discount && (
                    <Box color="grey.600">
                      <del>{currency(product.price, _setting)}</del>
                    </Box>
                  )}
                </FlexBox>
                <TooltipError
                  arrow
                  TransitionComponent={Zoom}
                  open={openTool}
                  disableHoverListener
                  disableTouchListener
                  onClose={handleToolClose}
                  placement="left"
                  title="Please select a size"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        color: "white",
                        backgroundColor: "#E53935",
                        "& .MuiTooltip-arrow": {
                          color: "#E53935",
                        },
                      },
                    },
                  }}
                >
                  <Box sx={{ height: "36px" }}>
                    {valueVsQuantity.filter((x) => x.quantity > 0).length !=
                      0 && (
                      <>
                        {qty == null ? (
                          <button
                            onClick={() => {
                              if (size == "") {
                                handleToolOpen();
                              } else {
                                handleCartAmountChange(1);
                              }
                            }}
                            className="title rounded-none 
                            text-xs uppercase flex 
                            items-center justify-center rounded-md border border-transparent
                             bg-black px-2 py-1 text-base  text-white shadow-sm hover:bg-slate-700"
                          >
                            ADD TO CART
                          </button>
                        ) : (
                          <FlexBox
                            alignItems="center"
                            justifyContent={"center"}
                          >
                            <IconButton
                              onClick={handleCartAmountChangePlusMinus(
                                qty - 1,
                                qty - 1 == 0 ? "remove" : "update"
                              )}
                              sx={{
                                py: 1,
                                px: 1,
                              }}
                            >
                              <Remove fontSize="small" />
                            </IconButton>

                            <Box
                              sx={{
                                margin: "0 10px",
                                textAlign: "center",
                              }}
                            >
                              <Chip
                                label={qty}
                                sx={{
                                  background: "white",
                                  fontSize: "20px",
                                }}
                              />
                            </Box>

                            <IconButton
                              sx={{
                                py: 1,
                                px: 1,
                              }}
                              disabled={qty >= (stock || 0)}
                              onClick={handleCartAmountChangePlusMinus(
                                qty + 1,
                                "add"
                              )}
                            >
                              <Add fontSize="small" />
                            </IconButton>
                          </FlexBox>
                        )}
                      </>
                    )}
                  </Box>
                </TooltipError>
              </FlexBetween>
              <RadioGroup
                value={size}
                onChange={(e) => setSize(e.split("-")[3])}
                className="mt-2"
              >
                <div
                  className={`grid grid-cols-${
                    product.subSku?.split(",").length + 2
                  } gap-4`}
                >
                  {product.subSku?.split(",")?.map((size) => (
                    <>
                      {valueVsQuantity.find((x) => x.variable == size) !=
                      null ? (
                        <RadioGroup.Option
                          key={size}
                          value={size}
                          disabled={isDisable(size)}
                          className={({ active }) =>
                            classNames(
                              !isDisable(size)
                                ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                              active ? "ring-2 ring-zinc-500" : "",
                              "group relative flex items-center justify-center rounded-md border py-2 px-2 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">
                                {getSizeFromSKU(size)}
                              </RadioGroup.Label>
                              {!isDisable(size) ? (
                                <span
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-zinc-500"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-md"
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line
                                      x1={0}
                                      y1={100}
                                      x2={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ) : (
                        <Skeleton className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1" />
                      )}
                    </>
                  ))}
                </div>
              </RadioGroup>
            </Box>
          </FlexBox>
        </ContentWrapper>
      </ProductCardWrapper>
    </>
  );
};

export default ShopCard;
