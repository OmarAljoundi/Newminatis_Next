import { Add, Close, Remove } from "@mui/icons-material";

import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";

import Stack from "@mui/material/Stack";
import Zoom from "@mui/material/Zoom";
import Box from "@mui/material/Box";

import { FC, useEffect, useState } from "react";
import { ValueVsQuantity } from "../../types/TProductInventory";
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
import { BlurImage } from "../BlurImage";
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
    <div className="max-w-2xl mx-auto py-3 px-2 w-full">
      <div className="grid grid-cols-3 gap-3 relative">
        <div className="col-span-1">
          <Link
            href={`/product/${product.name.toLowerCase()}-${product.color.toString()}`}
          >
            <BlurImage image={product.mainImage || ""} />
          </Link>
          <Link
            href={`/product/${product.name.toLowerCase()}-${product.color.toString()}`}
            className="flex justify-center mt-3"
          >
            <span
              className="text-sm font-bold title"
              style={{ textDecoration: "underline" }}
            >
              View
            </span>
          </Link>
        </div>
        <div className="col-span-2">
          <Stack className="details">
            <p className="text-sm">{product.friendlyName}</p>
            <p className="text-xs mb-2">{product.shortDescription}</p>
            <div className="flex text-xs items-center gap-1">
              <h4 className="text-xs text-black font-bold">
                {calculateDiscount(product.price, discount, _setting)}
              </h4>

              {!!discount && (
                <Box color="grey.600">
                  <del>{currency(product.price, _setting)}</del>
                </Box>
              )}
            </div>

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

                      <div className="text-center mx-2">
                        <Chip
                          label={qty || 1}
                          sx={{
                            background: "white",
                            fontSize: "20px",
                          }}
                        />
                      </div>

                      <IconButton
                        sx={{
                          py: 0.1,
                          px: 0.1,
                          border: "1px solid #d5d5d5",
                          background: "black",
                          color: "white",
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
        </div>
        <IconButton
          size="medium"
          onClick={toggleDrawer}
          sx={{
            position: "absolute",
            right: -5,
            top: -15,
            zIndex: 3,
          }}
        >
          <Close fontSize="medium" sx={{ color: "black" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default AddToCardModel;
