"use client";
import { MapStatus } from "@/helpers/Extensions";
import useOrderService from "@/hooks/useOrderService";
import { useAppSelector } from "@/hooks/useRedux";
import { IOrderResponse } from "@/interface/IOrderResponse";
import { currency } from "@/lib";
import { eOrderStatus } from "@/types/TOrder";
import React from "react";
import Moment from "react-moment";
import { useQuery } from "react-query";

export default function TrackOrdersClient() {
  const { GetOrders } = useOrderService();
  const _setting = useAppSelector((x) => x.Store.SettingReducer.setting);
  const fetchOrders = async () => {
    const result = (await GetOrders()) as IOrderResponse;
    return result.orderDetailsDto;
  };

  const { data: _orders } = useQuery("OrderHistory", () => fetchOrders(), {
    enabled: true,
    cacheTime: 20000,
    select(data) {
      return data.filter((x) => x.status != eOrderStatus.Delieverd);
    },
  });

  return (
    <div className="mt-10 lg:mt-7 mb-5">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border border-gray-300 border-opacity-50 rounded">
          <div className="px-4 lg:px-6 pt-4 pb-1">
            <div className="md:flex md:justify-between md:items-start ">
              <div>
                <p className="font-medium text-lg">
                  You have ({_orders?.length}) orders
                </p>
              </div>
            </div>
          </div>
          <div className="grid divide-y-2 divide-zinc-400 divide-opacity-40">
            {_orders?.map((i) => (
              <div
                className="grid grid-cols-2 lg:grid-cols-4 gap-y-4 py-4 px-4 "
                key={i.id}
              >
                <div className="col-span-2 lg:col-span-4">
                  <span
                    className={`text-sm font-medium flex w-fit p-1 ${
                      i.status == eOrderStatus.Processing
                        ? "bg-rose-500"
                        : "bg-green-600"
                    }  text-white gap-x-2 rounded`}
                  >
                    <svg className="w-5 h-5" fill="white" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3"></circle>
                    </svg>
                    {MapStatus(i.status)}
                  </span>
                </div>
                <div className="grid">
                  <span className="text-sm">Order Number</span>
                  <span className="text-sm">#NM_{11000 + i.id}</span>
                </div>
                <div className="grid">
                  <span className="text-sm">Total</span>
                  <span className="text-sm font-bold">
                    {currency(i.total, _setting)}
                  </span>
                </div>
                <div className="grid">
                  <span className="text-sm">Purchase Date </span>
                  <span className="text-sm font-bold">
                    <Moment format="YYYY-MM-DD">{i.purchaseDate}</Moment>
                  </span>
                </div>
                <div className="grid">
                  <span className="text-sm">Deliver date</span>
                  <span className="text-sm font-bold">
                    <Moment format="YYYY-MM-DD">{i.edd}</Moment>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
