export const revalidate = false;
export const dynamic = "force-dynamic";
import { PrepareSQObject } from "@/helpers/Extensions";
import { getCategories, searchProducts } from "@/lib/serverActions";
import Breadcrumb from "@/pages-sections/shop/Breadcrumb";
import ProductSection from "@/pages-sections/shop/ProductSection";
import { Order, SearchQuery, eFilterOperator } from "@/types/TSearchQuery";
import React from "react";
import { SP } from "../page";

type Params = {
  params: {
    category: string;
  };
  searchParams: SP;
};
export default async function ShopCategoryPage({
  params: { category },
  searchParams,
}: Params) {
  const _SQ = PrepareSQObject(searchParams);
  if (category != "latest-collection") {
    const categories = await getCategories();
    _SQ.FilterByOptions.push({
      MemberName: "category",
      FilterFor: categories?.find(
        (x) => x.description.toLowerCase() == (category as string).toLowerCase()
      )?.name,
      FilterOperator: eFilterOperator.Equal,
    });
  } else {
    _SQ.FilterByOptions.push({
      MemberName: "tags",
      FilterOperator: eFilterOperator.Equal,
      FilterFor: "Latest Collection",
    });
  }
  const data = await Promise.all([searchProducts(_SQ)]);
  return (
    <>
      <ProductSection response={data[0]} />
    </>
  );
}
