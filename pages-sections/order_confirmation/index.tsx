"use client";
import { IOrderResponse } from "@/interface/IOrderResponse";
import React, { FC } from "react";
import { currency } from "@/lib";
import Moment from "react-moment";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { BlurImage } from "@/components/BlurImage";
import { DecryptData } from "@/helpers/Crypto";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createUrlWithSearch } from "@/helpers/Extensions";
import { useSearchParams } from "next/navigation";
import { ClearCart } from "@/store/CartItem/Cart-action";

export const OrderReviewClient: FC<{ secret: string }> = ({ secret }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [order_confirm, setOrder_confirm] = useState<IOrderResponse | null>(
    () => {
      var decrypted = DecryptData<IOrderResponse>(secret);
      return decrypted;
    }
  );

  useEffect(() => {
    if (order_confirm == null) {
      router.replace("/");
    } else {
      dispatch(ClearCart());
      const newUri = createUrlWithSearch(
        "secret",
        null,
        searchParams,
        pathname
      );
      router.replace(newUri);
    }
    return () => {
      setOrder_confirm(null);
    };
  }, []);

  const _setting = useAppSelector((x) => x.Store.SettingReducer.setting);
  return (
    <section className="py-16" data-aos="fade-down">
      {order_confirm ? (
        <div className="px-6 max-w-7xl mx-auto">
          <div className="text-center ">
            <p className="uppercase font-semibold text-xs text-gray-700">
              Thank you
            </p>
            <h1 className="uppercase text-xl md:text-3xl font-bold text-black mt-3">
              Your order is confirmed
            </h1>
          </div>

          <div className="mt-9 md:mt-12 max-w-5xl mx-auto">
            <div className="shadow-xl bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 px-8 divide-x-0 md:divide-x-8 md:divide-neutral-50">
                <div className=" py-6 divide-x-4 pr-0 md:pr-6">
                  <div className="max-w-full md:max-w-xs flow-root">
                    <div className="-my-6 divide-y-2 ">
                      <div className="py-6">
                        <h2 className="text-black font-bold text-base">
                          Order Info
                        </h2>
                        <p className="mt-4 text-sm font-normal">
                          Order number:{" "}
                          <span className="font-bold">
                            #NM_{order_confirm?.orderId + 10000}
                          </span>
                        </p>
                        <p className="text-sm font-normal">
                          Estimited Delievery Date:{" "}
                          <Moment format="YYYY/MM/DD" className="font-bold">
                            {new Date(order_confirm.edd.toString())}
                          </Moment>
                        </p>
                      </div>

                      <div className="py-6">
                        <h2 className="text-black font-bold text-base">
                          Shipping Address
                        </h2>
                        <p className="mt-4 text-sm font-normal">
                          {" "}
                          {order_confirm?.userAddress?.firstName}{" "}
                          {order_confirm?.userAddress?.lastName}{" "}
                        </p>
                        <p className="mt-1 text-sm font-normal">
                          {order_confirm?.userAddress?.addressLine},{" "}
                          {order_confirm?.userAddress?.postalCode}.{" "}
                        </p>
                        <p className="mt-1 text-sm font-normal">
                          {order_confirm?.userAddress?.country},{" "}
                          {order_confirm?.userAddress?.city}
                        </p>
                        <p className="mt-1 text-sm font-normal">
                          {order_confirm?.userAddress?.phoneNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-6 pl-0 md:pl-6">
                  <h3 className="text-black font-bold text-base">
                    Ordered Items
                  </h3>

                  <div className="flow-root mt-5">
                    <ul className="-my-7 divide-y-2 ">
                      {order_confirm?.orderReviewItems.map((item, index) => (
                        <li className="py-7" key={index}>
                          <div className="flex items-start relative">
                            <div className="flex-shrink-0 rounded-lg">
                              <BlurImage
                                image={item.image}
                                width={80}
                                height={80}
                                loading="eager"
                                priority="high"
                                customClass="rounded-lg"
                                customAspect="rounded-lg"
                                q={90}
                              />
                            </div>

                            <div className="pr-4 md:pr-0 flex justify-between flex-col ml-5 ">
                              <div className="flex-1">
                                <p className="text-sm font-bold truncate w-20">
                                  {item.productName}
                                </p>
                                <p className="text-sm font-semibold">
                                  Size: {item.size}
                                </p>
                              </div>
                              <p className="text-sm font-semibold">
                                x {item.quantity}
                              </p>
                            </div>

                            <div className="bottom-auto top-0 right-0 absolute">
                              <p className="text-sm text-right">
                                {currency(item.price, _setting)}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <hr className="mt-6 border" />
                  <ul className="mt-5">
                    <li className="flex items-center justify-between">
                      <p className="font-medium text-sm">Sub total</p>
                      <p className="font-medium text-sm">
                        {currency(order_confirm?.total, _setting)}
                      </p>
                    </li>

                    <li className="flex items-center justify-between space-y-3">
                      <p className="font-bold text-sm">Total</p>
                      <p className="font-bold text-sm">
                        {currency(order_confirm?.total, _setting)}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};
