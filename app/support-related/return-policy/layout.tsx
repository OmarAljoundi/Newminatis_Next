import Breadcrumb from "@/pages-sections/shop/Breadcrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Return Policy - Newminatis",
};

export default function ReturnPolicyLayout({ children }) {
  return (
    <div className="px-0 mx-auto sm:px-0 lg:px-8 max-w-7xl">
      <div className="border-b border-gray-200 pb-3 ">
        <Breadcrumb
          link={["/", "support-related/shipping-information"]}
          title={["Home", "Return Policy"]}
        />
      </div>
      <div className="max-w-2xl mx-auto text-center pt-6">
        <h2 className="text-2xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
          Return Policy
        </h2>
      </div>
      {children}
    </div>
  );
}
