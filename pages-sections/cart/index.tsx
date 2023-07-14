"use client";
import CartCard from "@/components/product-card/CartCard";
import { getShippingLabel, getTotalPrice } from "@/helpers/Extensions";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { currency } from "@/lib";
import { updateCart } from "@/store/CartItem/ThunkAPI";
import { Grid, Card, Typography, Box, Divider, Button } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState, Fragment } from "react";
import EDD from "./EDD";
import { Elements } from "@stripe/react-stripe-js";
import { ExpressCheckoutNoEmail } from "@/components/stripe/ExpressCheckoutNoEmail";
import { stripePromise } from "@/components/stripe/StripeScript";
import { EmptyCart } from "@/components/mini-cart/EmptyCart";
import { isEligableForFreeShipping } from "@/helpers/Summery";
export default function CartClientPage() {
  const state = useAppSelector((x) => x.Store.CartReducer?.CartItems);
  const [load, setLoad] = useState(false);
  const _setting = useAppSelector(
    (state) => state.Store.SettingReducer.setting
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    window.scroll(0, 0);
    setLoad(true);
    dispatch(updateCart(state ?? []));
    setTimeout(() => {
      setLoad(false);
    }, 250);
  }, [state]);

  if (state?.length == 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-2 items-start">
        <div className="col-span-3">
          <EmptyCart />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl">
      <div className="mx-auto">
        <div className="grid grid-cols-1  lg:gap-x-16 lg:grid-cols-6 items-start  gap-y-10">
          <div className="md:col-span-3 lg:col-span-4 ">
            <div className="flow-root mt-7 ">
              <ul className="-my-7 divide-y divide-zinc-200">
                {state?.map((item) => (
                  <li
                    className="p-5 flex border border-gray-200 border-opacity-90 bg-white "
                    key={item.id}
                  >
                    <CartCard {...item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2 lg:top-6 lg:sticky bg-zinc-900">
            <div className="border border-gray-200 border-opacity-90 bg-white p-3 divide-y divide-zinc-200">
              <EDD />
              <div className="py-3 grid grid-cols-2 px-3">
                <div className="grid gap-y-1">
                  <span className="text-xs xl:text-sm font-medium">
                    SubTotal:
                  </span>
                  <span className="text-xs xl:text-sm font-medium">
                    Shipping:
                  </span>
                </div>
                <div className="grid justify-items-end gap-y-1">
                  <span className="text-xs  xl:text-sm font-medium">
                    {currency(getTotalPrice(state), _setting)}
                  </span>
                  <span className="text-xs  xl:text-sm font-medium text-right">
                    {isEligableForFreeShipping(state)
                      ? "Free shipping"
                      : "Calculate at payment!"}
                  </span>
                </div>
                <div className="mt-4 col-span-2">
                  <Button
                    variant="contained"
                    component={Link}
                    href="/checkout"
                    disabled={
                      (state || [])?.filter((x) => x.stock < x.qty).length > 0
                    }
                    color="primary"
                    fullWidth
                  >
                    Checkout Now
                  </Button>{" "}
                  {!load && (
                    <Elements
                      stripe={stripePromise}
                      options={{
                        loader: "auto",
                        appearance: {
                          disableAnimations: false,
                          variables: {
                            borderRadius: "8px",
                          },
                          theme: "stripe",
                        },
                      }}
                    >
                      <ExpressCheckoutNoEmail />
                    </Elements>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
