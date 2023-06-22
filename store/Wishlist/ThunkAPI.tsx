import ProductService from "@/service/ProductService";
import { TProduct } from "@/types/TProduct";
import { SearchQuery, eFilterOperator } from "@/types/TSearchQuery";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateWishlist = createAsyncThunk(
  "project/updateWishlist",
  async (products: TProduct[]) => {
    var SearchQuery: SearchQuery = {
      FilterByOptions: [],
      OrderByOptions: [],
      PageIndex: 0,
      PageSize: 0,
    };
    var arrayOfCart = products.map((i) => i.id.toString()).join(",");
    SearchQuery.FilterByOptions.push({
      FilterFor: arrayOfCart,
      FilterOperator: eFilterOperator.Equal,
      MemberName: "listids",
    });
    const response = await ProductService.searchShop(SearchQuery);

    return response.data.products;
  }
);
