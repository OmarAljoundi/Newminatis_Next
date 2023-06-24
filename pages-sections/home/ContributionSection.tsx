"use client";
import { BlurImage } from "@/components/BlurImage";
import { H1, Paragraph } from "@/components/Typography";
import { Container } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function ContributionSection() {
  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <div className="inner ">
            <H1
              data-aos="fade-left"
              textAlign={"center"}
              mb={4}
              mt={10}
              sx={{
                width: "fit-content",
                paddingY: 0.5,
                borderRadius: "10px",
                marginRight: "auto",
                marginLeft: "0",
                marginTop: "10px",
                color: "white",
                fontSize: {
                  xs: "16px",
                  sm: "24px",
                  md: "24px",
                  lg: "24px",
                  xl: "24px",
                },
              }}
            >
              OUR CONTRIBUTION
            </H1>
            <Paragraph
              color={"white"}
              lineHeight={1.2}
              className="text-xl md:text-2xl"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
            >
              A part of our revenue goes towards initiatives that remove carbon
              dioxide from the atmosphere, and we strive to promote sustainable
              practices within the industry.
            </Paragraph>
          </div>
        </div>
        <div className="hero-image" style={{ marginBottom: "-5px" }}>
          <div className="image-overlay"></div>
          <BlurImage
            image="/assets/images/custom/Ourcontribution.jpg"
            title="Ourcontribution"
            q={60}
            loading="lazy"
            priority="low"
            customAspect={"aspect-[16/12] md:aspect-[16/5]"}
          />
        </div>
      </div>
    </>
  );
}
