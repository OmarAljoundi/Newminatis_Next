"use client";
import { ViewContentEvent, grapUserData } from "@/helpers/FacebookEvent";
import FacebookService from "@/service/FacebookService";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Router } from "next/router";
import React, { useEffect } from "react";

export default function ProviderRouteChange() {
  const pathname = usePathname();
  const { data: authedSession } = useSession();
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENABLE_PIXELS === "true") {
      import("react-facebook-pixel")
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.init("742516630254065");
          ReactPixel.pageView();
          ReactPixel.pageView();
          FacebookService.pushEvent({
            data: [
              {
                event_name: ViewContentEvent,
                event_source_url: window.location.href,
                user_data: grapUserData(
                  authedSession?.user.userAddress[
                    authedSession.user.selectedAddress
                  ],
                  undefined,
                  authedSession?.user.email
                ),
              },
            ],
          }).then((response) => {
            ReactPixel.fbq("track", ViewContentEvent, {
              event_id: response.data.data[0].event_id,
              event_time: response.data.data[0].event_time,
              user_data: grapUserData(
                authedSession?.user.userAddress[
                  authedSession.user.selectedAddress
                ],
                undefined,
                authedSession?.user.email
              ),
            });
          });
        });
      import("react-ga4")
        .then((x) => x.default)
        .then((ReactGA) => {
          ReactGA.initialize("G-0JQFPNSRS1");
          ReactGA._gaCommandSendPageview(location.pathname, {
            title: document.title,
            hostname: window.location.hostname,
            referrer: document.referrer,
          });
        });
    }
  }, [pathname]);

  return <></>;
}
