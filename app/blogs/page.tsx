import BlogClient from "@/pages-sections/blogs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Newminatis - Blogs",
};
export default function BlogsPage() {
  return (
    <main>
      <BlogClient />
    </main>
  );
}
