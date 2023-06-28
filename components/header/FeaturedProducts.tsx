import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export type FeaturedProductsProp = {
  featured: any[];
};

export const FeaturedProducts: FC<FeaturedProductsProp> = ({ featured }) => {
  return (
    <div className="col-start-2 grid grid-cols-2 gap-x-8">
      {featured.map((item) => (
        <div key={item.name} className="group relative text-base sm:text-sm">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
            <Image
              src={item.imageSrc}
              alt={item.imageAlt}
              title={item.imageAlt}
              fill={true}
              className="object-cover object-center"
            />
          </div>
          <div className="grid lg:grid-cols-2 justify-items-center mt-2">
            <Link
              href={item.href}
              className="block font-medium text-gray-900  text-sm"
            >
              <span className="absolute inset-0 z-10" aria-hidden="true" />
              {item.name}
            </Link>
            <span
              color="primary"
              aria-hidden="true"
              className="text-sm text-gray-900 font-medium text-right"
            >
              Shop now
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
