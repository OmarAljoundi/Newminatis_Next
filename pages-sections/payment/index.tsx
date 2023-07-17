"use client";
import { FC, useEffect, useState } from "react";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import useStripePayment from "@/hooks/useStripePayment";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { TUserGuest } from "@/types/TUserGuest";
import { useRouter } from "next/navigation";
import useOrderService from "@/hooks/useOrderService";
import useUserService from "@/hooks/useUserService";
import { TShoppingSession } from "@/types/TCheckoutSessionRequest";
import {
  calcualteQty,
  calculateCart,
  getTotalPrice,
} from "@/helpers/Extensions";
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
import CheckoutSummary, { CheckoutSummaryProps } from "./CheckoutSummary";

const PaymentClientPage: FC = () => {
  const [loading, setLoading] = useState(false);
  const { onCreateSession, paymentLoad } = useStripePayment();
  const { data: authedSession, status } = useSession();
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
      subTotal: getTotalPrice(cart!),
      total: 0,
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
        session.countryCode =
          authedSession!.user.userAddress[authedSession!.user.selectedAddress]
            .country || null;
        session.weight = calcualteQty(cart || []) * 0.5;
        session.shippingCost = 0;
        break;
      case "GUEST":
        session.userId = _userGuest.id;
        session.countryCode = _userGuest?.country || null;
        session.weight = calcualteQty(cart || []) * 0.5;
        session.shippingCost = 0;
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
      ShippingCost: result.shoppingSession.shippingCost,
      TaxCost: result.shoppingSession.taxAmount,
      DutyCost: result.shoppingSession.dutyAmount,
      TaxRate: result.shoppingSession.taxRate,
      TotalDiscount: result.shoppingSession.totalDiscount,
      currentDateTime: result.shoppingSession.currentDateTime,
      edd: result.shoppingSession.edd,
      countryCode: result.shoppingSession.countryCode,
    });
  };

  useEffect(() => {
    setLoading(true);
    if (status !== "loading") {
      Promise.all([onLoadSession(), getClientSecret()]).then((r) => {
        setLoading(false);
      });
    }
  }, [cart, checkoutSummary?.Total, status]);

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
    if (calculateCart(cart!) == 0) {
      route.push("/cart");
      return;
    }
    dispatch(updateCart(cart!));
  }, [cart]);

  return (
    <div>
      {loading && <CreditCardSkeleton />}

      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-2 ">
          <div>
            <CheckoutSummary
              guestAddress={guestAddress}
              setCheckoutSummary={setCheckoutSummary}
              {...checkoutSummary}
            />
          </div>
          <div className="col-span-1 lg:col-span-2">
            {clientSecret && (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret: clientSecret,
                }}
              >
                <ExpressCheckoutWithEmail
                  clientSecret={clientSecret}
                  guestUser={guestAddress}
                  checkoutSummary={checkoutSummary}
                />
                <PaymentForm
                  totalAfterDiscount={checkoutSummary?.Total}
                  guestUser={guestAddress}
                />
              </Elements>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentClientPage;
