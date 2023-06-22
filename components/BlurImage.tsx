"use client";
import Image from "next/legacy/image";
import { FC, useState } from "react";
export const BlurImage: FC<{
  image: string;
  width?: number;
  height?: number;
  customClass?: string;
  loading?: "lazy" | "eager";
  priority?: "high" | "low";
  q?: number;
  title?: string;
  aspect?: boolean;
  customAspect?: string;
}> = ({
  image,
  height,
  width,
  customClass,
  priority = "low",
  loading = "lazy",
  title = "",
  q = 50,
  aspect = false,
  customAspect = "",
}) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <div
      className={` w-full overflow-hidden  bg-gray-200 relative ${
        aspect ? "aspect-[2/3]" : ""
      } ${customAspect}`}
      style={{ width: width ?? "100%", height: height ?? "100%" }}
    >
      {width && height ? (
        <Image
          alt={title}
          src={image}
          width={width}
          height={height}
          objectFit="cover"
          fetchPriority={priority}
          loading={loading}
          quality={q}
          title={title}
          className={`
              ${
                customClass ?? ""
              } duration-700 ease-in-out group-hover:opacity-75
              ${
                isLoading
                  ? "scale-110 blur-2xl grayscale"
                  : "scale-100 blur-0 grayscale-0"
              }) `}
          onLoadingComplete={() => setLoading(false)}
        />
      ) : (
        <Image
          alt={title}
          src={image}
          title={title}
          layout="fill"
          fetchPriority={priority}
          loading={loading}
          objectFit="cover"
          quality={q}
          className={`
             ${
               customClass ?? ""
             } duration-700 ease-in-out group-hover:opacity-75
              ${
                isLoading
                  ? "scale-110 blur-2xl grayscale"
                  : "scale-100 blur-0 grayscale-0"
              })`}
          onLoadingComplete={() => setLoading(false)}
        />
      )}
    </div>
  );
};
