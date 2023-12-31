"use client";
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { ContentWrapper } from "@/components/product-card/StyledComponents";
import { FlexBetween, FlexBox } from "@/components/flex-box";
import { H4, H5, H6 } from "@/components/Typography";
import { calculateDiscount, calculateDiscountAsNumber, currency } from "@/lib";
import { TooltipError, TooltipInfo, TooltipStock } from "@/components/Tooltips";
import { Add, Remove } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { ValueVsQuantity } from "@/types/TProductInventory";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { CartItem } from "@/store/Model/CartItem";
import { GetSKU, getDatesBetween, isHTMLString } from "@/helpers/Extensions";
import { AddItem, RemoveItem, UpdateItem } from "@/store/CartItem/Cart-action";
import { Skeleton } from "@mui/lab";
import { Button, Collapse, Container, IconButton, Zoom } from "@mui/material";
import { MdOutlineWatchLater } from "react-icons/md";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { FiPackage, FiShare } from "react-icons/fi";
import { ShippingInfo } from "@/components/Policies/ShippingInfo";
import ProductSizeSection from "./ProductSizeSection";
import ProductSpecialIcons from "./ProductSpecialIcons";
import { IProductResponse } from "@/interface/IProductResponse";
import { FaShareAlt } from "react-icons/fa";

export default function ProductInfoSection({ response }) {
  const { product, closeDay, hours, minEdd, maxEdd, currentDate } =
    response as IProductResponse;

  const {
    name,
    friendlyName,
    shortDescription,
    price,
    salePrice,
    subSku,
    id,
    color,
    mainImage,
    description,
  } = product;

  const Content = useAppSelector((x) => x.Store.ContentReducer?.Content);
  const _setting = useAppSelector((x) => x.Store.SettingReducer.setting);

  const Share = async () => {
    try {
      await navigator.share({
        text: `Check out ${friendlyName} At Newminatis!`,
        url: window.location.href,
      });
    } catch (error) {
      console.log("Sharing failed!", error);
    }
  };

  return (
    <Grid
      item
      md={6}
      xs={12}
      alignItems="center"
      sx={{
        paddingTop: {
          xs: "0!important",
          sm: "0!important",
          md: "24px",
        },
      }}
    >
      <ContentWrapper
        sx={{
          padding: "4px 0px 4px 2px!important",
          background: "transparent",
        }}
      >
        <div className="mb-6 grid grid-cols-1 gap-x-6 gap-y-2  lg:grid-cols-2 xl:gap-x-8 px-4 ">
          <div className="product-details">
            <p title={name} className="title text-sm font-medium">
              {friendlyName ?? name}
            </p>
            <p
              title={shortDescription.toUpperCase()}
              className="text-sm font-medium"
            >
              {shortDescription.toUpperCase().toUpperCase()}
            </p>
            <div className="flex justify-between items-baseline">
              <FlexBox alignItems="center" gap={1}>
                <p className="title text-sm font-bold mt-4">
                  {calculateDiscount(price, salePrice || 0, _setting)}
                </p>

                {!!salePrice && (
                  <Box color="grey.600">
                    <del>{currency(price, _setting)}</del>
                  </Box>
                )}
              </FlexBox>
              <TooltipInfo title="Share" arrow>
                <div>
                  <FaShareAlt
                    onClick={() => Share()}
                    className="cursor-pointer hover:opacity-50 text-xl"
                  />
                </div>
              </TooltipInfo>
            </div>
          </div>

          <ProductSizeSection product={product} />
        </div>

        <div className="shadow-lg bg-white divide-y-2 divide-zinc-500 divide-opacity-50 border-t-4 border-b-4 ">
          <div className={`flex items-start py-4 px-3`}>
            <div className="rounded-full justify-center items-center flex-shrink-0 w-8 h-8 flex">
              <span className="text-white font-semibold text-lg">
                <MdOutlineWatchLater
                  color="black"
                  className="w-5 h-5 md:h-6 md:w-6"
                />
              </span>
            </div>
            <div className="ml-4">
              <p className="text-black text-xs md:text-base font-semibold">
                {closeDay !== "" ? (
                  <span>
                    Receive you order{" "}
                    <strong className="text-green-700">{closeDay} </strong> if
                    you order within{" "}
                    <strong className="text-red-500">{hours} hours </strong>
                  </span>
                ) : (
                  <span>
                    Receive you order{" "}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: getDatesBetween(minEdd, maxEdd, currentDate),
                      }}
                    ></span>{" "}
                    if you order within{" "}
                    <strong className="text-red-500"> {hours} hours </strong>
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className={`flex items-start py-4 px-3`}>
            <div className="rounded-full justify-center items-center flex-shrink-0 w-8 h-8 flex">
              <span className="text-white font-semibold text-base">
                <FiPackage color="black" className="w-5 h-5 md:h-6 md:w-6" />
              </span>
            </div>
            <div className="ml-4">
              <p className="text-black text-xs md:text-base font-semibold ">
                FREE WORLDWIDE EXPRESS SHIPPING FOR ORDERS ABOVE $300
              </p>
            </div>
          </div>
        </div>

        <div className="w-full pt-4">
          <div className="mx-auto w-full bg-transparent p-0">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className="flex w-full justify-between bg-transparent border-b border-gray-400
                  px-4 py-2 text-left text-sm font-medium text-white  
                  focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                  >
                    <span className="text-black font-semibold">
                      DESCRIPTION
                    </span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-black`}
                    />
                  </Disclosure.Button>
                  <Collapse in={open}>
                    {isHTMLString(description) ? (
                      <Disclosure.Panel
                        dangerouslySetInnerHTML={{
                          __html: description,
                        }}
                        static
                        className="px-4 pt-4 pb-2 text-sm text-black"
                      ></Disclosure.Panel>
                    ) : (
                      <Disclosure.Panel
                        static
                        className="px-4 pt-4 pb-2 text-sm text-gray-500"
                        style={{ whiteSpace: "break-spaces" }}
                      >
                        {description}
                      </Disclosure.Panel>
                    )}
                  </Collapse>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className="flex w-full justify-between 
                   px-4 py-2 text-left text-sm font-medium text-white bg-transparent border-b border-gray-400 focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                  >
                    <span className="text-black font-semibold">
                      SHIPPING INFO
                    </span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-black`}
                    />
                  </Disclosure.Button>
                  <Collapse in={open}>
                    <Disclosure.Panel
                      className="px-4 pt-4 pb-2 text-sm text-gray-500"
                      static
                    >
                      <ShippingInfo />
                    </Disclosure.Panel>
                  </Collapse>
                </>
              )}
            </Disclosure>
            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className="flex w-full justify-between  
                   px-4 py-2 text-left text-sm bg-transparent border-b border-gray-400 focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                  >
                    <span className="text-black font-semibold">
                      RETURN POLICY
                    </span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-black`}
                    />
                  </Disclosure.Button>
                  <Collapse in={open}>
                    <Disclosure.Panel
                      className="px-4 pt-4 pb-2 text-sm text-gray-500"
                      static
                    >
                      {
                        Content?.returnPolicy.find(
                          (x) => x.title.toLowerCase() == "returns"
                        )?.description
                      }
                    </Disclosure.Panel>
                  </Collapse>
                </>
              )}
            </Disclosure>
          </div>
        </div>
        {/* <ProductSpecialIcons /> */}
      </ContentWrapper>
    </Grid>
  );
}
