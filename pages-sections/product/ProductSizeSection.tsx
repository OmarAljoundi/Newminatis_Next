"use client";
import { FlexBox } from "@/components/flex-box";
import { GetSKU, getSizeFromSKU, getTotalPrice } from "@/helpers/Extensions";
import ProductService from "@/service/ProductService";
import { TProduct } from "@/types/TProduct";
import { ValueVsQuantity } from "@/types/TProductInventory";
import { RadioGroup } from "@headlessui/react";
import { Add, Remove } from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  Skeleton,
  Theme,
  Zoom,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState, FC } from "react";
import { Button } from "@mui/material";
import { calculateDiscountAsNumber, currency } from "@/lib";
import { CartItem } from "@/store/Model/CartItem";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { AddItem, RemoveItem, UpdateItem } from "@/store/CartItem/Cart-action";
import { toasterSuccess } from "@/service/toasterService";
import { useRouter } from "next/navigation";
import { TooltipError } from "@/components/Tooltips";
import ProductSizeGuid from "./ProductSizeGuid";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

type ProductSizeSectionProp = {
  product: TProduct;
};

const ProductSizeSection: FC<ProductSizeSectionProp> = ({ product }) => {
  const [openTool, setOpenTool] = useState(false);
  const { subSku, name, color, salePrice, price, id, mainImage } = product;
  const [loadStock, setLoadStock] = useState(true);
  const [qty, setQty] = useState(1);
  const [stock, setStock] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [valueVsQuantity, setValueVsQuantity] = useState<ValueVsQuantity[]>([]);
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((x) => x.Store.CartReducer?.CartItems);
  const _setting = useAppSelector((x) => x.Store.SettingReducer?.setting);
  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  useEffect(() => {
    setLoadStock(true);
    executeAllLongRunningTasks().then((res) => {
      setValueVsQuantity(res as ValueVsQuantity[]);
      setLoadStock(false);
    });
  }, []);

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
    return await Promise.all(subSku.split(",")?.map(executeLongRunningtask));
  };

  const isDisable = (value) => {
    return valueVsQuantity?.find((x) => x.variable == value)?.quantity == 0;
  };

  useEffect(() => {
    if (selectedSize) {
      //handleToolClose();
      var _Stock = valueVsQuantity.find(
        (x) => x.variable == GetSKU(name, color, selectedSize)
      )?.quantity;
      setStock(_Stock ?? null);
      setQty(1);
    } else {
      setStock(null);
    }
  }, [selectedSize]);

  const handleCartAmountChange = () => {
    if (selectedSize) {
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
        sku: selectedSize,
        color: color,
        size: getSizeFromSKU(selectedSize),
        stock:
          valueVsQuantity.find((x) => x.variable == selectedSize)?.quantity ||
          0,
      };
      setStock(cart.stock);

      if (!cartItem?.find((x) => x.sku == selectedSize)) {
        dispatch(AddItem(cart));
        toasterSuccess(
          currency(getTotalPrice(cartItem || []) + __price, _setting),
          downMd ? "bottom-center" : "top-center"
        );
      } else if (qty != 0) {
        var qttyy =
          valueVsQuantity.find((x) => x.variable == selectedSize)?.quantity ??
          0;
        if (qty > qttyy) {
          //enqueueSnackbar(`Only avaliable ${qttyy} pieces you can't add more`);
          return;
        }
        dispatch(UpdateItem(cart));

        toasterSuccess(
          currency(getTotalPrice(cartItem || []) + __price, _setting),
          downMd ? "bottom-center" : "top-center"
        );
      } else {
        dispatch(RemoveItem(cart));
      }
    }
  };

  const handleToolOpen = () => {
    setOpenTool(true);
  };

  return (
    <div className="lg:border-t-0 border-t-4">
      <div className="flex items-center justify-between pt-2">
        <h4 className="text-sm font-medium text-gray-900">Size</h4>
        {product.productSizeGuide.length > 0 && (
          <ProductSizeGuid product={product} />
        )}
      </div>

      <RadioGroup
        value={selectedSize}
        onChange={setSelectedSize}
        className="mt-4"
      >
        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
        <div className={`grid grid-cols-${subSku?.split(",").length} gap-4`}>
          {subSku?.split(",")?.map((size) => (
            <>
              {!loadStock ? (
                <RadioGroup.Option
                  key={size}
                  value={size}
                  disabled={isDisable(size)}
                  className={({ active }) =>
                    classNames(
                      !isDisable(size)
                        ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                        : "cursor-not-allowed bg-gray-50 text-gray-200",
                      active ? "ring-2 ring-black" : "",
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
                            checked ? "border-black" : "border-transparent",
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
      <div className="mt-4 grid gap-x-6 gap-y-10  grid-cols-2 xl:gap-x-8 md:justify-items-end justify-items-between">
        <div className="flex items-center justify-start">
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
        </div>
        <TooltipError
          arrow
          TransitionComponent={Zoom}
          open={openTool}
          disableHoverListener
          disableTouchListener
          onClose={() => setOpenTool(false)}
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
          <button
            className="default-btn text-xs "
            onClick={() => {
              if (!selectedSize) {
                handleToolOpen();
              } else {
                handleCartAmountChange();
              }
            }}
          >
            ADD TO CART
          </button>
        </TooltipError>
      </div>
    </div>
  );
};

export default ProductSizeSection;
