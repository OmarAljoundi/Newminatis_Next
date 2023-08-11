"use client";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export const InstagramLoading = () => {
  return (
    <div className="relative">
      <div className="swiper-button-insta image-swiper-button-next-insta">
        <ArrowForwardIcon />
      </div>
      <div className="swiper-button-insta image-swiper-button-prev-insta">
        <ArrowBackIcon />
      </div>
      <Container sx={{ py: 0, maxWidth: "1500px" }}>
        <Swiper
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
          }}
          breakpoints={{
            350: {
              slidesPerView: 1,
            },

            600: {
              slidesPerView: 2,
            },

            992: {
              slidesPerView: 4,
            },
          }}
          spaceBetween={50}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation, Autoplay]}
          navigation={{
            nextEl: ".image-swiper-button-next-insta",
            prevEl: ".image-swiper-button-prev-insta",
            disabledClass: "swiper-button-disabled-insta",
          }}
          className="instaSwiper"
        >
          {Array.from(new Array(4)).map((item, index) => (
            <SwiperSlide
              key={index + 99}
              className="swiper-slider-section"
              style={{ borderRadius: "14px" }}
            >
              <a href={"#"} target="_blank">
                <Card elevation={6} sx={{ padding: "0!important" }}>
                  <Skeleton
                    variant="rectangular"
                    className="aspect-[1/1]"
                    sx={{
                      borderRadius: "0",
                      width: "100%",
                      height: "400px",
                      minHeight: "100%",
                    }}
                  />
                </Card>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};
