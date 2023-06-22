import { TProduct } from "@/types/TProduct";
import { IBaseResponse } from "./IBaseResponse";

export interface IProductResponse extends IBaseResponse {
  product: TProduct;
  products: TProduct[];
  total: number;
  minEdd: Date;
  maxEdd: Date;
  currentDate: Date;
  closeDay: string;
  hours: number;
}
