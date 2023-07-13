import Breadcrumb from "@/pages-sections/shop/Breadcrumb";
import React from "react";

export default function MainShop() {
  return <Breadcrumb link={["/", "/shop"]} title={["Home", "Shop"]} />;
}
