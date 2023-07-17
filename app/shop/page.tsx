import Breadcrumb from "@/pages-sections/shop/Breadcrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Shop",
  description: "",
};
export default function MainShop() {
  return <Breadcrumb link={["/", "/shop"]} title={["Home", "Shop"]} />;
}
