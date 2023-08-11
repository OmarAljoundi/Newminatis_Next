import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import { UserCircleIcon } from "@heroicons/react/24/outline";
export default function MobileUserMenu() {
  const { data: session } = useSession();

  if (session?.user?.email) {
    return (
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button
              className="inline-flex w-full justify-center 
                             text-white   text-sm font-medium
                             hover:bg-white hover:text-black 
                              transition-all duration-300"
            >
              <Avatar
                title={session.user.email}
                alt={session.user.email}
                className="-mr-1 h-8 w-8 mt-[6px]"
                aria-hidden="true"
              >
                <span className="text-black text-sm">
                  {session.user.email.substring(0, 2).toUpperCase()}
                </span>
              </Avatar>
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
            <Menu.Items className="absolute right-0 left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
      </div>
    );
  }
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className="inline-flex w-full justify-center 
                                text-sm font-medium
                             hover:bg-white hover:text-black 
                              transition-all duration-300"
          >
            <UserCircleIcon
              className="-mr-1 h-8 w-8 mt-[6px] text-gray-400"
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
          <Menu.Items className="absolute right-0 left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {LoggedOutUserMenuItems.map((i) => (
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
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
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

export const LoggedOutUserMenuItems = [
  {
    label: "Sign in",
    link: "/auth/login",
  },
  {
    label: "Create account",
    link: "/auth/register",
  },
];
