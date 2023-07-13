"use client";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper";
import { Box, Card, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SettingService from "@/service/SettingService";
import { InstgramResponse } from "@/interface/InstgramResponse";
import { TInstagram } from "@/types/TInstagram";
import { BlurImage } from "@/components/BlurImage";

export const InstagramSection = () => {
  const [instagramFeeds, setInstagramFeeds] = useState<TInstagram[]>([]);
  const fetchInstagramData = async () => {
    const response =
      (await SettingService.getInstgramFeed()) as AxiosResponse<InstgramResponse>;

    setInstagramFeeds(response.data.instagram);
  };
  useEffect(() => {
    fetchInstagramData();
  }, []);

  return (
    <>
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
            {instagramFeeds
              ?.filter((x) => x.media_type != "VIDEO")
              .map((item, index) => (
                <SwiperSlide
                  key={index + 99}
                  className="swiper-slider-section"
                  style={{ borderRadius: "14px" }}
                >
                  <a href={item.permalink} target="_blank">
                    <Card elevation={6} sx={{ padding: "0!important" }}>
                      <BlurImage
                        image={item.media_url}
                        height={400}
                        title={item.permalink}
                        loading="lazy"
                        priority="auto"
                        q={80}
                      />
                    </Card>
                  </a>
                </SwiperSlide>
              ))}
          </Swiper>
        </Container>
      </div>
    </>
  );
};
