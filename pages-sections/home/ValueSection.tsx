"use client";
import { FC } from "react";
import { Box, Container, Grid } from "@mui/material";
import { H5 } from "@/components/Typography";
import { FlexBox } from "@/components/flex-box";

const styles = {
  container: {
    background: "black",
    // backgroundImage: `url(${require('../../images/b_policy_h2.jpg')})`,
    // backgroundPosition: 'center right',
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: 'cover',
  },
};
const ValueSection: FC = () => {
  return (
    <Container
      style={styles.container}
      maxWidth={false}
      sx={{
        paddingTop: {
          sm: "30px",
          xs: "30px",
          md: "30px",
          lg: "100px",
        },
        position: "relative",
        zIndex: "1",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#000000",
          opacity: "0.5",
          transition: "background 0.3s, border-radius 0.3s, opacity 0.3s",
          height: "100%",
          width: "100%",
          top: "0",
          left: "0",
          position: "absolute",
          zIndex: "-1",
        }}
      ></Box>

      <Container>
        <Grid
          container
          item
          sx={{
            rowGap: {
              xs: "20px",
              sm: "20px",
              md: "20px",
              lg: "0",
            },
          }}
          alignItems={"center"}
        >
          <Grid item sm={6} xs={12} md={6} lg={3}>
            <FlexBox
              justifyContent={{
                sx: "flex-start",
                xs: "flex-start",
                md: "center",
              }}
              columnGap={"20px"}
              alignItems={"center"}
            >
              <Box
                component={"img"}
                sx={{
                  width: {
                    xs: "50px",
                    md: "75px",
                  },
                  height: {
                    xs: "50px",
                    md: "75px",
                  },
                }}
                src={"/assets/images/discount-04.svg"}
                alt="logo"
              />

              <Box>
                <H5 color={"white"}>COMMUNITY MEMBERSHIP</H5>
                <H5 color={"white"} className="title-sub-font">
                  Deals and Discounts
                </H5>
              </Box>
            </FlexBox>
          </Grid>

          <Grid item sm={6} xs={12} md={6} lg={3}>
            <FlexBox
              justifyContent={{
                sx: "flex-start",
                xs: "flex-start",
                md: "center",
              }}
              columnGap={"20px"}
              alignItems={"center"}
            >
              <Box
                component={"img"}
                src={"/assets/images/secure-payement-03.svg"}
                alt="logo"
                color="red"
                sx={{
                  width: {
                    xs: "50px",
                    md: "75px",
                  },
                  height: {
                    xs: "50px",
                    md: "75px",
                  },
                }}
              />

              <Box>
                <H5 color={"white"}>SECURE PAYMENT</H5>
                <H5 color={"white"} className="title-sub-font">
                  {" "}
                  Apple Pay and Google Pay Accepted
                </H5>
              </Box>
            </FlexBox>
          </Grid>

          <Grid item sm={6} xs={12} md={6} lg={3}>
            <FlexBox
              justifyContent={{
                sx: "flex-start",
                xs: "flex-start",
                md: "center",
              }}
              columnGap={"20px"}
              alignItems={"center"}
            >
              <Box
                component={"img"}
                src={"/assets/images/free-delivery-01.svg"}
                alt="logo"
                sx={{
                  width: {
                    xs: "50px",
                    md: "75px",
                  },
                  height: {
                    xs: "50px",
                    md: "75px",
                  },
                }}
              />

              <Box>
                <H5 color={"white"}>FREE DELIVERY</H5>
                <H5 color={"white"} className="title-sub-font">
                  Free Express Shipping Worldwide
                </H5>
              </Box>
            </FlexBox>
          </Grid>

          <Grid item sm={6} xs={12} md={6} lg={3}>
            <FlexBox
              justifyContent={{
                sx: "flex-start",
                xs: "flex-start",
                md: "center",
              }}
              columnGap={"20px"}
              alignItems={"center"}
            >
              <Box
                component={"img"}
                src={"/assets/images/high-quality-02.svg"}
                alt="logo"
                sx={{
                  width: {
                    xs: "50px",
                    md: "75px",
                  },
                  height: {
                    xs: "50px",
                    md: "75px",
                  },
                }}
              />

              <Box>
                <H5 color={"white"}>UNIQUE DESIGNS</H5>
                <H5 color={"white"} className="title-sub-font">
                  Artistic Designs
                </H5>
              </Box>
            </FlexBox>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default ValueSection;
