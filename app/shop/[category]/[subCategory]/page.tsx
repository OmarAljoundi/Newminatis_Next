import Breadcrumb from "@/pages-sections/shop/Breadcrumb";
import React from "react";

type Params = {
  params: {
    subCategory: string;
    category: string;
  };
};
export default async function ShopSubCategoryPage({
  params: { subCategory, category },
}: Params) {
  return (
    <Breadcrumb
      link={[
        "/",
        "/shop",
        `/shop/${category}`,
        `/shop/${category}/${subCategory}`,
      ]}
      title={["Home", "Shop", category, subCategory]}
    />
  );
}
