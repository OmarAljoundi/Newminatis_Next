import { Box, Button } from "@mui/material";

import { FC, useState } from "react";
import { H2, H5 } from "./Typography";
import { ArrowForward } from "@mui/icons-material";
import Link from "next/link";
import { BlurImage } from "./BlurImage";
import Image from "next/legacy/image";

export const HeroImage: FC<{
  src: string;
  content: string;
  mt?: string;
  showButton?: boolean;
  extraClass?: string;
}> = ({ src, content, mt = "370px", showButton = true, extraClass = "" }) => {
  return (
    <div className="relative aspect-[1/1] md:aspect-[16/4]">
      <Image
        src={src}
        layout="fill"
        objectFit="cover"
        loading="eager"
        fetchPriority="high"
        priority={true}
        quality={20}
      />

      <div className="absolute bg-gray-800 opacity-70 w-full h-full">
        <H2
          color={"white"}
          className="w-2/4 mx-auto"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            flexDirection: "column",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {content}
          <Link href={"/shop"}>
            <Button color="secondary" className="w-28">
              Shop now
            </Button>
          </Link>
        </H2>
      </div>
    </div>
  );
};
