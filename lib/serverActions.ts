import { IProductResponse } from "@/interface/IProductResponse";
import { InstgramResponse } from "@/interface/InstgramResponse";
import ProductService from "@/service/ProductService";
import { SearchQuery } from "@/types/TSearchQuery";
import { cache } from "react";

export const getCategories = async () => {
  const result = await ProductService.getCategories();

  return result.data;
};

export const searchProducts = async (
  searchQuery: SearchQuery,
  revalidate?: number
) => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_URL_PRODUCTION!}/Product/SearchShop`,
    {
      method: "POST",
      body: JSON.stringify(searchQuery),
      next: {
        revalidate: 0,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await result.json();
  return data as IProductResponse;
};

export const getProductData = async (searchQuery: SearchQuery) => {
  const result = await fetch(
    "https://api_v2.newminatis.com/api/Product/GetOne",
    {
      method: "POST",
      body: JSON.stringify(searchQuery),
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 0,
      },
    }
  );
  const data = await result.json();
  return data as IProductResponse;
};

export const getInstagramData = async () => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_URL_PRODUCTION!}/External/InstagramFeed`,
    {
      method: "GET",
      next: {
        revalidate: 86400,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await result.json();
  return data as InstgramResponse;
};
