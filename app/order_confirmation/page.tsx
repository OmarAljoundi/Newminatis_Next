"use client";
import { OrderReviewClient } from "@/pages-sections/order_confirmation";
import React from "react";

export default function OrderConfirmation(props) {
  return <OrderReviewClient secret={props.searchParams.secret} />;
}
