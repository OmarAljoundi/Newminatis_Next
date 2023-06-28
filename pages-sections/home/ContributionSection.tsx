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
            <h1 data-aos="fade-left" className="text-white text-xl md:text-2xl">
              OUR CONTRIBUTION
            </h1>
            <p
              className="text-sm md:text-xl lg:text-2xl text-white"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
            >
              A part of our revenue goes towards initiatives that remove carbon
              dioxide from the atmosphere, and we strive to promote sustainable
              practices within the industry.
            </p>
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
