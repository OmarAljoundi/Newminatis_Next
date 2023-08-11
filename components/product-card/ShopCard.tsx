import { FC, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";

import useMediaQuery from "@mui/material/useMediaQuery";
import Zoom from "@mui/material/Zoom";
import { Theme } from "@mui/material/styles";
import { FlexBox } from "../flex-box";
import { Add, Remove } from "@mui/icons-material";
import { TProduct } from "@/types/TProduct";
import { ValueVsQuantity } from "@/types/TProductInventory";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import ProductService from "@/service/ProductService";
import { CartItem } from "@/store/Model/CartItem";
import { calculateDiscountAsNumber, currency } from "@/lib";
import {
  GetSKU,
  classNames,
  getSizeFromSKU,
  getTotalPrice,
} from "@/helpers/Extensions";
import { AddItem, RemoveItem, UpdateItem } from "@/store/CartItem/Cart-action";
import { TooltipError } from "../Tooltips";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { RadioGroup } from "@headlessui/react";
import { toasterSuccess } from "@/service/toasterService";
import { toast } from "react-hot-toast";
import { ShopCardLayout } from "./ShopCardLayout";
// ========================================================
type ProductCardProps = {
  discount: number;
  product: TProduct;
  classes?: string;
  perImage?: number;
};

// ========================================================

const ShopCard: FC<ProductCardProps> = ({
  product,
  discount,
  classes = "",
  perImage = 4,
}) => {
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

  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const cartItem = useAppSelector((x) =>
    x.Store.CartReducer?.CartItems?.filter((x) => x.id == product.id)
  );
  const cartState = useAppSelector((x) => x.Store.CartReducer?.CartItems);
  const _setting = useAppSelector((x) => x.Store.SettingReducer.setting);

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
    var __price =
      salePrice && salePrice > 0
        ? calculateDiscountAsNumber(price, salePrice)
        : price;
    var cart: CartItem = {
      id: id,
      name: name,
      price: __price,
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
      toasterSuccess(
        currency(getTotalPrice(cartState || []) + __price, _setting),
        downMd ? "bottom-center" : "top-center"
      );
    } else if (amount != 0) {
      var qttyy =
        valueVsQuantity.find((x) => x.variable == GetSKU(name, color, size))
          ?.quantity ?? 0;
      if (amount > qttyy) {
        return;
      }
      dispatch(UpdateItem(cart));

      toasterSuccess(
        currency(getTotalPrice(cartState || []) + __price, _setting)
      );
    } else {
      dispatch(RemoveItem(cart));
    }
  };
  const handleCartAmountChangePlusMinus =
    (amount: number, type: "remove" | "add" | "update") => () => {
      var __price =
        product?.salePrice && product?.salePrice > 0
          ? calculateDiscountAsNumber(product?.price, product?.salePrice)
          : product?.price;
      var cart: CartItem = {
        id: product?.id,
        name: product?.name,
        price: __price,
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
        toast.error(`Only avaliable ${stock} pieces you can't add more`);
        return;
      }
      if (type == "add") {
        setStock(cart.stock);
        setQty(cart.qty);
        dispatch(AddItem(cart));
        toast.success("Item Added To Cart");
      } else if (type == "update") {
        setStock(cart.stock);
        setQty(cart.qty);
        dispatch(UpdateItem(cart));
        toast.success(
          cart.qty > amount ? "Item Added To Cart" : "Item Removed From Cart"
        );
      } else {
        setStock(null);
        setQty(null);
        dispatch(RemoveItem(cart));
        toast.success("Item Removed From Cart");
      }
    };

  useEffect(() => {
    if (size !== "") {
      handleToolClose();
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

  const isDisable = (value) => {
    return valueVsQuantity?.find((x) => x.variable == value)?.quantity == 0;
  };

  useEffect(() => {
    if (openTool) {
      setTimeout(() => {
        setOpenTool(false);
      }, 3500);
    }
  }, [openTool]);

  return (
    <ShopCardLayout
      classes={classes}
      discount={discount}
      perImage={perImage}
      product={product}
      addToCart={
        <Box sx={{ height: "36px" }}>
          {valueVsQuantity.filter((x) => x.quantity > 0).length != 0 && (
            <>
              {qty == null ? (
                <TooltipError
                  arrow
                  disableHoverListener
                  disableTouchListener
                  placement="left"
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
                  title="Please Select a size"
                  open={openTool}
                  TransitionComponent={Zoom}
                >
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
                            items-center justify-center  border border-transparent
                             bg-black px-2 py-1  text-white shadow-sm hover:bg-slate-700"
                  >
                    ADD TO CART
                  </button>
                </TooltipError>
              ) : (
                <FlexBox alignItems="center" justifyContent={"center"}>
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
                    onClick={handleCartAmountChangePlusMinus(qty + 1, "add")}
                  >
                    <Add fontSize="small" />
                  </IconButton>
                </FlexBox>
              )}
            </>
          )}
        </Box>
      }
      children={
        <RadioGroup
          value={size}
          onChange={(e) => setSize(e.split("-")[3])}
          className="mt-2"
        >
          <div
            className={`grid grid-cols-${
              product.subSku?.split(",").length + 1
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
      }
    />
  );
};

export default ShopCard;
