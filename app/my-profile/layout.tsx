"use client";
import { UserMenuItems } from "@/components/header/UserMenu";
import { Skeleton } from "@mui/material";
import { useSession } from "next-auth/react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function ProfileLayout({ children }) {
  const pathname = usePathname();
  const route = useRouter();
  const isActiveLink = (link: string) => {
    return pathname == link;
  };
  const { data: authedSession, status } = useSession();

  if (status == "unauthenticated") {
    route.push("/auth/login");
  }
  return (
    <main className="max-w-7xl mx-auto mb-4">
      <div className="py-2 lg:py-6">
        <div className="px-2 lg:px-8 ">
          <h1 className="text-xl font-medium">
            {status == "loading" ? (
              <Skeleton className="w-1/3" height={40} />
            ) : (
              `Welcome, ${authedSession?.user.email}`
            )}
          </h1>
        </div>

        <div className="px-2 lg:px-8 mx-auto mt-2 md:mt-8">
          <div className="pb-1 overflow-x-auto w-full">
            <div className="border-b border-zinc-200">
              <nav className="flex -mb-[1] gap-x-10">
                {UserMenuItems.map((item, index) => (
                  <>
                    {status == "loading" ? (
                      <Skeleton
                        className="duration-200 w-1/5 transition-all font-medium text-base py-4  whitespace-nowrap "
                        height={40}
                        key={index}
                      />
                    ) : (
                      <Link
                        href={item.link}
                        className={`duration-200 transition-all font-medium text-base py-4  whitespace-nowrap 
                     ${
                       isActiveLink(item.link)
                         ? "text-red-900 border-red-900 border-b"
                         : "hover:border-gray-600 hover:border-b text-gray-600"
                     }`}
                        key={index}
                      >
                        {item.label}
                      </Link>
                    )}
                  </>
                ))}
              </nav>
            </div>
          </div>

          {status == "authenticated" && <div>{children}</div>}
        </div>
      </div>
    </main>
  );
}
