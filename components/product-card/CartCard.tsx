"use client";
import { FC, useEffect } from "react";
import { Add, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Chip,
  IconButton,
  Zoom,
  styled,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateCart } from "@/store/CartItem/ThunkAPI";
import { CartItem } from "@/store/Model/CartItem";
import {
  GetSKU,
  MapColors,
  getOutOfStockMessage,
  getSizeAsOne,
  getSizeFromSKU,
  isStockAvailable,
} from "@/helpers/Extensions";
import { toast } from "react-hot-toast";
import { AddItem, RemoveItem, UpdateItem } from "@/store/CartItem/Cart-action";
import Link from "next/link";
import { BlurImage } from "../BlurImage";
import { FlexBetween, FlexBox } from "../flex-box";
import { H4, Small, Span } from "../Typography";
import { calculateDiscount, calculateDiscountAsNumber, currency } from "@/lib";
import { ProductCardWrapper, StyledChip } from "./StyledComponents";
import { TooltipError } from "../Tooltips";
const Wrapper = styled(Card)(({ theme }) => ({
  display: "flex",
  overflow: "hidden",
  alignItems: "center",
  position: "relative",
  borderRadius: "10px",
  marginBottom: "1.5rem",

  backgroundColor: theme.palette.background.paper,
}));
// =========================================================
type ProductCardProps = {
  qty: number;
  name: string;
  slug: string;
  price: number;
  imgUrl?: string;
  id: number;
  color: number;
  size: string;
  stock: number;
  salePrice: number;
};
// =========================================================

const CartCard: FC<ProductCardProps> = ({
  id,
  name,
  qty,
  price,
  imgUrl,
  slug,
  color,
  size,
  stock,
  salePrice,
}) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((x) => x.Store.CartReducer?.CartItems);
  const _setting = useAppSelector((x) => x.Store.SettingReducer.setting);
  useEffect(() => {
    window.scroll(0, 0);
    dispatch(updateCart(state ?? []));
  }, []);
  const handleCartAmountChange =
    (amount: number, type: "remove" | "add" | "update") => () => {
      var cart: CartItem = {
        id: id,
        name: name,
        price: price,
        qty: amount,
        slug: slug,
        imgUrl: imgUrl,
        sku: GetSKU(name, color, getSizeAsOne(size)),
        color: color,
        size: getSizeFromSKU(GetSKU(name, color, size)),
        stock: stock,
        salePrice: salePrice,
      };

      if (amount > stock) {
        toast.error(`Only avaliable ${stock} pieces you can't add more`, {
          duration: 5000,
        });
        return;
      }
      if (type == "add") {
        dispatch(AddItem(cart));
      } else if (type == "update") {
        dispatch(UpdateItem(cart));
      } else {
        dispatch(RemoveItem(cart));
      }
    };

  return (
    <>
      <Link
        className="shrink-0 block "
        href={`/product/${name.toLowerCase()}-${color.toString()}`}
      >
        <BlurImage
          title={name}
          image={imgUrl!}
          customClass="w-16 h-16"
          width={75}
          height={75}
        />
      </Link>

      <div className="flex-1 ml-5">
        <div className="lg:pr-0 lg:gap-x-5 lg:grid-cols-2 lg:grid relative">
          <div className="lg:pr-5 pr-9">
            <p className="text-sm font-bold">
              {name} - {size}
            </p>
            <p className="text-xs font-medium">{MapColors(color)}</p>
          </div>

          <div className="lg:pr-14  justify-between lg:justify-center lg:gap-x-4 lg:mt-0  flex mt-3 items-center">
            <p className="lg:text-right lg:ml-8 lg:order-2 text-xs font-medium">
              {!!salePrice && (
                <span className="text-xs font-bold">
                  Original Price <del>{currency(price, _setting)}</del>
                </span>
              )}
              <span className="text-xs font-bold">
                {calculateDiscount(price, salePrice, _setting)} x {qty}
              </span>
            </p>

            <div className="bg">
              <div className="flex items-center">
                <TooltipError
                  arrow
                  open={!isStockAvailable(qty, stock)}
                  TransitionComponent={Zoom}
                  disableHoverListener
                  disableTouchListener
                  placement="bottom"
                  title={getOutOfStockMessage(qty, stock, name, size)}
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
                  <IconButton
                    disabled={qty === 1 || stock == 0}
                    onClick={handleCartAmountChange(qty - 1, "update")}
                    sx={{
                      py: 0.1,
                      px: 0.1,
                      border: "1px solid #d5d5d5",
                    }}
                  >
                    <Remove fontSize="small" />
                  </IconButton>
                </TooltipError>

                <Box
                  sx={{
                    margin: "0 10px",
                    textAlign: "center",
                  }}
                >
                  <Chip
                    label={qty || 1}
                    sx={{
                      background: "transparent",
                      fontSize: "20px",
                      span: {
                        px: "2px",
                        fontSize: "15px",
                      },
                    }}
                  />
                </Box>

                <IconButton
                  sx={{
                    py: 0.1,
                    px: 0.1,
                    border: "1px solid #d5d5d5",
                  }}
                  disabled={qty >= stock}
                  onClick={handleCartAmountChange(qty + 1, "add")}
                >
                  <Add fontSize="small" />
                </IconButton>
              </div>
            </div>

            <div className="flex right-0 top-2 absolute">
              <button
                type="button"
                onClick={handleCartAmountChange(0, "remove")}
                className="transition-all duration-300 p-2 inline-flex -m-2 hover:opacity-100 opacity-80"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCard;
