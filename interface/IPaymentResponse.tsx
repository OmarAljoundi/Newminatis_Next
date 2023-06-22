import { TPaymentMethodModel } from "@/types/TUserPayment";
import { IBaseResponse } from "./IBaseResponse";

export interface IPaymentResponse extends IBaseResponse {
  clientSecret: string;
  intent: string;
  paymentMethodModel: TPaymentMethodModel[];
}
