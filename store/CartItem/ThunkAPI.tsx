import { createAsyncThunk } from "@reduxjs/toolkit";
import { CartItem } from "../Model/CartItem";
import { SearchQuery, eFilterOperator } from "@/types/TSearchQuery";
import ProductService from "@/service/ProductService";

export const updateCart = createAsyncThunk(
  "project/updateCart",
  async (CartItems: CartItem[]) => {
    if (CartItems.length > 0) {
      var SearchQuery: SearchQuery = {
        FilterByOptions: [],
        OrderByOptions: [],
        PageIndex: 0,
        PageSize: 0,
      };
      var arrayOfCart = CartItems.map((i) => i.id.toString()).join(",");
      SearchQuery.FilterByOptions.push({
        FilterFor: arrayOfCart,
        FilterOperator: eFilterOperator.Equal,
        MemberName: "listids",
      });
      const response = await ProductService.searchShop(SearchQuery);

      return response.data.products;
    }
    return [];
  }
);
