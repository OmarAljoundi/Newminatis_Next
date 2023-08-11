"use client";
import { FC, useState } from "react";
import Container from "@mui/material/Container";
import Image from "next/legacy/image";

const AboutSection: FC = () => {
  const [isLoading, setLoading] = useState(true);
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
      <div className="max-w-7xl px-4 mx-auto my-0">
        <div className="grid lg:grid-cols-2 gap-8 items-start ">
          <div className="text-center ">
            <div
              className="relative aspect-[1/1] md:aspect-[2/2] overflow-hidden  bg-gray-200 w-full h-full "
              data-aos="fade-left"
              data-aos-easing="linear"
              data-aos-duration="1000"
            >
              <Image
                alt={"banner"}
                src={"/assets/images/custom/Collection(Dune).jpg"}
                title={"banner"}
                layout="fill"
                fetchPriority={"low"}
                loading={"lazy"}
                objectFit="cover"
                quality={90}
                className={`duration-700 ease-in-out group-hover:opacity-75 ${
                  isLoading
                    ? "scale-110 blur-2xl grayscale"
                    : "scale-100 blur-0 grayscale-0"
                })`}
                onLoad={() => setLoading(false)}
              />

              <div className="absolute bg-gray-800 opacity-20 w-full h-full"></div>
            </div>
          </div>
          <div>
            <div className="text-left px-1 md:px-2">
              <div data-aos="fade-right">
                <h1 className="title-sub-font text-xl md:text-2xl whitespace-break-spaces">
                  RADICAL SELF-EXPRESSION
                </h1>
                <p color={"black"} className="text-base md:text-lg">
                  The idea of expressing oneself authentically and creatively,
                  without fear of judgment or criticism from others.
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
                  creativity, innovation, and individuality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutSection;
