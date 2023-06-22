import { Box } from "@mui/material";
import {
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import { PaymentRequestShippingAddress } from "@stripe/stripe-js";
import Cookies from "js-cookie";
import { FC, useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { AddToCart, Purchase } from "react-facebook-pixel";
import { TUserGuest } from "@/types/TUserGuest";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useRouter } from "next/navigation";
import useOrderService from "@/hooks/useOrderService";
import useUserService from "@/hooks/useUserService";
import { Items, TOrderRequest } from "@/types/TOrderRequest";
import { IBaseResponse } from "@/interface/IBaseResponse";
import { calculateCart } from "@/helpers/Extensions";
import { toast } from "react-hot-toast";
import { CartItem } from "@/store/Model/CartItem";
import { ClearCart, UpdateStock } from "@/store/CartItem/Cart-action";
import { IOrderResponse } from "@/interface/IOrderResponse";
import FacebookService from "@/service/FacebookService";
import { PurchaseEvent, grapUserData } from "@/helpers/FacebookEvent";
import { TOrderRequestGuest } from "@/types/TOrderRequestGuest";

export interface IExpressCheckout {
  clientSecret: string;
  totalAfterDiscount?: number;
  guestUser: TUserGuest;
  requestShipping?: boolean;
}
export const ExpressCheckoutWithEmail: FC<IExpressCheckout> = ({
  guestUser,
  clientSecret,
  totalAfterDiscount = 0,
  requestShipping,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const cart = useAppSelector((x) => x.Store.CartReducer?.CartItems);
  const Auth = useAppSelector((x) => x.Store.AuthReducer.Auth);
  const _setting = useAppSelector((x) => x.Store.SettingReducer.setting);
  const dispatch = useAppDispatch();
  const route = useRouter();
  const { onCreateOrder, onCheckStock, onCreateGuestOrder } = useOrderService();

  const { onCreateGuest, userLoad } = useUserService();

  const handleStockabaliablity = async (items: Items[]) => {
    const isStockAvaliable = (await onCheckStock(items)) as IBaseResponse;
    return isStockAvaliable;
  };
  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }

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

    const pr = stripe.paymentRequest({
      currency: "usd",
      country: "US",
      requestPayerEmail: true,
      requestPayerName: true,
      requestShipping: requestShipping ?? false,
      shippingOptions: [
        {
          id: "free-shipping",
          label: "Free shipping",
          detail: "",
          amount: 0,
        },
      ],

      total: {
        amount:
          totalAfterDiscount > 0
            ? Math.round(
                (totalAfterDiscount.toFixed(2) as unknown as number) * 100
              )
            : (calculateCart(cart || []).toFixed(2) as unknown as number) * 100,
        label: "Checkout Newminatis",
      },
    });
    pr.canMakePayment().then((res) => {
      if (res) {
        setPaymentRequest(pr);
      }
    });

    pr.on("shippingaddresschange", (ev) => {
      ev.updateWith({
        status: "success",
        shippingOptions: [
          {
            id: "free-shipping",
            label: "Free shipping",
            detail: "",
            amount: 0,
          },
        ],
      });
    });

    pr.on("paymentmethod", async (e) => {
      if (!Cookies.get("Session")) {
        window.location.reload();
        return;
      }

      const isStocked = await handleStockabaliablity(items);

      if (isStocked.success) {
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: e.paymentMethod.id,
          },
          {
            handleActions: false,
          }
        );
        if (error) {
          toast.error(error.message || "Something went wrong", {
            duration: 5000,
          });
          e.complete("fail");
          return;
        }

        e.complete("success");

        if (paymentIntent.status == "requires_action") {
          const { error } = await stripe.confirmCardPayment(clientSecret);
          if (error) {
            toast.error(error.message || "Something went wrong", {
              duration: 5000,
            });
            return;
          }
        }

        if (guestUser) {
          if (requestShipping && requestShipping == true) {
            handleUpdateGuestAddress(e.shippingAddress!, guestUser);
          }
          await CreateGuestOrderRequest(items);
          Cookies.remove("GUEST_EMAIL");
        } else {
          await CreateOrderRequest(items);
        }
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
            sku: isStocked?.stockErrors?.find((x) => x.sku == i.sku)?.sku ?? "",
            slug: i.slug,
            stock:
              isStocked?.stockErrors?.find((x) => x.sku == i.sku)?.quantity ??
              0,
            imgUrl: i.imgUrl,
          };

          dispatch(UpdateStock(CartItem));
        });
        e.complete("fail");
        route.push("/cart");
      }
    });
    return () => {
      setPaymentRequest(null);
    };
  }, [stripe, elements, cart, totalAfterDiscount]);

  const CreateOrderRequest = async (items: Items[]) => {
    var OrderRequest: TOrderRequest = {
      items: items,
      subTotal: calculateCart(cart!),
      sessionId: Cookies.get("Session") as unknown as number,
      total: totalAfterDiscount > 0 ? totalAfterDiscount : calculateCart(cart!),
      //@ts-ignore
      userAddressId: Auth.userAddress[Auth.selectedAddress].id,
      currency: _setting?.currencyCode ?? "USD",
      rate: _setting?.rate ?? 1,
    };
    const order_create = (await onCreateOrder(OrderRequest)) as IOrderResponse;
    if (!order_create.success) {
      toast.error(order_create.message);
    } else {
      if (process.env.NODE_ENV !== "development") {
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
        });
      });

      var _Purchase: Purchase = {
        contents: contents,
        content_type: "product",
        value: order_create.total,
        currency: "USD",
        num_items: contents.length,
        content_name: "Newminatis New Order",
      };
      if (process.env.NODE_ENV !== "development") {
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
                user_data: grapUserData(Auth, guestUser),
              },
            ],
          });
        } catch (ex) {}
      }

      dispatch(ClearCart());

      //   route("/review_order", {
      //     state: order_create,
      //   });
      route.push("/review_order");
    }
  };

  const CreateGuestOrderRequest = async (items: Items[]) => {
    var OrderRequest: TOrderRequestGuest = {
      items: items,
      subTotal: calculateCart(cart!),
      sessionId: Cookies.get("Session") as unknown as number,
      total: totalAfterDiscount > 0 ? totalAfterDiscount : calculateCart(cart!),
      guest: guestUser,
      currency: _setting?.currencyCode ?? "USD",
      rate: _setting?.rate ?? 1,
    };
    const order_create = (await onCreateGuestOrder(
      OrderRequest
    )) as IOrderResponse;
    if (!order_create.success) {
      toast.error(order_create.message);
    } else {
      if (process.env.NODE_ENV !== "development") {
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

      var _Purchase: Purchase = {
        contents: contents,
        content_type: "product",
        value: order_create.total,
        currency: "USD",
        num_items: contents.length,
        content_name: "Newminatis New Order",
      };

      if (process.env.NODE_ENV !== "development") {
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
                user_data: grapUserData(Auth, guestUser),
              },
            ],
          });
        } catch (ex) {}
      }

      dispatch(ClearCart());
      //   route("/review_order", {
      //     state: order_create,
      //   });
      route.push("/review_order");
    }
  };

  const handleUpdateGuestAddress = async (
    values: PaymentRequestShippingAddress,
    guest: TUserGuest
  ) => {
    var Guest: TUserGuest = {
      addressLine: JSON.stringify(values.addressLine),
      //@ts-ignore
      city: values.city,
      //@ts-ignore
      country: values.country,
      deliveryInstructions: "",
      firstName: guest.email,
      createdDate: null,
      email: guest.email,
      id: guest.id,
      lastName: guest.email,
      modifiedDate: null,
      //@ts-ignore
      phoneNumber: values.phone,
      postalCode: values.postalCode as unknown as number,
      //@ts-ignore
      state: values.city,
      newsletter: null,
    };
    await onCreateGuest(Guest);
  };

  return (
    <div>
      {paymentRequest && (
        <Box my={2}>
          <PaymentRequestButtonElement
            options={{
              paymentRequest: paymentRequest,
            }}
          />
        </Box>
      )}
    </div>
  );
};
