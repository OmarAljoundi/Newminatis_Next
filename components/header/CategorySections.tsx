import { FC } from "react";
import { BlurImage } from "../BlurImage";
import Link from "next/link";

export type CategorySectionsProp = {
  sections: any[];
};

export const CategorySections: FC<CategorySectionsProp> = ({ sections }) => {
  return (
    <div className="row-start-1 grid grid-cols-1 gap-x-8 gap-y-10 text-sm">
      {sections.map((section) => (
        <div key={section.id}>
          <ul
            role="list"
            aria-labelledby={`${section.id}-heading`}
            className="mt-0 lg:mt-6 grid grid-cols-1 lg:grid-cols-3  sm:mt-4 gap-4"
          >
            {section.items.map((item) => (
              <li key={item.title} className="flex">
                <Link href={`/${item.url}`} className="hover:text-gray-800">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
