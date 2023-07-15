import { Items, TOrderRequest } from "@/types/TOrderRequest";
import { http } from "./httpService";
import axios from "axios";
import { IOrderResponse } from "@/interface/IOrderResponse";
import { TShoppingSession } from "@/types/TCheckoutSessionRequest";
import { IShoppingSessionResponse } from "@/interface/IShoppingSessionResponse";
import { IBaseResponse } from "@/interface/IBaseResponse";
import { TOrderRequestGuest } from "@/types/TOrderRequestGuest";

export type Prop = {
  sku: string;
  inventory_type: "domestic";
};
class OrderService {
  createOrder(data: TOrderRequest, token: string) {
    return http(axios.create(), false, token).post<IOrderResponse>(
      `/Order`,
      data
    );
  }

  getOrders() {
    return http(axios.create()).get<IOrderResponse>(`/Order`);
  }
  getOrderDetails(id: number) {
    return http(axios.create()).get<IOrderResponse>(`/Order/${id}`);
  }
  createCheckoutSession(data: TShoppingSession) {
    return http(axios.create()).post<IShoppingSessionResponse>(
      `/Order/CheckoutSession`,
      data
    );
  }
  checkStock(data: Items[]) {
    return http(axios.create()).post<IBaseResponse>(
      `/Order/CheckStockAvailable`,
      data
    );
  }

  createGuestOrder(data: TOrderRequestGuest) {
    return http(axios.create()).post<IOrderResponse>(
      `/Order/CreateGuestOrder`,
      data
    );
  }
}

export default new OrderService();
