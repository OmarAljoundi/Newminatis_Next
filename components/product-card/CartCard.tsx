"use client";
import { FC, useEffect } from "react";
import { Add, Remove } from "@mui/icons-material";
import { Box, Button, Card, Chip, IconButton, styled } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateCart } from "@/store/CartItem/ThunkAPI";
import { CartItem } from "@/store/Model/CartItem";
import { GetSKU, MapColors } from "@/helpers/Extensions";
import { toast } from "react-hot-toast";
import { AddItem, RemoveItem, UpdateItem } from "@/store/CartItem/Cart-action";
import Link from "next/link";
import { BlurImage } from "../BlurImage";
import { FlexBox } from "../flex-box";
import { H4, Small, Span } from "../Typography";
import { calculateDiscount, calculateDiscountAsNumber, currency } from "@/lib";
import { ProductCardWrapper, StyledChip } from "./StyledComponents";

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
        sku: GetSKU(name, color, size),
        color: color,
        size: size,
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
    <ProductCardWrapper elevation={1}>
      <Link
        href={`/product/${name.toLowerCase()}-${color.toString()}`}
        style={{ color: "black" }}
      >
        <Box position={"relative"}>
          <BlurImage
            title={name}
            height={200}
            aspect={true}
            image={imgUrl || ""}
            q={100}
          />
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
            fontWeight="100"
            color={"black"}
            className="text-12"
            sx={{ textTransform: "uppercase" }}
          >
            {name}
            {"      "} ({size})
          </Span>
        </Link>

        <Span
          fontWeight={100}
          color="black"
          mb={0.3}
          className="text-12"
          sx={{ textTransform: "uppercase" }}
        >
          COLOR:
          {"      "} ({MapColors(color)})
        </Span>

        {!!salePrice && (
          <Span color="black" className="text-12">
            Original Price <del>{currency(price, _setting)}</del>
          </Span>
        )}

        <Span color="black" className="text-12">
          {calculateDiscount(price, salePrice, _setting)} x {qty}
        </Span>

        <Box className="text-12" color="black" mt={0.3}>
          TOTAL:{" "}
          {currency(
            calculateDiscountAsNumber(price, salePrice) * qty,
            _setting
          )}
        </Box>

        <FlexBox alignItems="center" mt={1}>
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

        <Small
          color={"gray"}
          display={"inline-block"}
          className="text-10 mt-2"
          sx={{
            textTransform: "uppercase",
            fontFamily: "Alata-Regular",
          }}
        >
          {stock == 0
            ? "Item out of stock"
            : stock <= 2
            ? ` Only (${stock}) Avaliable In Stock!`
            : ""}
        </Small>
        {qty > stock && stock != 0 && (
          <H4 color={"#D3C4AB"}>
            Please reduce your quantity as there are only {stock} items of{" "}
            {name} size {size} left in the stock
          </H4>
        )}
        {stock == 0 && (
          <H4 color={"#D3C4AB"}>
            Please remove {name} size {size} from your cart to proceed, as the
            item is out of stuck
          </H4>
        )}
      </FlexBox>
    </ProductCardWrapper>
  );
};

export default CartCard;
