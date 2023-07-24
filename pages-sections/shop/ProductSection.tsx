"use client";
import { IProductResponse } from "@/interface/IProductResponse";
import React, { FC } from "react";
import { Theme, useMediaQuery } from "@mui/material";
import ShopMobileCard from "@/components/product-card/ShopMobileCard";
import ShopCard from "@/components/product-card/ShopCard";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

export const ProductSection: FC<{
  response: IProductResponse;
}> = ({ response }) => {
  const downSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  if (response.total == 0) {
    return (
      <div className="grid mx-auto justify-items-center">
        <ExclamationCircleIcon color="black" className="text-normal w-12" />
        <div className="mt-4 grid justify-items-center">
          <span className="text-normal font-bold">
            Your search returend no result
          </span>
          <span className="text-xs font-bold">
            Try clear some filters or change the collection
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="grid  md:grid-cols-3 grid-cols-2 gap-3">
      {response.products.map((item) => (
        <article key={item.id}>
          {downSm ? (
            <ShopMobileCard
              discount={(item.salePrice as unknown as number) ?? 0}
              product={item}
            />
          ) : (
            <ShopCard
              discount={(item.salePrice as unknown as number) ?? 0}
              product={item}
            />
          )}
        </article>
      ))}
    </div>
  );
};

export default ProductSection;
