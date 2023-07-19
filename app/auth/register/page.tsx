import RegisterClientPage from "@/pages-sections/auth/register";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Newminatis - Register",
};
export default function RegisterPage() {
  return (
    <div>
      <RegisterClientPage />
    </div>
  );
}
