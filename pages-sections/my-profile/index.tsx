"use client";
import { useSession } from "next-auth/react";
import AddressCards from "./AddressCards";
import AddressCardsLoading from "./AddressCardsLoading";
import AddressForm from "./AddressForm";

export default function MyProfileClient() {
  const { data: authedSession, status } = useSession();

  if (status == "loading") {
    return <AddressCardsLoading />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 mt-4 gap-4">
      <AddressCards />
      <AddressForm />
    </div>
  );
}
