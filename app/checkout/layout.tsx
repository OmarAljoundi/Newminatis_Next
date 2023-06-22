"use client";
import CheckoutNavLayout from "@/components/layouts/CheckoutNavLayout";
import React, { FC, ReactNode } from "react";

type RootLayoutProp = {
  children: ReactNode;
};

const CheckoutLayout: FC<RootLayoutProp> = ({ children }) => {
  return <CheckoutNavLayout>{children}</CheckoutNavLayout>;
};

export default CheckoutLayout;
