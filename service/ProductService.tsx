import { IProductResponse } from "@/interface/IProductResponse";
import { http } from "./httpService";
import axios from "axios";
import { TProduct } from "@/types/TProduct";
import { TProductCategory } from "@/types/TProductCategory";
import { TProductTags } from "@/types/TProductTags";
import { TProductInventory } from "@/types/TProductInventory";
import { IStockResponse, TStockRequest } from "@/types/TStockRequest";
import { SearchQuery } from "@/types/TSearchQuery";
import { Crypt, TProductReview } from "@/types/TProductReview";
import { IProductReviewResponse } from "@/interface/IProductReviewResponse";

class ProductService {
  create(data: TProduct) {
    return http(axios.create()).post<IProductResponse>(`/Product`, data);
  }

  uploadImages(data: FormData) {
    return http(axios.create()).post<IProductResponse>(`/Product/Upload`, data);
  }

  getCategories() {
    return http(axios.create()).get<TProductCategory[]>(`/Product/Category`);
  }

  getTags() {
    return http(axios.create()).get<TProductTags[]>(`/Product/Tags`);
  }

  removeCategories(id: number) {
    return http(axios.create()).delete<any>(`/Product/Category/${id}`);
  }

  postCategory(data: TProductCategory) {
    return http(axios.create()).post<TProductCategory>(
      `/Product/Category`,
      data
    );
  }

  getVariants() {
    return http(axios.create()).get<TProductInventory[]>(`/Product/Variants`);
  }
  search() {
    return http(axios.create()).get<IProductResponse>(`/Product/Search`);
  }
  searchShop(search: SearchQuery) {
    return http(axios.create()).post<IProductResponse>(
      `/Product/SearchShop`,
      search
    );
  }
  getById(id: number) {
    return http(axios.create()).get<IProductResponse>(`/Product/${id}`);
  }

  getQuantity(stock: TStockRequest) {
    return http(axios.create()).post<IStockResponse>("/External/Stock", stock);
  }
  submitReview(data: TProductReview) {
    return http(axios.create()).post<IProductReviewResponse>(
      "/Product/SubmitReview",
      data
    );
  }
  searchOne(search: SearchQuery) {
    return http(axios.create()).post<IProductResponse>(
      `/Product/GetOne`,
      search
    );
  }
  getProductForReview(cipher: Crypt) {
    return http(axios.create()).post<IProductReviewResponse>(
      `/Review/Decrypt`,
      cipher
    );
  }

  submitReviewFromEmail(data: TProductReview) {
    return http(axios.create()).post<IProductReviewResponse>(
      `/Review/SubmitReview`,
      data
    );
  }
}

export default new ProductService();
