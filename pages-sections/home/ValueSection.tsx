"use client";
import { FC } from "react";
import { Box, Container, Grid } from "@mui/material";
import { H5 } from "@/components/Typography";
import { FlexBox } from "@/components/flex-box";
import Image from "next/image";

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
      <Container>
        <div className="grid grid-cols-1 justify-items-start md:grid-cols-4 md:justify-items-center gap-y-4">
          {Icons.map((item) => (
            <div
              className="flex md:grid justify-items-start md:justify-items-center w-full gap-x-4 md:gap-x-0"
              key={item.title}
            >
              <div style={{ minHeight: "70px" }} className="h-full flex">
                <Image
                  src={item.image}
                  width={70}
                  height={40}
                  alt={item.title}
                  title={item.title}
                  quality={100}
                  fetchPriority="auto"
                  style={{ height: "auto" }}
                />
              </div>
              <div className="mt-2 grid justify-items-start md:justify-items-center ">
                <span className="text-sm text-white text-left md:text-center">
                  {item.title}
                </span>
                <span className="text-xs text-white text-left md:text-center">
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Container>
  );
};

export default ValueSection;

const Icons = [
  {
    title: "COMMUNITY MEMBERSHIP",
    description: "Deals and Discounts",
    image: "/assets/images/discount-04.svg",
  },
  {
    title: "UNIQUE DESIGNS",
    description: "Artistic Designs",
    image: "/assets/images/high-quality-02.svg",
  },
  {
    title: "SECURE PAYMENT",
    description: "Apple Pay and Google Pay Accepted",
    image: "/assets/images/secure-payement-03.svg",
  },
  {
    title: "FREE DELIVERY",
    description: "Free Express Shipping Worldwide",
    image: "/assets/images/free-delivery-01.svg",
  },
];
