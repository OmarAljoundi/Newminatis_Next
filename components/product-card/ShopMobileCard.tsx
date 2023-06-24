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

// ========================================================
type ProductCardProps = {
  discount: number;
  product: TProduct;
  fadeType: "fade-right" | "fade-left";
  perImage?: number;
};
// ========================================================

const ShopMobileCard: FC<ProductCardProps> = ({
  product,
  discount,
  fadeType,
  perImage = 4,
}) => {
  const _setting = useAppSelector((x) => x.Store.SettingReducer.setting);
  const wishList = useAppSelector((x) =>
    x.Store.WishlistReducer?.wishlistItems?.find((x) => x.id == product.id)
  );
  const [addToCart, setAddToCart] = useState(false);
  const toggleWishList = () => setAddToCart(!addToCart);
  //const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const handleAddToWishlist = () => {
    if (wishList) {
      //enqueueSnackbar("Item removed from Wishlist");
    } else {
      //enqueueSnackbar("Item added to Wishlist");
    }
    dispatch(AddItemWish(product));
  };

  return (
    <>
      <ProductCardWrapper
        sx={{
          justifyContent: "flex-start",
          background: "transparent!important",
          boxShadow: "none!important",
          paddingBottom: "10px",
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
                {product.productImages?.slice(0, perImage).map((slide, i) => (
                  <SwiperSlide key={i}>
                    <BlurImage
                      image={slide.reducedImage}
                      title={product.friendlyName}
                      loading={"eager"}
                      priority={"high"}
                      q={70}
                      aspect={true}
                    />
                  </SwiperSlide>
                ))}
              </>
            </Swiper>
          </Link>

          <Box position={"absolute"} sx={{ top: 15, right: 5, zIndex: 9 }}>
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
                  className="title text-sm"
                >
                  {product.friendlyName ?? product.name}
                </H4>
                <H6
                  mb={0}
                  title={product.shortDescription}
                  className="title text-xs"
                  color={"#1c1d26"}
                >
                  {product.shortDescription.toUpperCase()}
                </H6>
              </Link>

              <FlexBetween pt={"10px"}>
                <FlexBox alignItems="center" gap={1}>
                  <Box color="primary.main">
                    <H6 color="black" fontWeight={100} className="text-10">
                      {calculateDiscount(product.price, discount, _setting)}
                    </H6>
                  </Box>

                  {!!discount && (
                    <Box color="grey.600">
                      <del className="text-10">
                        {currency(product.price, _setting)}
                      </del>
                    </Box>
                  )}
                </FlexBox>
                <Box>
                  <button
                    className="title rounded-none 
                            text-xs uppercase  flex 
                            items-center justify-center rounded-md border border-transparent
                             bg-black px-2 py-1 text-base  text-white shadow-sm hover:bg-slate-700"
                    onClick={toggleWishList}
                  >
                    Add to cart
                  </button>
                </Box>
              </FlexBetween>
            </Box>
          </FlexBox>
        </ContentWrapper>
        <Drawer
          open={addToCart}
          anchor="bottom"
          onClose={toggleWishList}
          PaperProps={{
            sx: { height: "70vw", width: "100%" },
          }}
        >
          <AddToCardModel
            toggleDrawer={toggleWishList}
            product={product}
            discount={discount}
          />
        </Drawer>
      </ProductCardWrapper>
    </>
  );
};

export default ShopMobileCard;
