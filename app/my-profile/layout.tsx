"use client";
import { UserMenuItems } from "@/components/header/UserMenu";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function ProfileLayout({ children }) {
  const pathname = usePathname();
  const isActiveLink = (link: string) => {
    return pathname == link;
  };
  return (
    <main className="max-w-7xl mx-auto">
      <div className="py-6">
        <div className="px-8">
          <h1 className="text-xl font-medium">Your Profile</h1>
        </div>

        <div className="px-8 mx-auto mt-8">
          <div className="pb-1 overflow-x-auto w-full">
            <div className="border-b border-zinc-200">
              <nav className="flex -mb-[1] gap-x-10">
                {UserMenuItems.map((item) => (
                  <Link
                    href={item.link}
                    className={`duration-200 transition-all font-medium text-base py-4  whitespace-nowrap 
                     ${
                       isActiveLink(item.link)
                         ? "text-red-900 border-red-900 border-b"
                         : "hover:border-gray-600 hover:border-b text-gray-600"
                     }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="db">{children}</div>
        </div>
      </div>
    </main>
  );
}
