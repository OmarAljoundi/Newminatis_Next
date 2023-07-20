import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import Cookies from "js-cookie";
import LoadingButton from "@mui/lab/LoadingButton";
import ReactGA from "react-ga4";
import { Purchase } from "react-facebook-pixel";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import useOrderService from "@/hooks/useOrderService";
import { useRouter } from "next/navigation";
import { Items, TOrderRequest } from "@/types/TOrderRequest";
import { IBaseResponse } from "@/interface/IBaseResponse";
import { calculateCart } from "@/helpers/Extensions";
import { toast } from "react-hot-toast";
import { ClearCart, UpdateStock } from "@/store/CartItem/Cart-action";
import { IOrderResponse } from "@/interface/IOrderResponse";
import FacebookService from "@/service/FacebookService";
import { PurchaseEvent, grapUserData } from "@/helpers/FacebookEvent";
import { TOrderRequestGuest } from "@/types/TOrderRequestGuest";
import { Card } from "@mui/material";
import { H6 } from "@/components/Typography";
import { CartItem } from "@/store/Model/CartItem";
import { EncryptData } from "@/helpers/Crypto";
import { useSession } from "next-auth/react";
import { TUser } from "@/types/TUser";

const Text =
  "We will contribute 1% of your purchase to removing CO₂ from the atmosphere.";

