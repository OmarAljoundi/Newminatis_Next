"use client";
import { FC } from "react";
import { Container } from "@mui/material";
import Image from "next/image";

const ValueSection: FC<{ mode?: "light" | "dark" }> = ({ mode = "dark" }) => {
  return (
    <Container
      style={{
        background: `${mode == "dark" ? "black" : "transparent"}`,
      }}
      maxWidth={false}
      sx={{
        paddingX: "0!important",
        position: "relative",
        zIndex: "1",
      }}
    >
      <div className="max-w-7xl">
        <div className="grid grid-cols-1 justify-items-start md:grid-cols-4 md:justify-items-center gap-y-4 md:divide-x-2">
          {Icons.map((item) => (
            <div
              className="flex md:grid justify-items-start md:justify-items-center w-full gap-x-4 md:gap-x-0 px-3"
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
                <span
                  className={`text-sm font-bold ${
                    mode == "light" ? "text-black" : "text-white"
                  } text-left md:text-center`}
                >
                  {item.title}
                </span>
                <span
                  className={`text-xs font-medium ${
                    mode == "light" ? "text-black" : "text-white"
                  } text-left md:text-center`}
                >
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
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
