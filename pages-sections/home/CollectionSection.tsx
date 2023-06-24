"use client";
import { BlurImage } from "@/components/BlurImage";
import CategorySectionCreator from "@/components/CategorySectionCreator";
import { H2 } from "@/components/Typography";
import { Grid } from "@mui/material";
import Image from "next/legacy/image";
import Link from "next/link";
const images = [
  {
    labtop: "/assets/images/custom/pic_1.jpg",
    text: "Men",
    url: `shop/men`,
    offset: "0",
    delay: "0",
    type: "fade-left",
  },
  {
    labtop: "/assets/images/custom/pic_4.jpg",
    text: "Women",
    url: `shop/women`,
    offset: "0",
    delay: "400",
    type: "fade-right",
  },
  {
    labtop: "/assets/images/custom/Collection(Dune).jpg",
    text: "DUNE",
    url: "shop/dune",
    offset: "0",
    delay: "800",
    type: "fade-left",
  },
  {
    labtop: "/assets/images/custom/unisex2.jpg",
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
      <Grid container spacing={0}>
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
      </Grid>
    </CategorySectionCreator>
  );
};

export default CollectionSection;

//image smooth-image image-visible
