"use client";
import { Box } from "@mui/material";
import {
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import { FC, useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { AddToCart, Purchase } from "react-facebook-pixel";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useRouter } from "next/navigation";
import useStripePayment from "@/hooks/useStripePayment";
import useOrderService from "@/hooks/useOrderService";
import useUserService from "@/hooks/useUserService";
import { IBaseResponse } from "@/interface/IBaseResponse";
import { Items } from "@/types/TOrderRequest";
import {
  calcualteQty,
  calculateCart,
  getShippingLabel,
  getShippingObject,
} from "@/helpers/Extensions";
import { TUserGuest } from "@/types/TUserGuest";
import { IUserResponse } from "@/interface/IUserResponse";
import { toast } from "react-hot-toast";
import { CartItem } from "@/store/Model/CartItem";
import { ClearCart, UpdateStock } from "@/store/CartItem/Cart-action";
import { TOrderRequestGuest } from "@/types/TOrderRequestGuest";
import { IOrderResponse } from "@/interface/IOrderResponse";
import FacebookService from "@/service/FacebookService";
import { TCheckoutRequest } from "@/types/TCheckoutRequest";
import { IPaymentResponse } from "@/interface/IPaymentResponse";
import { PurchaseEvent, grapUserData } from "@/helpers/FacebookEvent";
import { EncryptData } from "@/helpers/Crypto";
import Cookies from "js-cookie";
import SettingService from "@/service/SettingService";
import { TShoppingSession } from "@/types/TCheckoutSessionRequest";
import { IShoppingSessionResponse } from "@/interface/IShoppingSessionResponse";

export const ExpressCheckoutNoEmail = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState<any | null>(null);
  const cart = useAppSelector((x) => x.Store.CartReducer?.CartItems);
  const _setting = useAppSelector((x) => x.Store.SettingReducer.setting);
  const dispatch = useAppDispatch();
  const route = useRouter();
  const { onCreateSession } = useStripePayment();
  const { onCheckStock, onCreateGuestOrder, CreateCheckoutSession } =
    useOrderService();

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
      requestPayerPhone: true,
      requestShipping: true,
      shippingOptions: [],
      displayItems: [
        {
          label: "Subtotal",
          amount:
            (calculateCart(cart || []).toFixed(2) as unknown as number) * 100,
          pending: false,
        },
        {
          label: "Express Delivery",
          amount: 0,
          pending: true,
        },
      ],

      total: {
        amount:
          (calculateCart(cart || []).toFixed(2) as unknown as number) * 100,
        label: "Checkout Newminatis",
        pending: true,
      },
    });

    pr.canMakePayment().then((res) => {
      if (res) {
        setPaymentRequest(pr);
      }
    });

    pr.on("shippingaddresschange", async (ev) => {
      if (ev.shippingAddress.country) {
        const { data } = await SettingService.getShippingAndTax(
          ev.shippingAddress.country,
          calcualteQty(cart || []) * 0.5,
          calculateCart(cart || [])
        );

        if (data?.success) {
          var delievryOption = getShippingObject(
            data.shippingCost,
            data.currentDate,
            data.delievryDate,
            ev.shippingAddress.country || ""
          );
          ev.updateWith({
            status: "success",
            displayItems: [
              {
                label: "Subtotal (VAT Inclusive)",
                amount:
                  ((
                    calculateCart(cart || []) *
                    (data.vatRate / 100 + 1)
                  ).toFixed(0) as unknown as number) * 100,
                pending: false,
              },
              {
                label: getShippingLabel(
                  data.shippingCost,
                  data.currentDate,
                  data.delievryDate,
                  ev.shippingAddress.country || ""
                ),
                amount:
                  (data.shippingCost.toFixed(0) as unknown as number) * 100,
                pending: false,
              },
              {
                label: "Estimated DUTY",
                amount: (data.dutyAmount.toFixed(0) as unknown as number) * 100,
                pending: false,
              },
            ],
            total: {
              amount:
                (data.totalAfterAdditonal.toFixed(0) as unknown as number) *
                100,
              label: "Newminatis Checkout",
              pending: false,
            },
            shippingOptions: [delievryOption],
          });
        }
      }
    });

    pr.on("paymentmethod", async (e) => {
      var isStocked = await handleStockabaliablity(items);
      if (!isStocked.success) {
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
              isStocked?.stockErrors.find((x) => x.sku == i.sku)?.quantity ?? 0,
            imgUrl: i.imgUrl,
          };

          dispatch(UpdateStock(CartItem));
        });
        e.complete("fail");
        route.push("/cart");
        return;
      }

      var newGuestUser: TUserGuest = {
        id: 0,
        firstName: e.payerName || "",
        lastName: e.payerName || "",
        deliveryInstructions: "",
        addressLine: JSON.stringify(e.shippingAddress?.addressLine),
        city: e.shippingAddress?.city || "",
        country: e.shippingAddress?.country || "",
        email: e.payerEmail || "",
        phoneNumber: e.payerPhone || "",
        postalCode: e.shippingAddress?.postalCode as any,
        state: e.shippingAddress?.city || "",
        newsletter: false,
        createdDate: null,
        modifiedDate: null,
      };
      const { guest, message } = (await onCreateGuest(
        newGuestUser
      )) as IUserResponse;

      const Session = Cookies.get("Session");
      let session: TShoppingSession = {
        id: Session ? (Session as unknown as number) : 0,
        checkedout: false,
        createdDate: null,
        discount: 0.0,
        expired: new Date(),
        subTotal: calculateCart(cart || []),
        total: 0,
        voucher: "",
        userId: guest.id,
        voucherType: "",
        countryCode: e.shippingAddress?.country ?? "",
        weight: calcualteQty(cart || []) * 0.5,
      };
      const sessionResult = (await CreateCheckoutSession(
        session
      )) as IShoppingSessionResponse;
      if (sessionResult.success) {
        Cookies.set("Session", sessionResult.shoppingSession.id.toString());
      }

      const clientSecret = await getClientSecretGuest(
        e.payerEmail || "",
        (sessionResult.shoppingSession.total.toFixed(0) as unknown as number) *
          100,
        guest?.id
      );
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
        await CreateGuestOrderRequest(
          items,
          guest,
          sessionResult.shoppingSession.id
        );
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
              isStocked?.stockErrors.find((x) => x.sku == i.sku)?.quantity ?? 0,
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
  }, [stripe, elements, cart]);

  const CreateGuestOrderRequest = async (
    items: Items[],
    __guestUser: TUserGuest,
    shoppingSessionId: number
  ) => {
    var OrderRequest: TOrderRequestGuest = {
      items: items,
      subTotal: calculateCart(cart || []),
      sessionId: shoppingSessionId,
      total: calculateCart(cart || []),
      guest: __guestUser,
      currency: _setting?.currencyCode || "USD",
      rate: _setting?.rate || 1,
    };
    const order_create = (await onCreateGuestOrder(
      OrderRequest
    )) as IOrderResponse;
    if (!order_create.success) {
      toast.error(order_create.message, {
        duration: 5000,
      });
    } else {
      if (process.env.NODE_ENV === "production") {
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

      if (process.env.NODE_ENV === "production") {
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
                user_data: grapUserData(null, __guestUser),
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
  const getClientSecretGuest = async (
    email: string,
    amount: any,
    id: number
  ) => {
    var checkoutSession: TCheckoutRequest = {
      id: id,
      amount: amount,
      email: email,
    };

    const result = (await onCreateSession(checkoutSession)) as IPaymentResponse;

    return result.clientSecret;
  };

  return (
    <>
      {paymentRequest && (
        <Box my={2}>
          <PaymentRequestButtonElement
            options={{
              paymentRequest: paymentRequest,
            }}
          />
        </Box>
      )}
    </>
  );
};
