import React, { FC, ReactNode, Suspense } from "react";
import "../public/assets/css/globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "aos/dist/aos.css";
type RootLayoutProp = {
  children: ReactNode;
};

import { Inter } from "next/font/google";
import ShopLayout from "@/components/layouts/ShopLayout";

const inter = Inter({
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  fallback: ["sans-serif"],
  subsets: ["latin"],
});

const RootLayout: FC<RootLayoutProp> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div id="__next">
          <ShopLayout>{children}</ShopLayout>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
