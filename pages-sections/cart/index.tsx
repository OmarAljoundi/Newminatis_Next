"use client";

import { FlexBetween } from "@/components/flex-box";
import CartCard from "@/components/product-card/CartCard";
import { getTotalPrice } from "@/helpers/Extensions";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { currency } from "@/lib";
import { updateCart } from "@/store/CartItem/ThunkAPI";
import { Grid, Card, Typography, Box, Divider, Button } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EDD from "./EDD";
import { Elements } from "@stripe/react-stripe-js";
import { ExpressCheckoutNoEmail } from "@/components/stripe/ExpressCheckoutNoEmail";
import { stripePromise } from "@/components/stripe/StripeScript";

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
      <Grid item md={8} xs={12}>
        {state?.map((item) => (
          <CartCard key={item.id} {...item} />
        ))}
      </Grid>

      {/* CHECKOUT FORM */}
      <Grid item md={4} xs={12}>
        <Card sx={{ borderRadius: "0" }} elevation={1}>
          <EDD />
          <Box p={3}>
            <FlexBetween mb={1}>
              <Typography color="grey.600" sx={{ textTransform: "uppercase" }}>
                Subtotal:
              </Typography>
              <Typography className="text-14" lineHeight="1">
                {currency(getTotalPrice(state), _setting)}
              </Typography>
            </FlexBetween>
            <FlexBetween mb={1}>
              <Typography color="grey.600" sx={{ textTransform: "uppercase" }}>
                Shipping:
              </Typography>
              <Typography className="text-14" lineHeight="1">
                FREE
              </Typography>
            </FlexBetween>
            <Divider sx={{ mb: "1rem" }} />
            <FlexBetween mb={2}>
              <Typography color="grey.600" sx={{ textTransform: "uppercase" }}>
                Total:
              </Typography>
              <Typography className="text-14" lineHeight="1">
                {currency(getTotalPrice(state), _setting)}
              </Typography>
            </FlexBetween>
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
                      fontFamily: "Alata-Regular",
                    },
                    theme: "stripe",
                  },
                }}
              >
                <ExpressCheckoutNoEmail />
              </Elements>
            )}
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
