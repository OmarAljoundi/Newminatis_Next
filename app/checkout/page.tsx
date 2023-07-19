import CheckoutClientPage from "@/pages-sections/checkout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newminatis - Checkout",
};
export default function CheckoutPage() {
  return (
    <div>
      <CheckoutClientPage />
    </div>
  );
}
