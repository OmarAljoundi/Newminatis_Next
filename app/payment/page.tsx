import PaymentClientPage from "@/pages-sections/payment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newminatis - Payment",
};
export default async function PaymentPage() {
  return (
    <div>
      <PaymentClientPage />
    </div>
  );
}
