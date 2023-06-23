"use client";
import React from "react";
import Grid from "@mui/material/Grid";
import { BlurImage } from "@/components/BlurImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Image from "next/image";
import { rgbDataURL } from "@/utils/blurImage";
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
              <Image
                title={product.friendlyName}
                src={slide.imageUrl}
                alt={product.friendlyName}
                width={592}
                height={888}
                blurDataURL={rgbDataURL(214, 214, 214)}
                placeholder="blur"
                priority={i > 0}
                fetchPriority="high"
                quality={70}
              />
            </SwiperSlide>
          ))}
        </>
      </Swiper>
    </Grid>
  );
}
