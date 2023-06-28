import { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Drawer,
  IconButton,
  styled,
  Theme,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { FlexBetween, FlexBox } from "../flex-box";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  ContentWrapper,
  ImageWrapper,
  StyledCustomCard,
  StyledChip,
  ProductCardWrapper,
} from "./StyledComponents";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { TbJewishStar } from "react-icons/tb";
import { MdOutlineStarOutline } from "react-icons/md";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { TProduct } from "@/types/TProduct";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { AddItemWish } from "@/store/Wishlist/Wishlist-action";
import Link from "next/link";
import { H4, H6 } from "../Typography";
import { calculateDiscount, currency } from "@/lib";
import AddToCardModel from "../models/AddToCartModel";
import { BlurImage } from "../BlurImage";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ShopCardLayout } from "./ShopCardLayout";

// ========================================================
type ProductCardProps = {
  discount: number;
  product: TProduct;
  fadeType: "fade-right" | "fade-left";
  perImage?: number;
  classes?: string;
};
// ========================================================

const ShopMobileCard: FC<ProductCardProps> = ({
  product,
  discount,
  fadeType,
  perImage = 4,
  classes = "",
}) => {
  const [addToCart, setAddToCart] = useState(false);
  const toggleCartModel = () => setAddToCart(!addToCart);

  return (
    <>
      <ShopCardLayout
        classes={classes}
        discount={discount}
        perImage={perImage}
        product={product}
        addToCart={
          <button
            className="title rounded-none text-xs uppercase  flex items-center justify-center  border border-transparent bg-black px-2 py-1
             text-white shadow-sm hover:bg-slate-700"
            onClick={toggleCartModel}
          >
            Add to cart
          </button>
        }
      />
      <Drawer
        open={addToCart}
        anchor="bottom"
        onClose={toggleCartModel}
        PaperProps={{
          sx: { height: "70vw", width: "100%" },
        }}
      >
        <AddToCardModel
          toggleDrawer={toggleCartModel}
          product={product}
          discount={discount}
        />
      </Drawer>
    </>
  );
};

export default ShopMobileCard;
