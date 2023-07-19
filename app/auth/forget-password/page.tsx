import ForgetPasswordClient from "@/pages-sections/auth/forget-password";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Newminatis - Forget your password",
};
export default function ForgetPassword() {
  return (
    <div>
      <ForgetPasswordClient />
    </div>
  );
}
