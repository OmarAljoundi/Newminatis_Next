"use client";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { HeroImage } from "@/components/HeroImage";

type TContent = {
  text: string;
  imageUrl: string;
  actionUrl: string;
  actionText: string;
  cc: string;
};
const HeroSection = () => {
  const PC_Content: TContent[] = [
    {
      actionText: "Shop All",
      actionUrl: "/shop",
      imageUrl: "/assets/images/new_collection/IMG_3.JPG",
      text: "Embrace your individual style",
      cc: "lg:ml-auto lg:mr-0 mx-auto",
    },
    {
      actionText: "Shop Now",
      actionUrl: "/shop/latest-collection",
      imageUrl: "/assets/images/new_collection/IMG_2.JPG",
      text: "Latest Collection",
      cc: "lg:ml-auto lg:mr-7 mx-auto",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 mb-2">
      {PC_Content.map((item, index) => (
        <HeroImage
          src={item.imageUrl}
          content={item.text}
          key={item.imageUrl}
          actionUrl={item.actionUrl}
          buttonText={item.actionText}
          cc={item.cc}
        />
      ))}
    </div>
  );
};

export default HeroSection;
