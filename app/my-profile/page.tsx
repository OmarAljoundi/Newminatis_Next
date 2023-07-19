import MyProfileClient from "@/pages-sections/my-profile";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Newminatis - My Profile",
};
export default function MyProfile() {
  return (
    <div>
      <MyProfileClient />
    </div>
  );
}
