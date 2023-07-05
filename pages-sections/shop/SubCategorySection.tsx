import { classNames } from "@/helpers/Extensions";
import { RadioGroup } from "@headlessui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export default function SubCategorySection({ subCategory, category }) {
  const param = useParams();

  useEffect(() => {
    subCategory.push({
      name: "Explore All",
      description: null,
    });
  }, []);
  return (
    <RadioGroup className="mt-4">
      <RadioGroup.Label className="sr-only">
        Choose a Sub Category
      </RadioGroup.Label>
      <div className={`grid grid-cols-1 gap-2 mb-5`}>
        {subCategory.map((item) => (
          <RadioGroup.Option
            key={item.name}
            value={item.name}
            className={({ active }) =>
              classNames(
                param?.subCategory == item.description &&
                  param?.category == category
                  ? "ring-2 ring-indigo-500"
                  : "",
                "cursor-pointer group relative flex items-center justify-center rounded-md border py-2 px-2 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
              )
            }
          >
            {({ active, checked }) => (
              <>
                <RadioGroup.Label
                  as={Link}
                  href={`/shop/${category}${
                    item.description ? `/${item.description}` : ""
                  }`}
                  className={"text-xs truncate"}
                >
                  {item.name}
                </RadioGroup.Label>
                <span
                  className={classNames(
                    active ? "border" : "border-2",
                    checked ? "border-indigo-500" : "border-transparent",
                    "pointer-events-none absolute -inset-px rounded-md"
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
