import CheckoutClientPage from "@/pages-sections/checkout";
import CheckoutPage2 from "@/pages-sections/checkout/index2";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newminatis - Checkout",
};
export default function CheckoutPage() {
  return (
    <div>
      <CheckoutPage2 />
    </div>
  );
}
