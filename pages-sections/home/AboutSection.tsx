"use client";
import { FC, useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { H2, H5 } from "@/components/Typography";
import { BlurImage } from "@/components/BlurImage";

const AboutSection: FC = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        paddingTop: {
          xs: "5px",
          sm: "5px",
          md: "70px",
        },
        paddingBottom: {
          xs: "25px",
          sm: "25px",
          md: "70px",
        },
        paddingX: {
          xs: "0",
          sm: "0",
          md: "0",
        },
        position: "relative",
        zIndex: "2",
      }}
    >
      <Container sx={{ paddingX: "15px" }}>
        <Grid container spacing={3} alignItems={"start"} pb={0}>
          <Grid
            item
            sm={12}
            xs={12}
            md={6}
            sx={{ textAlign: "center", margin: "0 auto" }}
          >
            <div
              className=""
              style={{ padding: "0 10px" }}
              data-aos="fade-left"
              data-aos-easing="linear"
              data-aos-duration="1000"
            >
              <BlurImage
                image={"/assets/images/custom/pic_2.jpg"}
                title="RADICAL SELF-EXPRESSION"
                q={80}
                loading="lazy"
                priority="low"
                customAspect={"aspect-[1/1]"}
              />
            </div>
          </Grid>
          <Grid item sm={12} xs={12} md={6}>
            <Box
              sx={{
                textAlign: "left",
                mt: 3,
                px: {
                  xs: "5px",
                  sm: "5px",
                  md: "10px",
                },
              }}
            >
              <div data-aos="fade-right">
                <h1 className="title-sub-font text-xl md:text-2xl whitespace-break-spaces">
                  RADICAL SELF-EXPRESSION
                </h1>
                <p color={"black"} className="text-base md:text-lg">
                  The idea of expressing oneself authentically and creatively,
                  without fear of judgment or criticism from others. It
                  encourages you to push past your comfort zone and explore your
                  true identity through various forms of art, fashion, music,
                  and other creative outlets.
                </p>
              </div>
              <br />
              <br />
              <div data-aos="fade-right">
                <h1 className="title-sub-font text-xl md:text-2xl whitespace-break-spaces">
                  DECONSTRUCTED FASHION
                </h1>
                <p color={"black"} className="text-base md:text-lg">
                  A style of fashion where the traditional structure and
                  construction of clothing is intentionally altered or undone.
                  This style of fashion aims to challenge traditional notions of
                  what clothing should look like and how it should be
                  constructed.
                </p>
              </div>
              <br />
              <br />
              <div data-aos="fade-right">
                <h1 className="title-sub-font text-xl md:text-2xl whitespace-break-spaces">
                  AVANT-GARDE COMMUNITY
                </h1>
                <p className="text-base md:text-lg">
                  As an avant-garde community, Newminatis defies conventional
                  norms and pushes the limits of fashion by embracing
                  creativity, innovation, and individuality. Through
                  experimentation with diverse materials and techniques, we
                  redefine the fashion landscape, nurturing a vibrant and
                  supportive avant-garde community.
                </p>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default AboutSection;
