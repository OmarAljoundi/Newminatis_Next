import { FC } from "react";
import { Box, styled } from "@mui/material";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper";
import { layoutConstant } from "@/utils/constants";
import { FlexBetween } from "../flex-box";
import { Span } from "../Typography";
import Image from "next/image";

// styled component
const TopbarWrapper = styled(Box, {
  shouldForwardProp: (props) => props !== "bgColor",
})<{ bgColor: any }>(({ theme, bgColor }) => ({
  fontSize: 12,
  height: layoutConstant.topbarHeight,
  background: bgColor || theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  "& .topbarLeft": {
    "& .logo": { display: "none" },
    "& .title": { marginLeft: "10px" },
    "@media only screen and (max-width: 900px)": {
      "& .logo": { display: "block" },
      "& > *:not(.logo)": { display: "none" },
    },
  },
  "& .topbarRight": {
    "& .link": {
      paddingRight: 30,
      color: theme.palette.secondary.contrastText,
    },

    "@media only screen and (max-width: 900px)": {
      "& .link": { display: "none" },
    },
  },
  "& .menuItem": { minWidth: 100 },
  "& .marginRight": { marginRight: "1.25rem" },
  "& .handler": { height: layoutConstant.topbarHeight },
  "& .smallRoundedImage": { height: 15, width: 25, borderRadius: 2 },
  "& .menuTitle": { fontSize: 12, marginLeft: "0.5rem", fontWeight: 600 },
}));

// ===========================================
type TopbarProps = { bgColor?: string };
// ===========================================

const Topbar: FC<TopbarProps> = ({ bgColor }) => {
  return (
    <TopbarWrapper
      bgColor={bgColor}
      sx={{ overflow: "hidden", height: "30px" }}
    >
      <Swiper
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        loop={true}
        modules={[Autoplay, EffectFade]}
      >
        <SwiperSlide className="swiper-slider-section">
          <FlexBetween alignItems={"flex-start"} justifyContent={"center"}>
            <span className="marquee_span text-sm block mt-2 text-left font-semibold">
              FREE WORLDWIDE EXPRESS SHIPPING
            </span>
          </FlexBetween>
        </SwiperSlide>
        <SwiperSlide className="swiper-slider-section">
          <FlexBetween alignItems={"flex-start"} justifyContent={"center"}>
            <span className="marquee_span text-sm block mt-2 text-left font-semibold">
              SAME DAY DELIVERY IN UAE
            </span>
          </FlexBetween>
        </SwiperSlide>
        <SwiperSlide className="swiper-slider-section">
          <FlexBetween alignItems={"flex-start"} justifyContent={"center"}>
            <Image
              src={"/assets/images/payments/apple-pay-light.png"}
              width={30}
              height={30}
              alt="apple pay logo"
            />
            <span className="marquee_span text-sm block mt-2 text-left font-semibold">
              GO SEAMLESS WITH APPLE PAY
            </span>
          </FlexBetween>
        </SwiperSlide>
      </Swiper>
    </TopbarWrapper>
  );
};

export default Topbar;
