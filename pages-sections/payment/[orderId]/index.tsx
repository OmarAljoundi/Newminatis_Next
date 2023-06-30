"use client";
import { IOrderResponse } from "@/interface/IOrderResponse";
import React, { FC } from "react";
import { H2, H3, H4, H5 } from "@/components/Typography";
import { FlexBetween, FlexBox } from "@/components/flex-box";
import { currency } from "@/lib";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Avatar, Box, Button, Card, Divider, Grid } from "@mui/material";
import Link from "next/link";
import Moment from "react-moment";
import { useAppSelector } from "@/hooks/useRedux";

export const OrderReviewClient: FC<IOrderResponse> = ({
  orderReviewItems,
  total,
  userAddress,
  edd,
  orderId,
}) => {
  const _setting = useAppSelector((x) => x.Store.SettingReducer.setting);
  return (
    <>
      <Box sx={{ margin: "15px auto", maxWidth: "750px" }}>
        <Card elevation={12}>
          <FlexBox alignItems={"center"}>
            <CheckCircleIcon color="success" fontSize="large" />
            <H2>Thank you for your order</H2>
          </FlexBox>

          <H3 mt={5} mb={1} sx={{ color: "#D3C4AB" }}>
            Order Summary
          </H3>
          <Grid container item alignItems={"center"}>
            {orderReviewItems.map((item) => (
              <>
                <Grid xs={9} item mb={3}>
                  <FlexBetween columnGap={"10px"} justifyContent={"flex-start"}>
                    <Avatar
                      alt="Product Image"
                      src={item.image}
                      sx={{
                        height: "76px",
                        width: "76px",
                      }}
                    />
                    <H3>
                      {item.productName} x{item.quantity} ({item.size})
                    </H3>
                  </FlexBetween>
                </Grid>

                <Grid xs={3} item mb={3}>
                  <Box>
                    <H3>{currency(item.price, _setting)}</H3>
                  </Box>
                </Grid>
              </>
            ))}
            <Grid xs={12}>
              <Divider
                sx={{
                  mb: "0.5rem",
                  mt: "0.5rem",
                  borderColor: "white",
                }}
              />
            </Grid>

            <Grid xs={9} item>
              <Box>
                <H3>Shipping</H3>
              </Box>
              <Divider
                sx={{
                  mb: "0.5rem",
                  mt: "0.5rem",
                  borderColor: "white",
                }}
              />
            </Grid>

            <Grid xs={3} item>
              <Box>
                <H3>FREE!</H3>
              </Box>
              <Divider
                sx={{
                  mb: "0.5rem",
                  mt: "0.5rem",
                  borderColor: "white",
                }}
              />
            </Grid>

            <Grid xs={9} item>
              <Box>
                <H3>Total</H3>
              </Box>
            </Grid>

            <Grid xs={3} item>
              <Box>
                <H3>{currency(total, _setting)}</H3>
              </Box>
            </Grid>
          </Grid>

          <Grid container item>
            <Grid item xs={6}>
              <H3 mt={5} mb={1} sx={{ color: "#D3C4AB" }}>
                Shipping Address
              </H3>
              <H4>
                {userAddress?.firstName} {userAddress?.lastName}{" "}
              </H4>
              <H4>
                {userAddress?.country}, {userAddress?.city}
              </H4>
              <H4>
                {userAddress?.addressLine}, {userAddress?.postalCode}
              </H4>
              <H4>{userAddress?.phoneNumber}</H4>
            </Grid>
            <Grid item xs={6}>
              <H3 mt={5} mb={1} sx={{ color: "#D3C4AB" }}>
                Estimated Delivery Date
              </H3>
              <H4>Approximately before</H4>
              <H5>
                <Moment format="YYYY/MM/DD">{new Date(edd.toString())}</Moment>
              </H5>
            </Grid>
          </Grid>

          <FlexBox columnGap={"20px"} mt={5}>
            <Link href="/shop">
              <Button color="secondary" variant="contained">
                Shop Again
              </Button>
            </Link>
          </FlexBox>
        </Card>
      </Box>
      <img
        src={`https://www.shareasale.com/sale.cfm?tracking=${orderId}&amount=${total}&merchantID=140424&transtype=sale`}
        width="1"
        height="1"
      />
      <script
        src="https://www.dwin1.com/50383.js"
        type="text/javascript"
        defer={true}
      ></script>
    </>
  );
};
