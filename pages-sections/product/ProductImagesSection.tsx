"use client";
import React from "react";
import Grid from "@mui/material/Grid";
import { BlurImage } from "@/components/BlurImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
export default function ProductImagesSection({ product }) {
  return (
    <Grid item md={6} xs={12} alignItems="center" position={"relative"}>
      <Swiper
        className="mySwiper"
        modules={[Pagination, Navigation]}
        pagination={{
          clickable: true,
        }}
        navigation={false}
      >
        <>
          {product?.productImages.map((slide, i) => (
            <SwiperSlide key={i}>
              <BlurImage
                image={slide.imageUrl}
                title={product.friendlyName}
                aspect={true}
                loading="eager"
                q={100}
                priority="high"
              />
            </SwiperSlide>
          ))}
        </>
      </Swiper>
    </Grid>
  );
}
