import { TShoppingSession } from "@/types/TCheckoutSessionRequest";
import { IBaseResponse } from "./IBaseResponse";

export interface IShoppingSessionResponse extends IBaseResponse {
  shoppingSession: TShoppingSession;
}
