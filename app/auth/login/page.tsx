import LoginClientPage from "@/pages-sections/auth/login";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Newminatis - Login",
};

export default function LoginPage() {
  return (
    <div>
      <LoginClientPage />
    </div>
  );
}
