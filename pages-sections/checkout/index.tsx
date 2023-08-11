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

import { updateCart } from "@/store/CartItem/ThunkAPI";
import { TShoppingSession } from "@/types/TCheckoutSessionRequest";
import { TUserGuest } from "@/types/TUserGuest";

import { Elements } from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback, useRef } from "react";
import AuthForm from "./AuthForm";
import GuestForm from "./GuestForm";
import { stripePromise } from "@/components/stripe/StripeScript";
import { useSession } from "next-auth/react";
import AddressFormSkeleton from "./AddressFormSkeleton";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PaymentClientPage from "../payment";
import CheckoutSummary, {
  CheckoutSummaryProps,
} from "../payment/CheckoutSummary";
export default function CheckoutClientPage() {
  const pathname = usePathname();
  const [guestUser, setGuestUser] = useState<TUserGuest | null>(null);
  const cart = useAppSelector((x) => x.Store.CartReducer?.CartItems);
  const route = useRouter();
  const dispatch = useAppDispatch();
  const { data: authedSession, status } = useSession();
  const [stripeObject, setStripeObject] = useState<any>(null);
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
      subTotal: getTotalPrice(cart),
      total: 0,
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
        setGuestUser(response.guest);
      } else {
        userType = "None";
      }
    }

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
        session.weight = calcualteQty(cart || []) * 0.5;
        session.shippingCost = 0;
        break;
      case "None":
        if (pathname!.includes("payment")) route.push("/checkout");
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
        Total: result.shoppingSession.total,
        Type: result.shoppingSession.voucherType || "",
        Voucher: result.shoppingSession.voucher || "",
        ShippingCost: result.shoppingSession.shippingCost,
        DutyCost: result.shoppingSession.dutyAmount,
        TaxCost: result.shoppingSession.taxAmount,
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

  useEffect(() => {
    const fetchStripeObject = async () => {
      const res = await stripePromise();
      // When we have got the Stripe object, pass it into our useState.
      setStripeObject(res);
    };
    fetchStripeObject();
  }, []);

  return (
    <div>
      {
        <Elements stripe={stripeObject}>
          <ExpressCheckoutNoEmail />
        </Elements>
      }
      {userLoad == false && orderLoad == false ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-2">
          <div>
            <CheckoutSummary
              guestAddress={guestUser ?? undefined}
              setCheckoutSummary={setCheckoutSummary}
              {...checkoutSummary}
            />
          </div>
          <div className="col-span-1 lg:col-span-2">
            <Accordion
              type="single"
              defaultValue="Shipping Information"
              className="w-full bg-white border-b border-gray-400
                  px-4  shadow-lg text-left text-sm font-medium  
                  focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 disabled:opacity-30"
            >
              <AccordionItem value="Shipping Information">
                <AccordionTrigger> Shipping Information</AccordionTrigger>
                <AccordionContent></AccordionContent>
              </AccordionItem>
              <AccordionItem value="Payment Info" disabled={guestUser == null}>
                <AccordionTrigger> Payment Info</AccordionTrigger>
                <AccordionContent>
                  <PaymentClientPage />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      ) : (
        <CreditCardSkeleton />
      )}
    </div>
  );
}
