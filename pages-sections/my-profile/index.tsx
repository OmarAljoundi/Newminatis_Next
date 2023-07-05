"use client";
import Google from "@/components/icons/login-icons/Google";
import { useSession } from "next-auth/react";
import React from "react";

export default function MyProfileClient() {
  const { data: session } = useSession();
  return (
    <form action="#" method="POST" className="max-w-3xl mt-12">
      <div className="rf">
        <div className="grid grid-cols-3 items-start gap-5">
          <label htmlFor="" className="pt-2 mt-[1px] font-medium text-xl block">
            {" "}
            First &amp; Last Name{" "}
          </label>
          <div className="col-span-2 mt-0 ">
            <div className="grid gap-5 grid-cols-2">
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder=""
                  readOnly
                  value="Martin"
                  className="text-sm caret-black py-2 px-2 border  w-full block border-gray-400 border-opacity-50  font-medium"
                />
              </div>

              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder=""
                  value="Janiter"
                  className="text-sm caret-black py-2 px-2 border  w-full block border-gray-400 border-opacity-50"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 items-start gap-5 mt-8">
          <label htmlFor="" className="pt-2 mt-[1px] font-medium text-xl block">
            Email Address
          </label>
          <div className="col-span-2 mt-0 ">
            <div className="grid gap-5 grid-cols-1">
              <div className="relative">
                <input
                  type="email"
                  name=""
                  id=""
                  readOnly
                  placeholder=""
                  value={session?.user?.email || ""}
                  className="text-sm caret-black py-2 px-2 border  w-full block border-gray-400 border-opacity-50 font-medium"
                />
                <div className="absolute right-0 top-2">
                  <Google />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
