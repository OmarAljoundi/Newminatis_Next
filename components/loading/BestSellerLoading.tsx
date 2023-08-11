"use client";
import Box from "@mui/material/Box";

import CategorySectionCreator from "../CategorySectionCreator";
import Image from "next/image";
import { ProductCardLoading } from "./ProductCardLoading";

export const BestSellerLoading = () => {
  return (
    <CategorySectionCreator
      alignItems={"baseline"}
      icon={
        <Image
          width={40}
          height={30}
          src="/assets/images/logos/newminatis-LOGO-black.png"
          alt="Newminatis Logo"
        />
      }
      title="BEST SELLERS"
      seeMoreLink="/shop"
    >
      <Box mb={3.5} sx={{ position: "relative" }}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-2">
          {Array.from(new Array(8)).map((item, index) => (
            <div>
              <ProductCardLoading />
            </div>
          ))}
        </div>
      </Box>
    </CategorySectionCreator>
  );
};
