import Breadcrumb from "@/pages-sections/shop/Breadcrumb";
import ProductService from "@/service/ProductService";
import { SearchQuery, eFilterOperator } from "@/types/TSearchQuery";
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
      link={[`/shop/${category}`, subCategory]}
      title={[category, subCategory]}
    />
  );
}
