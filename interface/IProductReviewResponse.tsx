import { TProductReview } from "@/types/TProductReview";
import { IBaseResponse } from "./IBaseResponse";

export interface IProductReviewResponse extends IBaseResponse {
  productReview: TProductReview;
  productReviews: TProductReview;
  encryptedReview: EncryptedReview;
}

export type EncryptedReview = {
  email: string;
  userId?: number;
};
