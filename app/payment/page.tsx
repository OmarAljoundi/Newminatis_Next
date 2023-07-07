import client from "@/lib/prismadb";
import PaymentClientPage from "@/pages-sections/payment";

export default async function PaymentPage() {
  return (
    <div>
      <PaymentClientPage />
    </div>
  );
}
