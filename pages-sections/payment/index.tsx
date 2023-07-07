"use client";
import { Box, Checkbox, Grid, StepContext } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import useStripePayment from "@/hooks/useStripePayment";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { TUserGuest } from "@/types/TUserGuest";
import { useRouter } from "next/navigation";
import CheckoutSummary, {
  CheckoutSummaryProps,
} from "../checkout/CheckoutSummary";
import useOrderService from "@/hooks/useOrderService";
import useUserService from "@/hooks/useUserService";
import { TShoppingSession } from "@/types/TCheckoutSessionRequest";
import { calculateCart, getTotalPrice } from "@/helpers/Extensions";
import { IUserResponse } from "@/interface/IUserResponse";
import { IShoppingSessionResponse } from "@/interface/IShoppingSessionResponse";
import { TCheckoutRequest } from "@/types/TCheckoutRequest";
import { IPaymentResponse } from "@/interface/IPaymentResponse";
import { updateCart } from "@/store/CartItem/ThunkAPI";
import { ExpressCheckoutWithEmail } from "@/components/stripe/ExpressCheckoutWithEmail";
import { stripePromise } from "@/components/stripe/StripeScript";
import { CreditCardSkeleton } from "@/components/loading/CreditCardSkeleton";
import PaymentForm from "./PaymentForm";
import { useSession } from "next-auth/react";

const PaymentClientPage: FC = () => {
  const { onCreateSession, paymentLoad } = useStripePayment();
  const { data: authedSession } = useSession();
  const [guestAddress, setGuestAddress] = useState<TUserGuest>();
  const cart = useAppSelector((x) => x.Store.CartReducer?.CartItems);
  const [clientSecret, setClientSecret] = useState("");
  const route = useRouter();
  const dispatch = useAppDispatch();
  const [checkoutSummary, setCheckoutSummary] =
    useState<CheckoutSummaryProps | null>(null);

  const { CreateCheckoutSession, orderLoad } = useOrderService();
  const { onGetGuest, userLoad } = useUserService();

  const onLoadSession = async () => {
    const Session = Cookies.get("Session");
    let session: TShoppingSession = {
      id: Session ? (Session as unknown as number) : 0,
      checkedout: false,
      createdDate: null,
      discount: 0.0,
      expired: new Date(),
      total: getTotalPrice(cart!),
      voucher: "",
      //@ts-ignore
      userId: null,
      voucherType: "",
    };
    //@ts-ignore
    let _userGuest: TUserGuest = null;
    var userType: "GUEST" | "Authed" | "None" = "None";
    if (authedSession?.user && authedSession.user.email) {
      userType = "Authed";
    } else if (Cookies.get("GUEST_EMAIL")) {
      var x = Cookies.get("GUEST_EMAIL");
      var response = (await onGetGuest(x!)) as IUserResponse;
      if (response.success) {
        userType = "GUEST";
        _userGuest = response.guest;
      } else {
        userType = "None";
      }
    }

    switch (userType) {
      case "Authed":
        //@ts-ignore
        session.userId = authedSession?.user.id;
        break;
      case "GUEST":
        session.userId = _userGuest.id;
        break;
      case "None":
        route.push("/checkout");
        break;
    }

    const result = (await CreateCheckoutSession(
      session
    )) as IShoppingSessionResponse;
    if (result.success) {
      Cookies.set("Session", result.shoppingSession.id.toString());
    }
    setCheckoutSummary({
      Discount: result.shoppingSession.discount,
      Total: result.shoppingSession.total,
      //@ts-ignore
      Type: result.shoppingSession.voucherType,
      //@ts-ignore
      Voucher: result.shoppingSession.voucher,
    });
  };

  const getClientSecret = async () => {
    if (checkoutSummary) {
      var checkoutSession: TCheckoutRequest = {
        //@ts-ignore
        id: null,
        amount: checkoutSummary?.Total * 100,
        //@ts-ignore
        email: null,
      };
      if (authedSession?.user && authedSession.user.email) {
        checkoutSession.email = authedSession.user.email;
        //@ts-ignore
        checkoutSession.id = authedSession.user.id;
        const result = (await onCreateSession(
          checkoutSession
        )) as IPaymentResponse;
        setClientSecret(result.clientSecret);
      } else if (Cookies.get("GUEST_EMAIL")) {
        var x = Cookies.get("GUEST_EMAIL");
        const response = (await onGetGuest(x!)) as IUserResponse;
        if (response.success) {
          setGuestAddress(response.guest);
          checkoutSession.email = response.guest.email;
          checkoutSession.id = response.guest.id;

          const result = (await onCreateSession(
            checkoutSession
          )) as IPaymentResponse;
          setClientSecret(result.clientSecret);
        } else {
          route.push("/checkout");
        }
      } else {
        route.push("/checkout");
      }
    }
  };

  useEffect(() => {
    onLoadSession();
  }, [cart]);

  useEffect(() => {
    window.scroll(0, 0);
    getClientSecret();
  }, [checkoutSummary?.Total]);

  useEffect(() => {
    if (calculateCart(cart!) == 0) {
      route.push("/cart");
      return;
    }
    dispatch(updateCart(cart!));
  }, [cart]);

  return (
    <div>
      {(orderLoad || paymentLoad) && <CreditCardSkeleton />}

      {!paymentLoad && !orderLoad && (
        <Grid container flexWrap="wrap-reverse" spacing={3}>
          <Grid item lg={8} md={8} xs={12}>
            {clientSecret && (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret: clientSecret,
                }}
              >
                <ExpressCheckoutWithEmail
                  clientSecret={clientSecret}
                  totalAfterDiscount={checkoutSummary?.Total}
                  //@ts-ignore
                  guestUser={guestAddress}
                />
                <PaymentForm
                  totalAfterDiscount={checkoutSummary?.Total}
                  guestUser={guestAddress}
                />
              </Elements>
            )}
          </Grid>

          <Grid item lg={4} md={4} xs={12}>
            <CheckoutSummary
              //@ts-ignore
              Total={checkoutSummary?.Total}
              //@ts-ignore
              Type={checkoutSummary?.Type}
              setCheckoutSummary={setCheckoutSummary}
              Discount={checkoutSummary?.Discount}
              Voucher={checkoutSummary?.Voucher}
              guestAddress={guestAddress}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default PaymentClientPage;
