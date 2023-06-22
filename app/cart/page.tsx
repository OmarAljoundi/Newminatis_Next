import CartClientPage from "@/pages-sections/cart";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Newminatis - Cart",
};

export default function CartPage() {
  return (
    <div>
      <CartClientPage />
    </div>
  );
}
