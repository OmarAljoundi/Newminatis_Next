"use client";
import { calcualteQty } from "@/helpers/Extensions";
import { useAppSelector } from "@/hooks/useRedux";
import { usePathname } from "next/navigation";
import {
  FC,
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import Sticky from "../sticky/Sticky";
import Topbar from "../topbar/Topbar";
import Header from "../header/Header";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import CartSticky from "../CartSticky";
import Footer from "../footer/Footer";
import { Router } from "next/router";
import FacebookService from "@/service/FacebookService";
import { ViewContentEvent, grapUserData } from "@/helpers/FacebookEvent";
import ProviderRouteChange from "../analytics/ProviderRouteChange";

// ===================================================
type ShopLayoutProps = {
  children: ReactNode;
};
// ===================================================

const ShopLayout: FC<ShopLayoutProps> = ({ children }) => {
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed: boolean) => setIsFixed(fixed), []);
  const cartItems = useAppSelector((state) =>
    calcualteQty(state.Store.CartReducer?.CartItems || [])
  );

  return (
    <Fragment>
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={0}>
        <Topbar bgColor={"#1e1e1e"} />
        <Header />
      </Sticky>

      <div className="section-after-sticky overflow-x-hidden">
        <ProviderRouteChange />
        {children}
      </div>

      <Footer />
    </Fragment>
  );
};

export default ShopLayout;
