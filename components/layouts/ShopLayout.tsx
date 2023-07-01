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
  const auth = useAppSelector((x) => x.Store.AuthReducer.Auth);

  useEffect(() => {
    if (process.env.NODE_ENV != "development") {
      //@ts-ignore
      import("react-facebook-pixel")
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.init("742516630254065");
          ReactPixel.pageView();

          Router.events.on("routeChangeComplete", () => {
            ReactPixel.pageView();
            FacebookService.pushEvent({
              data: [
                {
                  event_name: ViewContentEvent,
                  event_source_url: window.location.href,
                  user_data: grapUserData(auth),
                },
              ],
            }).then((response) => {
              ReactPixel.fbq("track", ViewContentEvent, {
                event_id: response.data.data[0].event_id,
                event_time: response.data.data[0].event_time,
                user_data: grapUserData(auth),
              });
            });
          });
        });

      import("react-ga4")
        .then((x) => x.default)
        .then((ReactGA) => {
          ReactGA.initialize("G-0JQFPNSRS1");
          Router.events.on("routeChangeComplete", () => {
            ReactGA._gaCommandSendPageview(location.pathname, {
              title: document.title,
              hostname: window.location.hostname,
              referrer: document.referrer,
            });
          });
        });
    }
  });

  return (
    <Fragment>
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={0}>
        <Topbar bgColor={"#1e1e1e"} />
        <Header />
      </Sticky>

      <div className="section-after-sticky overflow-x-hidden">
        <FloatingWhatsApp
          phoneNumber="+14158181185"
          accountName="Newminatis"
          allowEsc
          allowClickAway
          notification
          notificationSound
          avatar="https://newminatis.s3.eu-central-1.amazonaws.com/Logos/logo_light.png"
          statusMessage="Instance response"
          darkMode
          buttonClassName="whats-newminatis hide"
          onClick={() =>
            window.open(
              "https://api.whatsapp.com/send/?phone=14158181185&text=Hello%2C+i+have+a+question+regarding+my+order.&type=phone_number&app_absent=0",
              "_blank"
            )
          }
          chatboxStyle={{
            display: "none",
          }}
        />
        {cartItems > 0 && <CartSticky />}
        {children}
      </div>

      <div data-aos="fade">
        <Footer />
      </div>
    </Fragment>
  );
};

export default ShopLayout;
