"use client";
import { BlurImage } from "@/components/BlurImage";
import { Tiny } from "@/components/Typography";
import { ExpressCheckoutNoEmail } from "@/components/stripe/ExpressCheckoutNoEmail";
import { stripePromise } from "@/components/stripe/StripeScript";
import {
  calcualteQty,
  getTotalPrice,
  getTotalPriceAfterTax,
  priceAfterTax,
} from "@/helpers/Extensions";
import {
  getShippingMessage,
  isEligableForFreeShipping,
} from "@/helpers/Summery";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { currency } from "@/lib";
import { RemoveItem } from "@/store/CartItem/Cart-action";
import { CartItem } from "@/store/Model/CartItem";
import { Delete } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { Elements } from "@stripe/react-stripe-js";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import AddressInfo from "../payment/AddressInfo";
import CheckVoucherIcon from "@/components/CheckVoucherIcon";
import { LoadingButton } from "@mui/lab";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AuthForm from "./AuthForm";
import GuestForm from "./GuestForm";
import { useSession } from "next-auth/react";
import PaymentClientPage from "../payment";
import { CheckoutSummaryProps } from "../payment/CheckoutSummary";
import Cookies from "js-cookie";
import { TShoppingSession } from "@/types/TCheckoutSessionRequest";
import { TUserGuest } from "@/types/TUserGuest";
import useUserService from "@/hooks/useUserService";
import { IUserResponse } from "@/interface/IUserResponse";
import useOrderService from "@/hooks/useOrderService";
import { IShoppingSessionResponse } from "@/interface/IShoppingSessionResponse";
import useWindowSize from "@/hooks/useWindowSize";
import { useRouter } from "next/navigation";

