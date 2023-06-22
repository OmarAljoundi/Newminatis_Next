"use client";
import {
  AddToCartEvent,
  AddToWishlistEvent,
  FacebookEventModel,
  grapUserData,
} from "@/helpers/FacebookEvent";
import FacebookService from "@/service/FacebookService";
import { TUser } from "@/types/TUser";

const PushFacebookMWEvent = (store: any) => (next: any) => (action: any) => {
  if (action.type == "Cart/addItem" || action.type == "Wishlist/addItem") {
    var Auth = store.getState().Store.AuthReducer?.Auth as TUser;

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
          user_data: grapUserData(Auth),
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
      FacebookService.pushEvent(result).then((response) => {
        if (process.env.NODE_ENV !== "development") {
          //@ts-ignore
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
        }
      });
    } catch (ex) {
      console.log(ex);
    } finally {
      return next(action);
    }
  }
  return next(action);
};

export default PushFacebookMWEvent;
