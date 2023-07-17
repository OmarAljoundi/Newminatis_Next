"use client";
import { useAppSelector } from "@/hooks/useRedux";
import React from "react";

export default function ShippingInformation() {
  const shipping_information = useAppSelector(
    (x) => x.Store.ContentReducer?.Content?.shippingInformation
  );
  return (
    <>
      <div className="grid md:grid-cols-2  mt-8 md:gap-x-4 md:gap-y-16 md:mt-16 mb-5  divide-y-2 md:divide-y-0 divide-zinc-400 px-4">
        {shipping_information?.map((i, index) => (
          <div
            className={`flex items-start md:py-0 ${
              index > 0 ? "py-4" : "pb-4"
            }`}
          >
            <div className="rounded-full bg-zinc-700 justify-center items-center flex-shrink-0 w-8 h-8 flex">
              <span className="text-white font-semibold text-lg">?</span>
            </div>
            <div className="ml-4">
              <p className="text-black text-lg font-semibold">{i.title}</p>
              <p className="text-sm lg:text-base text-zinc-800 mt-4">
                {i.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
