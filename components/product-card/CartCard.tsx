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
    <Wrapper
      elevation={1}
      sx={{
        borderRadius: "0",
        border: "1px solid #d5d5d5",
        padding: "0!important",
      }}
    >
      <Link
        href={`/product/${name.toLowerCase()}-${color.toString()}`}
        style={{ color: "black" }}
      >
        <Box position={"relative"}>
          <BlurImage title={name} height={210} image={imgUrl!} aspect />
          {!!salePrice && (
            <StyledChip
              color="secondary"
              size="small"
              label={`${salePrice}% off`}
            />
          )}
        </Box>
      </Link>
      <IconButton
        size="medium"
        onClick={handleCartAmountChange(0, "remove")}
        sx={{
          position: "absolute",
          right: 15,
          bottom: 15,
          zIndex: 2,
        }}
      >
        <DeleteOutlineIcon fontSize="medium" />
      </IconButton>

      <FlexBox
        px={2}
        maxWidth="400px"
        width="100%"
        flexDirection="column"
        position={"relative"}
      >
        <Link
          href={`/product/${name.toLowerCase()}-${color.toString()}`}
          style={{ color: "black" }}
        >
          <Span
            ellipsis
            color={"black"}
            className="text-xs"
            sx={{ textTransform: "uppercase" }}
          >
            {name}
            {"      "} ({size})
          </Span>
        </Link>

        <Span
          color="black"
          className="text-xs"
          mb={0.3}
          sx={{ textTransform: "uppercase" }}
        >
          COLOR:
          {"      "} ({MapColors(color)})
        </Span>

        {!!salePrice && (
          <Span color="black" className="text-xs">
            Original Price <del>{currency(price, _setting)}</del>
          </Span>
        )}

        <span className="text-xs">
          {calculateDiscount(price, salePrice, _setting)} x {qty}
        </span>

        <Box className="text-xs" color="black" mt={0.3}>
          TOTAL:{" "}
          {currency(
            calculateDiscountAsNumber(price, salePrice) * qty,
            _setting
          )}
        </Box>

        <FlexBox alignItems="center" mt={1}>
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
            disabled={qty >= stock}
            onClick={handleCartAmountChange(qty + 1, "add")}
          >
            <Add fontSize="small" />
          </IconButton>
        </FlexBox>

        <span className="text-xs mt-2">
          {stock == 0
            ? "Item out of stock"
            : stock <= 2
            ? ` Only (${stock}) Avaliable In Stock!`
            : ""}
        </span>
      </FlexBox>
    </Wrapper>
  );
};

export default CartCard;
