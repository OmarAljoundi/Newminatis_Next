import Breadcrumb from "@/pages-sections/shop/Breadcrumb";
import React from "react";

export default function BlogLayout({ children }) {
  return (
    <div>
      <main className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8 overflow-x-hidden">
        <div className=" border-b border-gray-200 pt-6">
          <h1 className="tracking-tight">
            <Breadcrumb link={["/", "/blogs"]} title={["Home", "Blogs"]} />
          </h1>
        </div>

        <section
          aria-labelledby="blogs-heading"
          className="pb-12 lg:pb-24 pt-6"
        >
          {children}
        </section>
      </main>
    </div>
  );
}
