"use client";
import {
  FC,
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import ProviderRouteChange from "../analytics/ProviderRouteChange";
import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import MuiTheme from "@/theme/MuiTheme";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import Sticky from "../sticky/Sticky";
import Topbar from "../topbar/Topbar";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { usePathname } from "next/navigation";
import Aos from "aos";

// ===================================================
type ShopLayoutProps = {
  children: ReactNode;
};
// ===================================================

const ShopLayout: FC<ShopLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed: boolean) => setIsFixed(fixed), []);
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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={new QueryClient()}>
          <MuiTheme>
            <Toaster />
            <SessionProvider>
              <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={0}>
                <Topbar bgColor={"#1e1e1e"} />
                <Header />
              </Sticky>
              <div className="section-after-sticky overflow-x-hidden ">
                <ProviderRouteChange />
                {children}
              </div>
              <Footer />
            </SessionProvider>
          </MuiTheme>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default ShopLayout;
