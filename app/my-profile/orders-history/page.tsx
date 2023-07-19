import OrderHistoryClient from "@/pages-sections/my-profile/OrderHistory";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Newminatis - Orders history",
};
export default function OrderHistory() {
  return (
    <section>
      <OrderHistoryClient />
    </section>
  );
}
