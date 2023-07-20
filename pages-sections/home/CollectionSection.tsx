"use client";
import { BlurImage } from "@/components/BlurImage";
import CategorySectionCreator from "@/components/CategorySectionCreator";
import { H2 } from "@/components/Typography";
import { Button, Grid } from "@mui/material";
import Image from "next/legacy/image";
import Link from "next/link";
import { useState } from "react";
const images = [
  {
    photo: "/assets/images/custom/pic_3.jpg",
    text: "Shop Men",
    url: `shop/men`,
    offset: "0",
    delay: "0",
    type: "fade-left",
    cc: "mx-auto",
  },
  {
    photo: "/assets/images/custom/pic_4.jpg",
    text: "Shop Women",
    url: `shop/women`,
    offset: "0",
    delay: "400",
    type: "fade-right",
    cc: "mx-auto",
  },
  {
    photo: "/assets/images/custom/pic_2.jpg",
    text: "Shop UNISEX",
    url: "shop/unisex",
    offset: "0",
    delay: "1200",
    type: "fade-right",
    cc: "mx-auto",
  },
  // {
  //   photo: "/assets/images/custom/Collection(Dune).jpg",
  //   text: "Shop DUNE",
  //   url: "shop/dune",
  //   offset: "0",
  //   delay: "800",
  //   type: "fade-left",
  //   cc: "md:ml-0 md:mr-auto mx-auto",
  // },
];

const CollectionSection = () => {
  const [isLoading, setLoading] = useState(true);
  return (
    <CategorySectionCreator
      alignItems={"baseline"}
      title="COLLECTIONS"
      seeMoreLink="/shop"
      sx={{ px: "0!important" }}
    >
      <section className="">
        <div className="max-w-7xl mx-auto ">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {images.map((item, index) => (
              <div className="relative aspect-[1/1] md:aspect-[2/2] overflow-hidden  bg-gray-200 w-full h-full">
                <Image
                  alt={"banner"}
                  src={item.photo}
                  title={"banner"}
                  layout="fill"
                  fetchPriority={"high"}
                  loading={"eager"}
                  objectFit="cover"
                  quality={80}
                  className={`duration-700 ease-in-out group-hover:opacity-75 ${
                    isLoading
                      ? "scale-110 blur-2xl grayscale"
                      : "scale-100 blur-0 grayscale-0"
                  })`}
                  onLoad={() => setLoading(false)}
                />

                <div className="absolute bg-gray-800 opacity-50 w-full h-full"></div>
                <H2
                  color={"white"}
                  className={`w-2/4 text-2xl ${item.cc}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    flexDirection: "column",
                    textTransform: "uppercase",
                    textAlign: "center",
                  }}
                >
                  <Link href={"/shop"} className=" mt-4">
                    <Button color="secondary" className="w-32">
                      <span className="font-bold text-xs">{item.text}</span>
                    </Button>
                  </Link>
                </H2>
              </div>
            ))}
          </div>
        </div>
      </section>
    </CategorySectionCreator>
  );
};

export default CollectionSection;

//image smooth-image image-visible

{
  /* <Grid container spacing={0}>
        {images?.map((i, index) => (
          <Grid item xs={6} sm={6} md={6}>
            <Link href={i.url}>
              <div className="relative aspect-[1/1.5] md:aspect-[1/1]">
                <Image
                  src={i.labtop}
                  layout="fill"
                  objectFit="cover"
                  loading="eager"
                  fetchPriority="high"
                  priority={true}
                />
                <div className="absolute bg-gray-800 opacity-70 w-full h-full">
                  <H2
                    color={"white"}
                    className="text-2xl"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    {i.text}
                  </H2>
                </div>
              </div>
            </Link>
          </Grid>
        ))}
      </Grid> */
}
