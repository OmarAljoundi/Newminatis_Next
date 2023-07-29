import { IProductResponse } from "@/interface/IProductResponse";
import ProductService from "@/service/ProductService";
import { SearchQuery } from "@/types/TSearchQuery";
import { cache } from "react";

export const getCategories = async () => {
  const result = await ProductService.getCategories();

  return result.data;
};

export const searchProducts = cache(async (searchQuery: SearchQuery) => {
  const result = await ProductService.searchShop(searchQuery);
  return result.data;
});

export const getProductData = async (searchQuery: SearchQuery) => {
  const result = await fetch(
    "https://api_v2.newminatis.com/api/Product/GetOne",
    {
      method: "POST",
      body: JSON.stringify(searchQuery),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await result.json();
  return data as IProductResponse;
};
