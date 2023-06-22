import { TUserAddress } from "@/types/TUserAddress";
import { IBaseResponse } from "./IBaseResponse";
import { TOrderDto, TOrderItemsDto } from "@/types/TOrder";

export interface IOrderResponse extends IBaseResponse {
  depoterOrderId: string;
  edd: Date;
  orderReviewItems: OrderReviewItems[];
  total: number;
  userAddress?: TUserAddress;
  orderDetailsDto: TOrderDto[];
  orderItemsDto?: TOrderItemsDto;
  orderId: number;
}

export type OrderReviewItems = {
  image: string;
  productName: string;
  size: string;
  quantity: number;
  price: number;
};
