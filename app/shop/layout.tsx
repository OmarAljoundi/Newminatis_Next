"use client";

import { FC, Fragment, ReactNode, useCallback, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import ProductSection from "@/pages-sections/shop/ProductSection";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import FilterSection from "@/pages-sections/shop/FilterSection";
import Sidenav from "@/components/Sidenav";

type ShopRootLayoutProp = {
  children: ReactNode;
};

const sortOptions = [
  { name: "Newest", href: "newest", current: false },
  { name: "Price: Low to High", href: "low", current: false },
  { name: "Price: High to Low", href: "high", current: false },
];
const categories = [
  { name: "Men", href: "Men" },
  { name: "Women", href: "Women" },
  { name: "Unisex", href: "Unisex" },
];
const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "S", label: "S", checked: false },
      { value: "M", label: "M", checked: false },
      { value: "L", label: "L", checked: false },
      { value: "XL", label: "XL", checked: false },
      { value: "XXL", label: "XXL", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ShopRootLayout: FC<ShopRootLayoutProp> = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
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

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200  pt-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {children}
          </h1>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
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
                              "block px-4 py-2 text-sm",
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
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
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

            {/* Product grid */}
            <div className="lg:col-span-3">
              <ProductSection />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
export default ShopRootLayout;
