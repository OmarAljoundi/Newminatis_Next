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
  buttonText?: string;
  showButton?: boolean;
  extraClass?: string;
  cc?: string;
  actionUrl: string;
}> = ({
  src,
  content,
  mt = "370px",
  showButton = true,
  extraClass = "",
  buttonText,
  actionUrl,
  cc,
}) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <div className="relative aspect-[1/1] md:aspect-[3/2]  overflow-hidden  bg-gray-200 w-full h-full">
      <Image
        alt={"banner"}
        src={src}
        title={"banner"}
        layout="fill"
        fetchPriority={"high"}
        loading={"eager"}
        objectFit="cover"
        quality={65}
        className={`duration-700 ease-in-out group-hover:opacity-75 ${
          isLoading
            ? "scale-110 blur-2xl grayscale"
            : "scale-100 blur-0 grayscale-0"
        })`}
        onLoad={() => setLoading(false)}
      />

      <div className="absolute bg-gray-800 opacity-50 w-full h-full"></div>
      <p
        color={"white"}
        className={`lg:w-64 text-lg w-auto lg:text-2xl text-white flex items-center justify-end -mt-2 lg:mt-0 lg:justify-center h-full flex-col uppercase text-center ${cc}`}
      >
        <span className="z-[1]">{content}</span>
        <Link href={actionUrl} className=" mt-4">
          <Button color="secondary" className="w-28">
            <span className="font-bold">{buttonText}</span>
          </Button>
        </Link>
      </p>
    </div>
  );
};
