"use client";
import { BlurImage } from "@/components/BlurImage";
import CategorySectionCreator from "@/components/CategorySectionCreator";
import { H2 } from "@/components/Typography";
import { Grid } from "@mui/material";
import Image from "next/legacy/image";
import Link from "next/link";
const images = [
  {
    photo: "/assets/images/custom/pic_1.jpg",
    text: "Men",
    url: `shop/men`,
    offset: "0",
    delay: "0",
    type: "fade-left",
  },
  {
    photo: "/assets/images/custom/pic_4.jpg",
    text: "Women",
    url: `shop/women`,
    offset: "0",
    delay: "400",
    type: "fade-right",
  },
  {
    photo: "/assets/images/custom/Collection(Dune).jpg",
    text: "DUNE",
    url: "shop/dune",
    offset: "0",
    delay: "800",
    type: "fade-left",
  },
  {
    photo: "/assets/images/custom/unisex2.jpg",
    text: "UNISEX",
    url: "shop/unisex",
    offset: "0",
    delay: "1200",
    type: "fade-right",
  },
];
const CollectionSection = () => {
  return (
    <CategorySectionCreator
      alignItems={"baseline"}
      title="COLLECTIONS"
      seeMoreLink="/shop"
      sx={{ px: "0!important" }}
    >
      <section className="">
        <div className="max-w-7xl mx-auto ">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {images.map((item, index) => (
              <div
                className="relative overflow-hidden h-40 md:h-96"
                key={index}
              >
                <div className="absolute top-0 left-0 right-0 bottom-0">
                  <BlurImage
                    image={item.photo}
                    title={item.text}
                    loading="eager"
                    priority="low"
                    q={85}
                  />
                </div>

                <div
                  className="p-6 relative h-full hover:backdrop-blur-sm bg-white/30 transition-all duration-500"
                  style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                >
                  <div className="grid items-end h-full mt-7">
                    <p className="font-bold text-xs md:text-lg text-white  text-center h-auto">
                      {item.text}
                    </p>
                    <div className="text-center h-full">
                      <Link
                        href={item.url}
                        title=""
                        className="text-xs transition-all duration-300 font-semibold
                     text-white px-2 py-1 bg-zinc-900 border-transparent border 
                      justify-center items-center inline-flex hover:bg-white hover:text-black"
                        role="button"
                      >
                        Shop Now
                        <span
                          className="absolute right-0 left-0 top-0 bottom-0"
                          aria-hidden="true"
                        ></span>
                      </Link>
                    </div>
                  </div>
                </div>
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
