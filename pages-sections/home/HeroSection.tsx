"use client";
import React, { useEffect, useRef, FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper";
import { Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useWindowSize from "@/hooks/useWindowSize";
import { HeroImage } from "@/components/HeroImage";

type TContent = {
  text: string;
  imageUrl: string;
  actionUrl: string;
  actionText: string;
};
const HeroSection = () => {
  const [bannerContent, setBannerContent] = useState<TContent[]>([]);
  const width = useWindowSize();
  const PC_Content: TContent[] = [
    {
      actionText: "Shop Now",
      actionUrl: "/shop",
      imageUrl: "/assets/images/slideShow/Large_banner.png",
      text: content_merge,
    },
  ];

  const Mobile_Content: TContent[] = [
    {
      actionText: "Shop Now",
      actionUrl: "/shop",
      imageUrl: "/assets/images/custom/pic_3.jpg",
      text: content_1,
    },
  ];
  useEffect(() => {
    if (width > 800) {
      setBannerContent(PC_Content);
    } else {
      setBannerContent(Mobile_Content);
    }
  }, [width]);
  return (
    <Box mb={1} sx={{ position: "relative" }}>
      <div className="swiper-button image-swiper-button-next">
        <ArrowForwardIcon />
      </div>
      <div className="swiper-button image-swiper-button-prev">
        <ArrowBackIcon />
      </div>
      <Swiper
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        loop={false}
        loopFillGroupWithBlank={true}
        speed={1200}
        className="mySwiper-1"
      >
        <>
          {bannerContent.map((item, index) => (
            <SwiperSlide key={index}>
              <HeroImage
                src={item.imageUrl}
                content={item.text}
                key={item.imageUrl}
              />
            </SwiperSlide>
          ))}
        </>
      </Swiper>
    </Box>
  );
};

export default HeroSection;

const content_1 = `Embrace your individual style`;
const content_2 = `FASHION THAT TRANSCENDS INTO A COMMUNITY OF MUSIC, ART & PEOPLE`;

const content_merge = `FASHION THAT TRANSCENDS INTO A COMMUNITY OF MUSIC, ART & PEOPLE.
High fashion inspired & artistic designs tailored towards bringing together lovers of dance music.`;
