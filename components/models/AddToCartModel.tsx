import { Add, Close, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Zoom,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { ValueVsQuantity } from "../../types/TProductInventory";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { TProduct } from "@/types/TProduct";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { calculateDiscount, calculateDiscountAsNumber, currency } from "@/lib";
import { CartItem } from "@/store/Model/CartItem";
import {
  GetSKU,
  classNames,
  getSizeFromSKU,
  getTotalPrice,
} from "@/helpers/Extensions";
import { AddItem, RemoveItem, UpdateItem } from "@/store/CartItem/Cart-action";
import ProductService from "@/service/ProductService";
import Link from "next/link";
import { H2, H4, Paragraph } from "../Typography";
import { FlexBetween, FlexBox } from "../flex-box";
import { TooltipError, TooltipStock } from "../Tooltips";
import { RadioGroup } from "@headlessui/react";
import { toasterSuccess } from "@/service/toasterService";
type CartModelProps = {
  toggleDrawer: () => void;
  product: TProduct;
  discount: number;
};
const AddToCardModel: FC<CartModelProps> = ({
  product,
  toggleDrawer,
  discount,
}) => {
  const _setting = useAppSelector((x) => x.Store.SettingReducer.setting);
  const [valueVsQuantity, setValueVsQuantity] = useState<ValueVsQuantity[]>([]);
  const [stock, setStock] = useState<number | null>(null);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<string>("");
  //const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const [loadStock, setLoadStock] = useState(true);
  const cartItem = useAppSelector((x) => x.Store.CartReducer?.CartItems);
  const disableChip = (value) =>
    valueVsQuantity?.find((x) => x.variable == value)?.quantity == 0;

  const { name, price, salePrice, id, color, sku, subSku, mainImage } = product;

  const [openTool, setOpenTool] = useState(false);

  const handleToolClose = () => {
    setOpenTool(false);
  };

  const handleToolOpen = () => {
    setOpenTool(true);
  };

  const [openToolInfo, setOpenToolInfo] = useState(false);

  const handleToolCloseInfo = () => {
    setOpenToolInfo(false);
  };

  const handleCartAmountChange = () => {
    var __price =
      salePrice && salePrice > 0
        ? calculateDiscountAsNumber(price, salePrice)
        : price;
    var cart: CartItem = {
      id: id,
      name: name,
      price: __price,
      salePrice: salePrice || 0,
      qty: qty,
      slug: name,
      imgUrl: mainImage || "",
      sku: GetSKU(name, color, size),
      color: color,
      size: size,
      stock:
        valueVsQuantity.find((x) => x.variable == GetSKU(name, color, size))
          ?.quantity || 0,
    };
    setStock(cart?.stock || null);

    if (!cartItem?.find((x) => x.sku == GetSKU(name, color, size))) {
      dispatch(AddItem(cart));
      toasterSuccess(
        currency(getTotalPrice(cartItem || []) + __price * 1, _setting)
      );
      toggleDrawer();
    } else if (qty != 0) {
      var qttyy =
        valueVsQuantity.find((x) => x.variable == GetSKU(name, color, size))
          ?.quantity ?? 0;
      if (qty > qttyy) {
        //enqueueSnackbar(`Only avaliable ${qttyy} pieces you can't add more`);
        return;
      }
      dispatch(UpdateItem(cart));
      toasterSuccess(
        currency(getTotalPrice(cartItem || []) + __price * qty, _setting)
      );
      toggleDrawer();
    } else {
      dispatch(RemoveItem(cart));
    }
  };
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
    setLoadStock(true);
    executeAllLongRunningTasks().then((res) => {
      setValueVsQuantity(res as ValueVsQuantity[]);
      setLoadStock(false);
    });
  }, []);

  useEffect(() => {
    if (size !== "") {
      handleToolClose();
      var _Stock = valueVsQuantity.find(
        (x) => x.variable == GetSKU(name, color, size)
      )?.quantity;
      setStock(_Stock || null);
    } else {
      setStock(null);
    }
  }, [size]);

  const isDisable = (value) => {
    return valueVsQuantity?.find((x) => x.variable == value)?.quantity == 0;
  };

  return (
    <Box px={4} py={1}>
      <Grid container item columnSpacing={3} mt={2} position="relative">
        <Grid item xs={4}>
          <Link
            href={`/product/${product.name.toLowerCase()}-${product.color.toString()}`}
          >
            <img src={product.mainImage || ""} width={"100%"} />
          </Link>
          <Link
            href={`/product/${product.name.toLowerCase()}-${product.color.toString()}`}
          >
            <Button variant="text" sx={{ paddingLeft: "0", paddingRight: "0" }}>
              {" "}
              <span
                className="text-xs title"
                style={{ textDecoration: "underline" }}
              >
                {" "}
                View Product Details
              </span>
            </Button>
          </Link>
        </Grid>
        <Grid item xs={8}>
          <Stack className="details">
            <H2 className="text-sm">{product.friendlyName}</H2>
            <p className="text-xs mb-2">{product.shortDescription}</p>
            <FlexBox alignItems="center" gap={1} className="text-12">
              <Box color={"black"} className="text-12">
                <H4 color="black" fontWeight={100} className="text-12">
                  {calculateDiscount(product.price, discount, _setting)}
                </H4>
              </Box>

              {!!discount && (
                <Box color="grey.600">
                  <del>{currency(product.price, _setting)}</del>
                </Box>
              )}
            </FlexBox>

            <RadioGroup
              value={size}
              onChange={(e) => setSize(e.split("-")[3])}
              className="mt-4"
            >
              <div
                className={`mb-4 grid grid-cols-${
                  product.subSku?.split(",").length
                } gap-4`}
              >
                {product.subSku?.split(",")?.map((size) => (
                  <>
                    {valueVsQuantity.find((x) => x.variable == size) != null ? (
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
            {valueVsQuantity.filter((x) => x.quantity > 0).length != 0 && (
              <FlexBetween>
                <TooltipError
                  arrow
                  TransitionComponent={Zoom}
                  disableHoverListener
                  disableTouchListener
                  onClose={handleToolClose}
                  placement="bottom"
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
                  <button
                    className="title rounded-none 
                            text-xs uppercase  flex 
                            items-center justify-center  border border-transparent
                             bg-black px-2 py-1   text-white shadow-sm hover:bg-slate-700"
                    onClick={() => {
                      if (size == "") {
                        handleToolOpen();
                      } else {
                        handleCartAmountChange();
                      }
                    }}
                  >
                    Add to cart
                  </button>
                </TooltipError>

                <TooltipStock
                  arrow
                  TransitionComponent={Zoom}
                  open={stock && stock == 1 ? true : false}
                  onClose={handleToolCloseInfo}
                  placement="bottom"
                  title="Only one left in stock"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        color: "red",
                        backgroundColor: "#E53935",
                        "& .MuiTooltip-arrow": {
                          color: "red",
                        },
                      },
                    },
                  }}
                >
                  <div>
                    <FlexBox alignItems="center" justifyContent={"center"}>
                      <IconButton
                        disabled={qty == 1}
                        onClick={() => setQty(qty - 1)}
                        sx={{
                          py: 0.1,
                          px: 0.1,
                          border: "1px solid #d5d5d5",
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
                          label={qty || 1}
                          sx={{
                            background: "white",
                            fontSize: "20px",
                          }}
                        />
                      </Box>

                      <IconButton
                        sx={{
                          py: 0.1,
                          px: 0.1,
                          border: "1px solid #d5d5d5",
                        }}
                        disabled={qty >= (stock || 0)}
                        onClick={() => setQty(qty + 1)}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </FlexBox>
                  </div>
                </TooltipStock>
              </FlexBetween>
            )}
          </Stack>
        </Grid>
        <IconButton
          size="medium"
          onClick={toggleDrawer}
          sx={{
            position: "absolute",
            right: -25,
            top: 0,
            zIndex: 3,
          }}
        >
          <Close fontSize="medium" sx={{ color: "black" }} />
        </IconButton>
      </Grid>
    </Box>
  );
};

export default AddToCardModel;
