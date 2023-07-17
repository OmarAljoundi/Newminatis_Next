"use client";
import { isHTMLString } from "@/helpers/Extensions";
import { useAppSelector } from "@/hooks/useRedux";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { Collapse } from "@mui/material";
import React from "react";

export default function TermsAndCondition() {
  const terms_And_Condition = useAppSelector(
    (x) => x.Store.ContentReducer?.Content?.termsAndCondition
  );
  return (
    <>
      <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16 mb-5">
        {terms_And_Condition?.map((i) => (
          <Disclosure
            as={"div"}
            className={
              "transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50 shadow-lg"
            }
          >
            {({ open }) => (
              <>
                <Disclosure.Button className="flex items-center justify-between w-full px-4 py-5 sm:p-6">
                  <span className="text-black font-semibold text-left">
                    {i.title}
                  </span>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-black`}
                  />
                </Disclosure.Button>
                <Collapse in={open}>
                  <Disclosure.Panel
                    static
                    className=" px-4 pb-5 sm:px-6 sm:pb-6"
                    style={{ whiteSpace: "break-spaces" }}
                  >
                    {i.description}
                  </Disclosure.Panel>
                </Collapse>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </>
  );
}
