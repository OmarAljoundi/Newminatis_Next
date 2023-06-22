import { IPaymentResponse } from "@/interface/IPaymentResponse";
import { http } from "./httpService";
import axios from "axios";
import {
  TCheckoutRequest,
  TCheckoutSavedCardRequest,
} from "@/types/TCheckoutRequest";
import { TUserStripePayment } from "@/types/TUser";

class PaymentService {
  session(data: TCheckoutRequest) {
    return http(axios.create()).post<IPaymentResponse>(
      `/Payment/Session`,
      data
    );
  }

  chargeSavedCard(data: TCheckoutSavedCardRequest) {
    return http(axios.create()).post<IPaymentResponse>(`/Payment/Charge`, data);
  }

  createCustomer(user: TUserStripePayment) {
    return http(axios.create()).post<IPaymentResponse>(
      `/Payment/CreateUser`,
      user
    );
  }

  createIntent(amount: number) {
    return http(axios.create()).post<IPaymentResponse>(
      `/Payment/Intent/${amount}`
    );
  }
  deletePayment(paymentId: string) {
    return http(axios.create()).delete<IPaymentResponse>(
      `/Payment/PaymentMethod/${paymentId}`
    );
  }
}

export default new PaymentService();
