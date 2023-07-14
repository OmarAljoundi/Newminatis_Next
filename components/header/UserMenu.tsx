import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Skeleton } from "@mui/material";

export default function UserMenu() {
  const { data: session, status } = useSession();
  return (
    <div className="w-56 text-right">
      {status == "loading" ? (
        <Skeleton width={200} height={40} />
      ) : (
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button
              className="inline-flex w-full justify-center bg-black
                             text-white border border-black px-2 py-1 text-sm font-medium
                             hover:bg-white hover:text-black 
                               focus:outline-none focus-visible:ring-2
                             focus-visible:ring-white focus-visible:ring-opacity-75
                               transition-all duration-300"
            >
              {session?.user?.email}
              <ChevronDownIcon
                className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                {UserMenuItems.map((i) => (
                  <Menu.Item as={Link} href={i.link} key={i.label}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-black text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {i.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
                <Menu.Item key={"signout"}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-black text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => signOut()}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </div>
  );
}

export const UserMenuItems = [
  {
    label: "Profile & Address",
    link: "/my-profile",
  },
  {
    label: "Track your orders",
    link: "/my-profile/track-orders",
  },
];
