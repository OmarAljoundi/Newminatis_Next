"use clinet";
import Link from "next/link";
import React, { FC } from "react";

const Breadcrumb: FC<{ title?: string[]; link?: string[] }> = ({
  title,
  link,
}) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        role="list"
        className="mx-auto flex max-w-2xl items-center space-x-2 px-3  lg:max-w-7xl lg:px-0"
      >
        {title?.map((i, index) => (
          <li className="text-sm" key={index}>
            <div className="flex items-center">
              <Link
                href={link![index]}
                aria-current={index == title.length - 1 ? "true" : "false"}
                className={`capitalize font-medium text-xs  lg:text-sm  ${
                  index != title.length - 1
                    ? "mr-2 text-xs  lg:text-sm font-medium text-gray-900 title"
                    : "text-gray-500 hover:text-gray-600 w-14 sm:w-full truncate"
                }`}
              >
                {i}
              </Link>
              {index != title.length - 1 && (
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
