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
