"use client";
import { BlurImage } from "@/components/BlurImage";
import { MapColors, MapStatus } from "@/helpers/Extensions";
import useOrderService from "@/hooks/useOrderService";
import { useAppSelector } from "@/hooks/useRedux";
import { IOrderResponse } from "@/interface/IOrderResponse";
import { currency } from "@/lib";
import { TOrderDto } from "@/types/TOrder";
import Link from "next/link";
import React, { useState } from "react";
import Moment from "react-moment";
import { useQuery } from "react-query";

export default function OrderHistoryClient() {
  const { GetOrders } = useOrderService();
  const _setting = useAppSelector((x) => x.Store.SettingReducer.setting);
  const fetchOrders = async () => {
    const result = (await GetOrders()) as IOrderResponse;
    return result.orderDetailsDto;
  };

  const { data: _orders } = useQuery("OrderHistory", () => fetchOrders(), {
    enabled: true,
    cacheTime: 20000,
  });

  return (
    <article className="mt-14 lg:mt-7 mb-5">
      <div className="max-w-7xl mx-auto px-2 md:px-0">
        <div className="flow-root">
          <ul className="-my-12 lg:my-0 ">
            {_orders?.map((i) => (
              <li
                className="lg:px-0 mb-8 shadow-lg border border-gray-400 border-opacity-70"
                key={i.id}
              >
                <div className="lg:items-center md:justify-between md:items-start md:flex pl-4  pt-4 lg:pt-10">
                  <div className="lg:flex lg:items-center gap-x-5">
                    <p className="text-sm font-medium">
                      Order ID:{" "}
                      <span className="text-sm font-bold">
                        NM_{i.id + 11000}
                      </span>
                    </p>

                    <p className="text-sm font-medium lg:pl-4">
                      Date:{" "}
                      <span className="text-sm font-bold">
                        <Moment format="YYYY-MM-DD">
                          {new Date(i.purchaseDate)}
                        </Moment>
                      </span>
                    </p>

                    <p className="text-sm font-medium lg:pl-4">
                      Order Status:{" "}
                      <span className="text-sm font-bold">
                        {MapStatus(i.status)}
                      </span>
                    </p>
                  </div>
                </div>

                <hr className="border-t-2 border-zinc-600 mt-1" />

                <ul className="px-4">
                  {i.orderItems.map((y, index) => (
                    <li
                      className="py-4 lg:pt-7 md:flex md:items-start md:justify-between"
                      key={y.id}
                    >
                      <div className="items-stretch flex-1 flex">
                        <div className="flex-shrink-0">
                          <BlurImage
                            image={y.product?.mainImage || ""}
                            title={y.product?.name ?? ""}
                            width={150}
                            height={200}
                            q={100}
                            loading="eager"
                            priority="high"
                          />
                        </div>

                        <div className="justify-between flex-col flex ml-5 ">
                          <div className="flex-1">
                            <p className="font-bold text-sm">
                              {y.product?.friendlyName} - {y.size}
                            </p>
                            <p className="font-medium text-sm mt-1">
                              {MapColors(y.product?.color || 1)}
                            </p>
                          </div>

                          <p className="font-bold text-base mt-4">
                            {currency(y.pricePerOne, _setting)} x {y.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="grid divide-y-2 ">
                        <div className="space-x-5 md:justify-end md:mt-0 justify-start items-center flex mt-5 pb-4">
                          <Link
                            href={`/product/x`}
                            title=""
                            className="transition-all duration-300 text-gray-400 hover:text-black font-medium text-sm -m-0.5"
                          >
                            View Products
                          </Link>

                          <span className="space-x-5"> | </span>

                          <Link
                            href={`/product/x`}
                            title=""
                            className="transition-all duration-300 text-gray-400 hover:text-black font-medium text-sm -m-0.5"
                          >
                            Similar Product
                          </Link>
                        </div>
                        {index === i.orderItems.length - 1 && (
                          <div className="pt-4 divide-y-2">
                            <ul className="pb-4">
                              <li className="flex items-center justify-between">
                                <p className="font-medium text-xs md:text-sm">
                                  Sub total
                                </p>
                                <p className="font-medium text-xs md:text-sm">
                                  {currency(i.subTotal, _setting)}
                                </p>
                              </li>
                              {i?.discount > 0 && (
                                <li className="flex items-center justify-between">
                                  <p className="font-medium text-xs md:text-sm text-red-500">
                                    Discount
                                  </p>
                                  <p className="font-medium text-xs md:text-sm text-red-500">
                                    -{currency(i?.discount, _setting)}
                                  </p>
                                </li>
                              )}

                              <li className="flex items-center justify-between">
                                <p className="font-medium text-xs md:text-sm">
                                  Shipping & handling
                                </p>
                                <p className="font-medium text-xs md:text-sm">
                                  {i?.shippingCost > 0
                                    ? currency(i?.shippingCost, _setting)
                                    : "Shipped free!"}
                                </p>
                              </li>
                              <li className="flex items-center justify-between">
                                <p className="font-medium text-xs md:text-sm">
                                  Vat
                                </p>
                                <p className="font-medium text-xs md:text-sm">
                                  {currency(i?.taxCost, _setting)}
                                </p>
                              </li>
                              <li className="flex items-center justify-between">
                                <p className="font-medium text-xs md:text-sm">
                                  Duty
                                </p>
                                <p className="font-medium text-xs md:text-sm">
                                  {currency(i?.dutyCost, _setting)}
                                </p>
                              </li>
                            </ul>
                            <div className="py-5 flex justify-between pt-4">
                              <p className="font-bold text-lg">Total</p>
                              <p className="font-bold text-lg">
                                {currency(i?.total, _setting)}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
