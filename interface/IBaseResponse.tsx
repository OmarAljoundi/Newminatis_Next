import { TCheckStockResponse } from "@/types/TCheckStockResponse";

export interface IBaseResponse {
  success: boolean;
  errors: string[];
  message: string;
  stockErrors: TCheckStockResponse[];
}
