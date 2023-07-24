export const revalidate = 86400;
export const dynamic = "force-dynamic";
export const fetchCache = "force-cache";
import { PrepareSQObject } from "@/helpers/Extensions";
import { getCategories, searchProducts } from "@/lib/serverActions";
import Breadcrumb from "@/pages-sections/shop/Breadcrumb";
import ProductSection from "@/pages-sections/shop/ProductSection";
import { Order, SearchQuery, eFilterOperator } from "@/types/TSearchQuery";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Shop",
  description: "",
};

export type SP = {
  minprice: string;
  maxprice: string;
  color: string;
  size: string;
  sort: string;
};

type Params = {
  params: any;
  searchParams: SP;
};

export default async function MainShopPage({ searchParams }: Params) {
  const _SQ = PrepareSQObject(searchParams);
  const data = await Promise.all([searchProducts(_SQ)]);
  return (
    <>
      <ProductSection response={data[0]} />
    </>
  );
}
