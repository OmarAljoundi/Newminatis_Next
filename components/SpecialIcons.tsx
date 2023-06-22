import { Box, Chip, Container, Grid } from "@mui/material";
import { FlexBox } from "./flex-box";
import { H3, H4, H5, H6, Paragraph, Span, Tiny } from "./Typography";
import { FC } from "react";
import { getDatesBetween } from "@/helpers/Extensions";

type SpecialIconsProps = {
  minEdd: Date;
  maxEdd: Date;
  currentDate: Date;
  closeDay: string;
  hours: number;
};
export const SpecialIcons: FC<SpecialIconsProps> = ({
  maxEdd,
  minEdd,
  currentDate,
  closeDay,
  hours,
}) => {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        {closeDay != "" ? (
          <Box className="border-glow" px={2} py={1}>
            <H5 textAlign={"center"}>
              Order within {hours} hours GET IT {"  "}
              {closeDay.toUpperCase()}
            </H5>
          </Box>
        ) : (
          <Box className="border-glow" px={2} py={1}>
            <H5 textAlign={"center"} display={"inline-block"}>
              Order within {hours} hours GET IT{" "}
              {getDatesBetween(minEdd, maxEdd, currentDate)}{" "}
            </H5>
          </Box>
        )}
      </Box>

      <Grid container item spacing={3} alignItems={"baseline"}>
        {SpecialIconsConstant.map((item) => (
          <Grid item xs={3} key={item.Title} mt={4}>
            <FlexBox
              justifyItems={"center"}
              justifyContent={{
                sx: "flex-start",
                xs: "flex-start",
                md: "center",
              }}
              alignItems={"center"}
              columnGap={"5px"}
              sx={{
                paddingLeft: item.extraPadding ? "7px" : "0",
              }}
            >
              <img
                src={item.IconPath}
                alt="logo"
                sizes="(max-width: 600px) 25px,50px"
                className="icons-sp"
              />
              <Box textAlign={"center"} fontSize={0}>
                <Tiny
                  textAlign={"left"}
                  fontSize={{
                    xs: "9px",
                    sm: "14px",
                    md: "14px",
                    lg: "14px",
                  }}
                  display={"block"}
                >
                  {item.Title}
                </Tiny>
              </Box>
            </FlexBox>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

const SpecialIconsConstant = [
  {
    IconPath: "/assets/images/discount-04.svg",
    Title: "COMMUNITY MEMBERSHIP",
    SubTitle: "Deals and Discounts",
    extraPadding: false,
  },
  {
    IconPath: "/assets/images/secure-payement-03.svg",
    Title: "SECURE PAYMENT",
    SubTitle: "Apple Pay and Google Pay Accepted",
    extraPadding: true,
  },
  {
    IconPath: "/assets/images/free-delivery-01.svg",
    Title: "FREE EXPRESS DELIVERY",
    SubTitle: "Free Express Shipping Worldwide",
    extraPadding: false,
  },
  {
    IconPath: "/assets/images/high-quality-02.svg",
    Title: "FREE RETURN",
    SubTitle: "Artistic Designs",
    extraPadding: false,
  },
];
