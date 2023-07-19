import { FC } from "react";
import { BlurImage } from "../BlurImage";
import Link from "next/link";
import useProductService from "@/hooks/useProductService";
import { TProductCategory } from "@/types/TProductCategory";
import { useQuery } from "react-query";
import { TProductSubCategory } from "@/types/TProductSubCategory";

export type CategorySectionsProp = {
  category: TProductCategory;
  close: () => void;
};

export const CategorySections: FC<CategorySectionsProp> = ({
  close,
  category,
}) => {
  return (
    <div className="row-start-1 grid grid-cols-1 gap-x-8 gap-y-10 text-sm">
      <div>
        <ul
          role="list"
          aria-labelledby={`heading`}
          className="mt-0 lg:mt-6 grid grid-cols-1 lg:grid-cols-3  sm:mt-4 gap-4"
        >
          {category.productSubCategory?.map((item) => (
            <li key={item.description} className="flex">
              <Link
                href={`/shop/${category.description.toLowerCase()}/${item.description.toLowerCase()}`}
                className="hover:text-gray-800"
                onClick={() => close()}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li key={"Explore All"} className="flex">
            <Link
              href={`/shop/${category.description.toLowerCase()}`}
              className="hover:text-gray-800"
              onClick={() => close()}
            >
              Explore All
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
