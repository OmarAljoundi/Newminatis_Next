import React, { FC, ReactNode, useState } from "react";
import {
  ContentWrapper,
  ImageWrapper,
  ProductCardWrapper,
  StyledChip,
} from "./StyledComponents";
import Link from "next/link";
import { Navigation, Pagination } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { BlurImage } from "../BlurImage";
import { Box, Drawer, Tooltip, Zoom } from "@mui/material";
import { FlexBetween, FlexBox } from "../flex-box";
import { H4, H6 } from "../Typography";
import { TooltipError } from "../Tooltips";
import { calculateDiscount, currency } from "@/lib";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import AddToCardModel from "../models/AddToCartModel";
import { TProduct } from "@/types/TProduct";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { AddItemWish } from "@/store/Wishlist/Wishlist-action";
import { toast } from "react-hot-toast";

type ShopCardLayoutProp = {
  children?: ReactNode;
  product: TProduct;
  discount: number;
  perImage: number;
  classes: string;
  addToCart: ReactNode;
};
export const ShopCardLayout: FC<ShopCardLayoutProp> = ({
  children,
  product,
  discount,
  perImage,
  classes,
  addToCart,
}) => {
  const dispatch = useAppDispatch();
  const [openTool, setOpenTool] = useState(false);
  const _setting = useAppSelector((x) => x.Store.SettingReducer.setting);
  const wishList = useAppSelector((x) =>
    x.Store.WishlistReducer?.wishlistItems?.find((x) => x.id == product.id)
  );
  const handleAddToWishlist = () => {
    if (wishList) {
      toast.success("Item removed from Wishlist");
    } else {
      toast.success("Item added to Wishlist");
    }
    dispatch(AddItemWish(product));
  };

  const handleToolClose = () => {
    setOpenTool(false);
  };

  return (
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
      <ImageWrapper position={"relative"}>
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
              {product.productImages?.slice(0, perImage).map((slide, i) => (
                <SwiperSlide key={i}>
                  <BlurImage
                    image={slide.reducedImage}
                    title={product.friendlyName}
                    loading={"lazy"}
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
        <FlexBox className={classes}>
          <Box flex="1 1 0" minWidth="0px" mr={1}>
            <Link
              href={`/product/${product.name.toLowerCase()}-${product.color.toString()}`}
            >
              <span
                title={product.name}
                className="text-xs md:text-sm whitespace-nowrap text-black font-medium"
              >
                {product.friendlyName ?? product.name}
              </span>
              <span
                title={product.shortDescription}
                className="title text-xs md:text-sm text-black font-medium"
              >
                {product.shortDescription.toUpperCase()}
              </span>
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-0 md:mt-2 items-start">
              <FlexBox alignItems="center" gap={1} mb={1}>
                <span className="text-sm font-semibold text-black">
                  {calculateDiscount(product.price, discount, _setting)}
                </span>

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
                className="ml-0 md:ml-auto"
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
                <div>{addToCart}</div>
              </TooltipError>
            </div>
            {children}
          </Box>
        </FlexBox>
      </ContentWrapper>
    </ProductCardWrapper>
  );
};
