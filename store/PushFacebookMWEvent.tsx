import {
  AddToCartEvent,
  AddToWishlistEvent,
  FacebookEventModel,
  grapUserData,
} from "@/helpers/FacebookEvent";
import FacebookService from "@/service/FacebookService";
import { getSession } from "next-auth/react";

const PushFacebookMWEvent =
  (store: any) => (next: any) => async (action: any) => {
    if (action.type == "Cart/addItem" || action.type == "Wishlist/addItem") {
      const authedSession = await getSession();
      var result: FacebookEventModel = {
        data: [
          {
            event_name: "",
            event_source_url: window.location.href,
            custom_data: {
              value: action.payload.price,
              currency: "USD",
              content_category: "product",
              contents: [
                {
                  id: action.payload.sku,
                  quantity: 1,
                  item_price: action.payload.price,
                },
              ],
            },
            user_data: grapUserData(
              authedSession?.user.userAddress[
                authedSession?.user.selectedAddress
              ],
              undefined,
              authedSession?.user.email
            ),
          },
        ],
      };

      switch (action.type) {
        case "Wishlist/addItem":
          result.data[0].event_name = AddToWishlistEvent;
          break;
        case "Cart/addItem":
          result.data[0].event_name = AddToCartEvent;
          break;
      }
      try {
        if (process.env.NEXT_PUBLIC_ENABLE_PIXELS === "true") {
          FacebookService.pushEvent(result).then((response) => {
            import("react-facebook-pixel")
              .then((x) => x.default)
              .then((ReactPixel) => {
                ReactPixel.fbq("track", result.data[0].event_name, {
                  contents: [
                    {
                      id: action.payload.sku,
                      quantity: 1,
                      item_price: action.payload.price,
                    },
                  ],
                  content_type: "product",
                  value: action.payload.price,
                  currency: "USD",
                  event_id: response.data.data[0].event_id,
                  event_time: response.data.data[0].event_time,
                });
              });
          });
        }
      } catch (ex) {
        console.log(ex);
      } finally {
        return next(action);
      }
    }
    return next(action);
  };

export default PushFacebookMWEvent;