const CheckoutPage2 = () => {
  const [stripeObject, setStripeObject] = useState<any>(null);
  const [onSuccess, setOnSuccess] = useState<boolean>(false);
  const [onError, setOnError] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [_Voucher, setVoucher] = useState<string>("");
  const [ErrorMessage, setErrorMessage] = useState<string>("");
  const [checkoutSummary, setCheckoutSummary] =
    useState<CheckoutSummaryProps | null>(null);
  const [guestUser, setGuestUser] = useState<TUserGuest | null>(null);
  const [accordingValue, setAccordingValue] = useState("Shipping Information");
  const ref = useRef<HTMLDivElement | null>(null);
  const route = useRouter();
  useEffect(() => {
    const fetchStripeObject = async () => {
      const res = await stripePromise();
      // When we have got the Stripe object, pass it into our useState.
      setStripeObject(res);
    };
    fetchStripeObject();
  }, []);

  const state = useAppSelector((state) => state.Store.CartReducer?.CartItems);
  const _setting = useAppSelector((x) => x.Store.SettingReducer.setting);

  const { data: authedSession, status } = useSession();
  const dispatch = useAppDispatch();

  const { onGetGuest, userLoad } = useUserService();
  const { CreateCheckoutSession, orderLoad } = useOrderService();

  const window = useWindowSize();

  //Start Checkout Summary Handlers
  const handleCartAmountChange = (item: CartItem) => {
    dispatch(RemoveItem(item));
    toast.success(`Item ${item.name} removed from cart`);
  };
  const getShippingLabel = () => {
    if (isEligableForFreeShipping(state)) {
      return "Free Shipping!";
    } else if (checkoutSummary?.ShippingCost)
      return currency(checkoutSummary.ShippingCost!, _setting);

    return "Calculate at payment";
  };
  const handleVoucherChange = (e) => {
    setOnSuccess(false);
    setVoucher(e);

    if (e == checkoutSummary?.Voucher) {
      setOnError(false);
      setShow(true);
    }
  };
  //End Checkout Summary Handlers

  //Start Shipping info and payment
  const CreateSessionObject = async (): Promise<TShoppingSession | null> => {
    const Session = Cookies.get("Session");
    let session: TShoppingSession = {
      id: Session ? (Session as unknown as number) : 0,
      checkedout: false,
      createdDate: null,
      discount: 0.0,
      expired: new Date(),
      subTotal: getTotalPrice(state),
      total: 0,
      voucher: _Voucher,
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
            ?.country || null;
        session.weight = calcualteQty(state || []);
        session.shippingCost = 0;
        break;
      case "GUEST":
        //@ts-ignore
        session.userId = _userGuest.id;
        session.countryCode = _userGuest?.country || null;
        session.weight = calcualteQty(state || []) * 0.5;
        session.shippingCost = 0;
        break;
    }

    return session.userId ? session : null;
  };
  const createSession = async (forceMountPayment: boolean = true) => {
    var _session = await CreateSessionObject();
    if (_session) {
      const result = (await CreateCheckoutSession(
        _session
      )) as IShoppingSessionResponse;
      if (result.success) {
        Cookies.set("Session", result.shoppingSession.id.toString());
        setCheckoutSummary({
          Total: result.shoppingSession.total,
          Type: result.shoppingSession.voucherType || "",
          Voucher: result.shoppingSession.voucher || "",
          ShippingCost: result.shoppingSession.shippingCost,
          DutyCost: result.shoppingSession.dutyAmount,
          TaxCost: result.shoppingSession.taxAmount,
          TaxRate: result.shoppingSession.taxRate,
        });

        if (isPaymentFormEnable() || forceMountPayment) {
          setAccordingValue("Payment Info");
          if (window <= 1023)
            ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };
  useEffect(() => {
    if (state?.length == 0) {
      route.replace("/cart");
    }
    if (status == "loading") return;

    createSession(false);
  }, [state, status]);
  const handleVoucherApplied = async () => {
    var _session = await CreateSessionObject();
    if (_session) {
      const result = (await CreateCheckoutSession(
        _session
      )) as IShoppingSessionResponse;
      if (result.success) {
        Cookies.set("Session", result.shoppingSession.id.toString());
        setCheckoutSummary({
          TotalDiscount: result.shoppingSession.totalDiscount,
          Total: result.shoppingSession.total,
          Voucher: result.shoppingSession.voucher || "",
          Type: result.shoppingSession.voucherType || "",
          ShippingCost: result.shoppingSession.shippingCost,
          DutyCost: result.shoppingSession.dutyAmount,
          TaxCost: result.shoppingSession.taxAmount,
          TaxRate: result.shoppingSession.taxRate,
        });
        setOnSuccess(true);
        setOnError(false);
        setShow(true);
      } else {
        setErrorMessage(result.message);
        setOnError(true);
        setShow(true);
      }
    }
  };
  //End Shipping info and payment

  //Start Helpers

  const isPaymentFormEnable = (): boolean => {
    if (
      authedSession?.user?.userAddress &&
      authedSession?.user?.userAddress.length > 0
    ) {
      return true;
    }

    if (guestUser) {
      return true;
    }
    return false;
  };

  //End Helpers

  return (
    <>
      <Elements stripe={stripeObject}>
        <ExpressCheckoutNoEmail />
      </Elements>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-2 items-start">
        <div className="shadow-xl bg-white p-4">
          <div>
            <div className="border-b-2 pb-3 border-gray-400 grid gap-y-3">
              {state?.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4 gap-4 items-center rounded-lg"
                >
                  <div className="grid">
                    <Link
                      href={`/product/${item.name.toLowerCase()}-${item.color.toString()}`}
                    >
                      <BlurImage
                        image={item.imgUrl || ""}
                        width={75}
                        height={80}
                        customAspect=" rounded-lg"
                        q={100}
                        loading="eager"
                        priority="high"
                      />
                    </Link>
                  </div>
                  <div className="grid col-span-2 gap-y-1">
                    <span className="text-xs font-medium">{item.name}</span>
                    <span className="text-xs font-medium">
                      {" "}
                      Size: {item.size}
                    </span>
                    <span className="text-xs font-medium">
                      {" "}
                      Quantity: {item.qty}
                    </span>
                    <span className="text-xs font-medium">
                      Price:{" "}
                      {priceAfterTax(
                        item.price,
                        _setting,
                        checkoutSummary?.TaxRate || 0,
                        item.salePrice,
                        item.qty
                      )}
                      {!!item.salePrice && (
                        <Tiny
                          sx={{ ml: 0.4, mb: 0.5, fontSize: "9px" }}
                          color="#D3C4AB"
                        >
                          <del>
                            {currency(
                              item.price *
                                ((checkoutSummary?.TaxRate || 0) / 100 + 1),
                              _setting
                            )}
                          </del>
                        </Tiny>
                      )}{" "}
                      <span className="text-[8px] font-bold text-green-600">
                        {checkoutSummary?.TaxRate && "(VAT Inclusive)"}
                      </span>
                    </span>
                  </div>

                  <div>
                    <Tooltip title="Remove Item">
                      <IconButton
                        size="small"
                        sx={{ marginLeft: 2.5 }}
                        onClick={() => handleCartAmountChange(item)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              ))}
              {getShippingMessage(state, _setting)}
            </div>
          </div>

          <div className="py-3 grid grid-cols-2">
            <div className="grid gap-y-1">
              <span className="text-xs font-medium uppercase">SubTotal</span>
              {!!checkoutSummary?.TotalDiscount && (
                <span className="text-xs font-medium text-red-500 uppercase">
                  Discount
                </span>
              )}
              {!!checkoutSummary?.TotalDiscount && (
                <span className="text-xs font-medium text-red-500 uppercase">
                  Voucher Applied
                </span>
              )}
              <span className="text-xs font-medium uppercase">
                Shipping & handling
              </span>
              {!!checkoutSummary?.DutyCost && (
                <span className="text-xs font-medium uppercase">
                  Custom Duties
                </span>
              )}
            </div>
            <div className="grid justify-items-end gap-y-1">
              <span className="text-xs font-medium uppercase">
                {currency(
                  getTotalPriceAfterTax(state, checkoutSummary?.TaxRate || 0),
                  _setting
                )}
              </span>
              {!!checkoutSummary?.TotalDiscount && (
                <span className="text-xs font-medium text-red-500 uppercase">
                  -{currency(checkoutSummary.TotalDiscount, _setting)}
                </span>
              )}
              {!!checkoutSummary?.TotalDiscount && (
                <span className="text-xs font-medium text-red-500 uppercase">
                  {" "}
                  {checkoutSummary?.Voucher}
                </span>
              )}
              <span className="text-xs font-medium uppercase">
                {getShippingLabel()}
              </span>
              {!!checkoutSummary?.DutyCost && (
                <span className="text-xs font-medium uppercase">
                  {currency(checkoutSummary.DutyCost!, _setting)}
                </span>
              )}
            </div>
          </div>

          {checkoutSummary?.Total && (
            <div className="py-3 grid grid-cols-2 border-t-2 border-gray-400">
              <div className="grid gap-y-1">
                <span className="text-lg font-bold uppercase">Total</span>
              </div>
              <div className="grid justify-items-end gap-y-1">
                <span className="text-lg font-bold">
                  {currency(checkoutSummary.Total!, _setting)}
                </span>
              </div>
            </div>
          )}

          <AddressInfo guestAddress={guestUser ?? undefined} />

          {checkoutSummary?.Total && (
            <div
              className="grid grid-cols-3  pt-3 gap-x-2 items-start"
              ref={ref}
            >
              <div className="col-span-2">
                <TextField
                  placeholder="VOUCHER"
                  variant="outlined"
                  size="small"
                  value={_Voucher}
                  defaultValue={checkoutSummary?.Voucher}
                  fullWidth
                  onChange={(e) => handleVoucherChange(e.target.value)}
                  error={ErrorMessage != ""}
                  helperText={ErrorMessage ?? ""}
                  onBlur={() => {
                    setErrorMessage("");
                    setOnError(false);
                  }}
                  InputProps={{
                    endAdornment: (
                      <CheckVoucherIcon
                        show={show}
                        onError={onError}
                        onSuccess={onSuccess}
                      />
                    ),
                  }}
                />
              </div>

              <LoadingButton
                loading={orderLoad}
                onClick={handleVoucherApplied}
                type="submit"
                sx={{ py: "9px" }}
                disabled={_Voucher == ""}
                fullWidth
                color="primary"
                variant="contained"
              >
                <span className="text-xs font-medium">Apply</span>
              </LoadingButton>
            </div>
          )}
        </div>
        <div className="col-span-1 lg:col-span-2">
          <Accordion
            value={accordingValue}
            onValueChange={setAccordingValue}
            type="single"
            defaultValue="Shipping Information"
            className="w-full bg-white border-b border-gray-400
                  px-4  shadow-lg text-left text-sm font-medium  
                  focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 disabled:opacity-30"
          >
            <AccordionItem
              value="Shipping Information"
              onClick={() =>
                window <= 1023
                  ? ref.current?.scrollIntoView({ behavior: "smooth" })
                  : {}
              }
            >
              <AccordionTrigger> Shipping Information</AccordionTrigger>
              <AccordionContent>
                {authedSession?.user ? (
                  <AuthForm createSession={createSession} />
                ) : (
                  <GuestForm createSession={createSession} />
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="Payment Info"
              onClick={() =>
                window <= 1023
                  ? ref.current?.scrollIntoView({ behavior: "smooth" })
                  : {}
              }
            >
              <AccordionTrigger> Payment Info</AccordionTrigger>
              <AccordionContent className="px-2">
                <PaymentClientPage />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage2;
