import { IconButton } from "@mui/material";
import React, { FC } from "react";
import BlurCircularIcon from "@mui/icons-material/BlurCircular";
import { TBlogs } from "@/types/TBlog";
import { BlurImage } from "@/components/BlurImage";
import { Autoplay, EffectCreative, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

type BlogView = {
  blog: TBlogs;
};

export const BlogView: FC<BlogView> = ({ blog }) => {
  return (
    <div className="grid grid-cols-2 gap-y-3 gap-x-3 ">
      <div className="col-span-2">
        <div className="flex justify-start items-center">
          <IconButton sx={{ pl: 0 }}>
            <BlurCircularIcon sx={{ color: "black" }} />
          </IconButton>
          <p className="text-base md:text-lg font-bold">{blog.title}</p>
        </div>
        <p className="px-2 md:px-0 text-xs md:text-base font-medium">
          {blog.description}
        </p>
      </div>

      {blog.blogImages?.map((item, index) => (
        <div key={index}>
          <BlurImage
            image={item.imageUrl}
            customAspect="aspect-[1/1]"
            q={100}
            priority="high"
            loading="eager"
          />
        </div>
      ))}

      <div className="col-span-2">
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
          loop={true}
          grabCursor={true}
          effect={"creative"}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          loopFillGroupWithBlank={true}
          speed={1200}
          className="mySwiper-1"
        >
          {blog.blogSlides?.map((item, index) => (
            <SwiperSlide key={index}>
              <BlurImage
                image={item.imageUrl}
                height={340}
                priority="high"
                loading="eager"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
