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

type RootLayoutProp = {
  children: ReactNode;
};

const RootLayout: FC<RootLayoutProp> = ({ children }) => {
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap");
    }
  }, []);

  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({
      behavior: "instant" as any,
      left: 0,
      top: 0,
    });
  }, [pathname]);

  return (
    <html lang="en">
      <body>
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
