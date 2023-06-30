import { OrderReviewClient } from "@/pages-sections/order_confirmation";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Newminatis - Your order is confirmed",
};

export default function OrderConfirmation() {
  return <OrderReviewClient />;
}
