"use client";

import { FC, Fragment, ReactNode, useCallback, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/20/solid";
import ProductSection from "@/pages-sections/shop/ProductSection";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import FilterSection from "@/pages-sections/shop/FilterSection";
import Sidenav from "@/components/Sidenav";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid";
import Breadcrumb from "@/pages-sections/shop/Breadcrumb";

type ShopRootLayoutProp = {
  children: ReactNode;
};

const sortOptions = [
  { name: "Newest", href: "newest", current: false },
  { name: "Price: Low to High", href: "low", current: false },
  { name: "Price: High to Low", href: "high", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ShopRootLayout: FC<ShopRootLayoutProp> = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return `${params.toString()}&`;
  }, []);
  const handleSortChange = (e: string) => {
    var path = "";
    path += createQueryString("sort", e);
    router.push(("?" + path.slice(0, -1)) as any);
  };

  const BuildBread = () => {
    let Links: string[] = ["/", "/shop"];
    let Titles: string[] = ["Home", "Shop"];

    if ((params as any)?.category) {
      Links.push(`/shop/${params!.category as string}`);
      Titles.push(params!.category as string);
    }
    if ((params as any)?.subCategory) {
      Links.push(params!.subCategory as string);
      Titles.push(params!.subCategory as string);
    }

    return <Breadcrumb link={Links} title={Titles} />;
  };
  return (
    <div>
      {/* Mobile filter dialog */}
      <Sidenav
        open={mobileFiltersOpen}
        toggleSidenav={() => setMobileFiltersOpen(!mobileFiltersOpen)}
      >
        <div className="h-full">
          <FilterSection />
        </div>
      </Sidenav>

      <main className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
        <div className="flex justify-between border-b border-gray-200  pt-6 items-start">
          <h1 className="tracking-tight">{BuildBread()}</h1>

          <div className="flex items-start gap-x-4">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center font-medium text-gray-700 hover:text-gray-900 title text-xs lg:text-sm">
                  <AdjustmentsHorizontalIcon
                    className="h-5 w-5"
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <span
                            onClick={() => handleSortChange(option.href)}
                            className={classNames(
                              //@ts-ignore
                              searchParams.get("sort") == option.href
                                ? "font-medium text-gray-900 bg-slate-400"
                                : "text-gray-500",
                              "block px-4 py-2 text-sm title",
                              "cursor-pointer"
                            )}
                          >
                            {option.name}
                          </span>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden"
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <div className="hidden lg:block">
              <FilterSection />
            </div>

            <div className="lg:col-span-3">{children}</div>
          </div>
        </section>
      </main>
    </div>
  );
};
export default ShopRootLayout;
