import TrackOrdersClient from "@/pages-sections/my-profile/TrackOrders";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Newminatis - Track my orders",
};
export default function TrackOrders() {
  return (
    <section>
      <TrackOrdersClient />
    </section>
  );
}
