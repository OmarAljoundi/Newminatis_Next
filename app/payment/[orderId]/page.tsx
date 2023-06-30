import { DecryptData } from "@/helpers/Crypto";
import { IOrderResponse } from "@/interface/IOrderResponse";
import { OrderReviewClient } from "@/pages-sections/payment/[orderId]";

type Params = {
  params: {
    orderId: string;
  };
};
export default function OrderReview({ params: { orderId } }: Params) {
  return <OrderReviewClient {...DecryptData<IOrderResponse>(orderId)} />;
}
