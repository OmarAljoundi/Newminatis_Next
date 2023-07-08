"use client";
import { CreditCardSkeleton } from "@/components/loading/CreditCardSkeleton";
import { ExpressCheckoutNoEmail } from "@/components/stripe/ExpressCheckoutNoEmail";
import {
  calcualteQty,
  calculateCart,
  getTotalPrice,
} from "@/helpers/Extensions";
import useOrderService from "@/hooks/useOrderService";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import useStripePayment from "@/hooks/useStripePayment";
import useUserService from "@/hooks/useUserService";
import { IShoppingSessionResponse } from "@/interface/IShoppingSessionResponse";
import { IUserResponse } from "@/interface/IUserResponse";
import CheckoutSummary, {
  CheckoutSummaryProps,
} from "@/pages-sections/checkout/CheckoutSummary";
import { updateCart } from "@/store/CartItem/ThunkAPI";
import { TShoppingSession } from "@/types/TCheckoutSessionRequest";
import { TUserGuest } from "@/types/TUserGuest";
import { Card, Grid, Skeleton, TextField, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import AuthForm from "./AuthForm";
import GuestForm from "./GuestForm";
import { stripePromise } from "@/components/stripe/StripeScript";
import { useSession } from "next-auth/react";
import { FlexBox } from "@/components/flex-box";
import AddressFormSkeleton from "./AddressFormSkeleton";

export default function CheckoutClientPage() {
  const pathname = usePathname();
  const cart = useAppSelector((x) => x.Store.CartReducer?.CartItems);
  const route = useRouter();
  const dispatch = useAppDispatch();
  const { data: authedSession, status } = useSession();
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
      total: getTotalPrice(cart),
      voucher: "",
      //@ts-ignore
      userId: null,
      voucherType: "",
    };
    let _userGuest: TUserGuest | null = null;
    var userType: "GUEST" | "Authed" | "None" = "None";
    if (authedSession && authedSession?.user?.email) {
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
    console.log("authedSession", authedSession);

    switch (userType) {
      case "Authed":
        session.userId = authedSession?.user?.id || 0;
        session.countryCode =
          authedSession!.user.userAddress[authedSession!.user.selectedAddress]
            .country || null;
        session.weight = calcualteQty(cart || []);
        session.shippingCost = 0;
        break;
      case "GUEST":
        //@ts-ignore
        session.userId = _userGuest.id;
        session.countryCode = _userGuest?.country || null;
        session.weight = calcualteQty(cart || []);
        session.shippingCost = 0;
        break;
      case "None":
        if (pathname!.includes("payment")) route.push("cart/checkout");
        break;
    }

    if (userType != "None") {
      const result = (await CreateCheckoutSession(
        session
      )) as IShoppingSessionResponse;
      if (result.success) {
        Cookies.set("Session", result.shoppingSession.id.toString());
      }
      setCheckoutSummary({
        Discount: result.shoppingSession.discount,
        Total: result.shoppingSession.total,
        Type: result.shoppingSession.voucherType || "",
        Voucher: result.shoppingSession.voucher || "",
        ShippingCost: result.shoppingSession.shippingCost,
      });
    }
  };

  useEffect(() => {
    onLoadSession();
  }, [cart]);

  useEffect(() => {
    window.scroll(0, 0);
  }, [checkoutSummary?.Total]);

  useEffect(() => {
    if (calculateCart(cart || []) == 0) {
      route.push("/cart");
      return;
    }
    dispatch(updateCart(cart || []));
  }, [cart]);

  return (
    <div>
      {userLoad == false && orderLoad == false ? (
        <Grid container flexWrap="wrap-reverse" spacing={3}>
          <Grid item md={8} xs={12}>
            <Elements stripe={stripePromise}>
              <ExpressCheckoutNoEmail />
            </Elements>

            {status == "loading" && <AddressFormSkeleton />}

            {status == "authenticated" ? (
              <AuthForm />
            ) : status == "unauthenticated" ? (
              <GuestForm />
            ) : null}
          </Grid>

          <Grid item lg={4} md={4} xs={12}>
            <CheckoutSummary
              Total={checkoutSummary?.Total || 0}
              Type={checkoutSummary?.Type || ""}
              Discount={checkoutSummary?.Discount}
              Voucher={checkoutSummary?.Voucher}
              setCheckoutSummary={setCheckoutSummary}
            />
          </Grid>
        </Grid>
      ) : (
        <CreditCardSkeleton />
      )}
    </div>
  );
}
