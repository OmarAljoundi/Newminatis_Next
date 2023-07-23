export const revalidate = 86400;
export const dynamic = "force-dynamic";
export const fetchCache = "force-cache";
import { PrepareSQObject, getSubCategories } from "@/helpers/Extensions";
import { getCategories, searchProducts } from "@/lib/serverActions";
import Breadcrumb from "@/pages-sections/shop/Breadcrumb";
import ProductSection from "@/pages-sections/shop/ProductSection";
import { Order, SearchQuery, eFilterOperator } from "@/types/TSearchQuery";
import React from "react";
import { SP } from "../../page";

type Params = {
  params: {
    subCategory: string;
    category: string;
  };
  searchParams: SP;
};
export default async function ShopSubCategoryPage({
  params: { subCategory, category },
  searchParams,
}: Params) {
  const _SQ = PrepareSQObject(searchParams);
  const categories = await getCategories();
  _SQ.FilterByOptions.push({
    MemberName: "category",
    FilterFor: categories?.find(
      (x) => x.description.toLowerCase() == (category as string).toLowerCase()
    )?.name,
    FilterOperator: eFilterOperator.Equal,
  });

  if (category !== subCategory) {
    _SQ.FilterByOptions.push({
      MemberName: "subcategory",
      FilterFor: getSubCategories(category as string, categories).find(
        (x) =>
          x.description.toLowerCase() == (subCategory.toLowerCase() as string)
      )?.id,
      FilterOperator: eFilterOperator.Equal,
    });
  }

  const data = await Promise.all([searchProducts(_SQ)]);
  return (
    <>
      <ProductSection response={data[0]} />
    </>
  );
}
