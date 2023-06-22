import Breadcrumb from "@/pages-sections/shop/Breadcrumb";
import ProductService from "@/service/ProductService";
import { SearchQuery, eFilterOperator } from "@/types/TSearchQuery";
import React from "react";

type Params = {
  params: {
    category: string;
  };
};
export default async function SingleProductPage({
  params: { category },
}: Params) {
  return <Breadcrumb link={category} title={category} />;
}
