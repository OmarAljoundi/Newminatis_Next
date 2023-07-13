"use client";
import CartCard from "@/components/product-card/CartCard";
import { getTotalPrice } from "@/helpers/Extensions";
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

  return (
    <Grid container spacing={3}>
      {state && state?.length > 0 ? (
        <Fragment>
          <Grid item md={8} xs={12}>
            {state?.map((item) => (
              <CartCard key={item.id} {...item} />
            ))}
          </Grid>

          <Grid item md={4} xs={12}>
            <Card sx={{ borderRadius: "0", paddingY: "1rem" }} elevation={1}>
              <EDD />
              <div className="py-3 grid grid-cols-2 px-5">
                <div className="grid gap-y-1">
                  <span className="text-sm font-medium">SubTotal:</span>
                  <span className="text-sm font-medium">Shipping:</span>
                  <span className="text-sm font-medium">Total:</span>
                </div>
                <div className="grid justify-items-end gap-y-1">
                  <span className="text-sm font-medium">
                    {currency(getTotalPrice(state), _setting)}
                  </span>
                  <span className="text-sm font-medium">FREE</span>

                  <span className="text-sm font-medium">
                    {currency(getTotalPrice(state), _setting)}
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
            </Card>
          </Grid>
        </Fragment>
      ) : (
        <Grid item xs={12}>
          <EmptyCart />
        </Grid>
      )}
    </Grid>
  );
}
