"use client";
import React, { FC, ReactNode, useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { persistor, store } from "@/store";
import { Toaster } from "react-hot-toast";
import MuiTheme from "@/theme/MuiTheme";
import "../public/assets/css/globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ShopLayout from "@/components/layouts/ShopLayout";
import { SessionProvider } from "next-auth/react";
import Aos from "aos";
import "aos/dist/aos.css";
type RootLayoutProp = {
  children: ReactNode;
};

import { Inter } from "next/font/google";

const inter = Inter({
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  fallback: ["sans-serif"],
  subsets: ["latin"],
});

const RootLayout: FC<RootLayoutProp> = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({
      behavior: "instant" as any,
      left: 0,
      top: 0,
    });
  }, [pathname]);

  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div id="__next">
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <QueryClientProvider client={new QueryClient()}>
                <MuiTheme>
                  <Toaster />
                  <SessionProvider>
                    <ShopLayout>{children}</ShopLayout>
                  </SessionProvider>
                </MuiTheme>
              </QueryClientProvider>
            </PersistGate>
          </Provider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