export default function PaymentForm({ totalAfterDiscount, guestUser }) {
  const stripe = useStripe();
  const [email, setEmail] = useState("");
  const elements = useElements();
  const { data: authedSession } = useSession();
  const cart = useAppSelector((x) => x.Store.CartReducer?.CartItems);
  const _setting = useAppSelector((x) => x.Store.SettingReducer.setting);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { onCreateOrder, onCheckStock, onCreateGuestOrder } = useOrderService();
  const route = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!Cookies.get("Session")) {
      window.location.reload();
      return;
    }

    setIsLoading(true);

    var items: Items[] = [];
    cart?.map((i) => {
      items.push({
        productId: i.id,
        image: i.imgUrl || "",
        price: i.price,
        quantity: i.qty,
        sku: i.sku,
        productName: i.name,
      });
    });
    const isStockAvaliable = (await onCheckStock(items)) as IBaseResponse;
    if (isStockAvaliable.success) {
      if (!stripe || !elements) {
        return;
      }

      await stripe
        .confirmPayment({
          elements,
          confirmParams: {
            return_url: "http://newminatis.com/review_order",
          },
          redirect: "if_required",
        })
        .then(async (res) => {
          if (res.error) {
            toast.error(res.error.message || "Something went wrong");
            setIsLoading(false);
          } else {
            if (guestUser) {
              await CreateGuestOrderRequest(items);
              Cookies.remove("GUEST_EMAIL");
            } else {
              await CreateOrderRequest(items);
            }
          }
        });
    } else {
      const cartItems = [...cart!];
      cartItems.map((i) => {
        var CartItem: CartItem = {
          color: i.color,
          salePrice: i.salePrice,
          id: i.id,
          name: i.name,
          price: i.price,
          qty: i.qty,
          size: i.size,
          sku:
            isStockAvaliable.stockErrors.find((x) => x.sku == i.sku)?.sku ?? "",
          slug: i.slug,
          stock:
            isStockAvaliable.stockErrors.find((x) => x.sku == i.sku)
              ?.quantity ?? 0,
          imgUrl: i.imgUrl,
        };
        dispatch(UpdateStock(CartItem));
      });
      route.push("/cart");
    }
  };

  const CreateOrderRequest = async (items: Items[]) => {
    var OrderRequest: TOrderRequest = {
      items: items,
      subTotal: calculateCart(cart!),
      total: totalAfterDiscount > 0 ? totalAfterDiscount : calculateCart(cart!),
      sessionId: Cookies.get("Session") as unknown as number,
      userAddressId:
        authedSession!.user.userAddress[authedSession!.user.selectedAddress].id,
      currency: _setting?.currencyCode ?? "USD",
      rate: _setting?.rate ?? 1,
    };
    const order_create = (await onCreateOrder(OrderRequest)) as IOrderResponse;
    if (!order_create.success) {
      setIsLoading(false);
      toast.error(order_create.message);
    } else {
      if (process.env.NEXT_PUBLIC_ENABLE_PIXELS === "true") {
        ReactGA.event("purchase", {
          currency: "USD",
          transaction_id: order_create.depoterOrderId,
          value: order_create.total,
        });
      }

      var contents: any[] = [];

      cart?.map((item) => {
        contents.push({
          id: item.sku,
          quantity: item.qty,
          item_price: item.price,
        });
      });

      if (process.env.NEXT_PUBLIC_ENABLE_PIXELS === "true") {
        var _Purchase: Purchase = {
          contents: contents,
          content_type: "product",
          value: order_create.total,
          currency: "USD",
          num_items: contents.length,
          content_name: "Newminatis New Order",
        };
        import("react-facebook-pixel")
          .then((x) => x.default)
          .then((ReactPixel) => {
            ReactPixel.fbq("track", "Purchase", _Purchase);
          });

        try {
          await FacebookService.pushEvent({
            data: [
              {
                event_name: PurchaseEvent,
                event_source_url: window.location.href,
                event_id: order_create.orderId.toString(),
                custom_data: {
                  content_category: "product",
                  contents: contents,
                  currency: "USD",
                  value: order_create.total.toString(),
                },
                user_data: grapUserData(
                  authedSession?.user.userAddress[
                    authedSession.user.selectedAddress
                  ],
                  guestUser,
                  authedSession?.user.email
                ),
              },
            ],
          });
        } catch (ex) {}
      }

      const orderIdEncrypted = EncryptData<IOrderResponse>(order_create);
      Cookies.set("Order_confirmed", orderIdEncrypted);
      route.push(`/order_confirmation`);
    }
  };

  const CreateGuestOrderRequest = async (items: Items[]) => {
    var OrderRequest: TOrderRequestGuest = {
      items: items,
      subTotal: calculateCart(cart!),
      total: totalAfterDiscount > 0 ? totalAfterDiscount : calculateCart(cart!),
      sessionId: Cookies.get("Session") as unknown as number,
      guest: guestUser,
      currency: _setting?.currencyCode ?? "USD",
      rate: _setting?.rate ?? 1,
    };
    const order_create = (await onCreateGuestOrder(
      OrderRequest
    )) as IOrderResponse;
    if (!order_create.success) {
      setIsLoading(false);
      toast.error(order_create.message);
    } else {
      if (process.env.NEXT_PUBLIC_ENABLE_PIXELS === "true") {
        ReactGA.event("purchase", {
          currency: "USD",
          transaction_id: order_create.depoterOrderId,
          value: order_create.total,
        });
      }

      var contents: any[] = [];

      cart?.map((item) => {
        contents.push({
          id: item.sku,
          quantity: item.qty,
          item_price: item.price,
        });
      });

      if (process.env.NEXT_PUBLIC_ENABLE_PIXELS === "true") {
        var _Purchase: Purchase = {
          contents: contents,
          content_type: "product",
          value: order_create.total,
          currency: "USD",
          num_items: contents.length,
          content_name: "Newminatis New Order",
        };
        import("react-facebook-pixel")
          .then((x) => x.default)
          .then((ReactPixel) => {
            ReactPixel.fbq("track", "Purchase", _Purchase);
          });

        try {
          await FacebookService.pushEvent({
            data: [
              {
                event_name: PurchaseEvent,
                event_source_url: window.location.href,
                event_id: order_create.orderId.toString(),
                custom_data: {
                  content_category: "product",
                  contents: contents,
                  currency: "USD",
                  value: order_create.total.toString(),
                },
                user_data: grapUserData(null, guestUser),
              },
            ],
          });
        } catch (ex) {}
      }

      const orderIdEncrypted = EncryptData<IOrderResponse>(order_create);
      Cookies.set("Order_confirmed", orderIdEncrypted);
      route.push(`/order_confirmation`);
    }
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
    terms: {
      card: "never",
    },
  };

  return (
    <Card elevation={5} role={"drawer"}>
      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e) => setEmail(e.value.email)}
        />
        <PaymentElement
          options={paymentElementOptions}
          className="payment-form-new"
        />
        <H6 sx={{ display: "inline-block" }} my={1.5}>
          {Text}
        </H6>

        <LoadingButton
          size="small"
          type="submit"
          fullWidth
          color="primary"
          sx={{
            marginTop: "10px",
            fontSize: "18px",
            ":disabled": {
              textDecoration: "none",
              color: "rgba(0, 0, 0, 1)",
              opacity: 1,
            },
          }}
          disabled={isLoading || !stripe || !elements}
          variant="contained"
          loadingPosition="start"
          loading={isLoading}
        >
          Place Order
        </LoadingButton>
      </form>
    </Card>
  );
}
