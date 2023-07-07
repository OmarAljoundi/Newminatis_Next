"use client";
import CheckoutNavLayout from "@/components/layouts/CheckoutNavLayout";
import Breadcrumb from "@/pages-sections/shop/Breadcrumb";
import React, { FC, ReactNode } from "react";

type RootLayoutProp = {
  children: ReactNode;
};

const CartLayout: FC<RootLayoutProp> = ({ children }) => {
  return (
    <main className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8 py-4">
      <div className="flex items-baseline justify-between border-b border-gray-200  pt-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          <Breadcrumb title={["Cart"]} link={["/cart"]} />
        </h1>
      </div>

      <section aria-labelledby="products-heading" className="px-2 lg:px-0">
        {children}
      </section>
    </main>
  );
};

export default CartLayout;
