import { FC, useState, useEffect } from "react";
import { Box, Drawer, Fade, styled } from "@mui/material";
import Cookies from "js-cookie";
import { layoutConstant } from "@/utils/constants";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { calcualteQty } from "@/helpers/Extensions";
import { ResetUser } from "@/store/Auth/Auth-action";
import MiniCart from "../mini-cart/MiniCart";
import { Fragment } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  HeartIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { navigation } from "@/utils/navigations";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Currency from "./Currency";
import { FeaturedProducts } from "./FeaturedProducts";
import { CategorySections } from "./CategorySections";
import MiniWishList from "../mini-cart/MiniWishList";

export const HeaderWrapper = styled(Box)(({ theme }) => ({
  zIndex: 3,
  position: "relative",
  height: layoutConstant.headerHeight,
  transition: "height 250ms ease-in-out",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    height: layoutConstant.mobileHeaderHeight,
  },
}));

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Header = () => {
  const { data: session, status } = useSession();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const route = useRouter();
  const cartItems = useAppSelector((state) =>
    calcualteQty(state.Store?.CartReducer?.CartItems || [])
  );

  const wishListLength = useAppSelector(
    (state) => state.Store.WishlistReducer?.wishlistItems.length
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [wishList, setWishList] = useState(false);
  const auth = useAppSelector((x) => x.Store.AuthReducer.Auth);
  const toggleSidenav = () => setSidenavOpen(!sidenavOpen);
  const dispatch = useAppDispatch();
  const toggleWishList = () => setWishList(!wishList);

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("Session");
    Cookies.remove("GUEST_EMAIL");
    dispatch(ResetUser());
    //enqueueSnackbar('Logged out successfully')
  };

  useEffect(() => {
    if (status == "unauthenticated") {
      Cookies.remove("token");
    } else if (status == "authenticated") {
      Cookies.set("token", session.user?.access_token);
      if (pathname?.includes("auth")) {
        route.push(searchParams?.get("_nextUrl") ?? "/");
      }
    }
  }, [session]);

  return (
    <div className="bg-white ">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-gray-600 text-gray-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-6"
                      >
                        <CategorySections sections={category.sections} />
                        <FeaturedProducts featured={category.featured} />
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </a>
                  </div>
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create account
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-1 py-3">
                  <Currency />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-0lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center px-2 md:px-4">
              <div className="w-1/4 lg:w-auto">
                <button
                  type="button"
                  className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="ml-0 md:ml-4 flex lg:ml-0  w-1/2 justify-center lg:w-auto">
                <Link href="/">
                  <span className="sr-only">Newminatis</span>
                  <Image
                    width={70}
                    height={60}
                    src="/assets/images/logos/newminatis-LOGO-black.png"
                    alt="Newminatis"
                    priority={true}
                    quality={90}
                  />
                </Link>
              </div>
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "title relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>
                          <Fade in={open} exit={!open} unmountOnExit>
                            <div>
                              <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                <div
                                  className="absolute inset-0 top-1/2 bg-white shadow"
                                  aria-hidden="true"
                                />

                                <div className="relative bg-white">
                                  <div className="mx-auto max-w-7xl px-8">
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-6">
                                      <FeaturedProducts
                                        featured={category.featured}
                                      />
                                      <CategorySections
                                        sections={category.sections}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </Popover.Panel>
                            </div>
                          </Fade>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      href={page.href}
                      className="title flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center w-1/4  lg:w-auto justify-end">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {status === "authenticated" ? (
                    <span className="title">
                      Welcome back, {session.user.email}
                    </span>
                  ) : (
                    <Link
                      href="/auth/login"
                      className="title text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign in
                    </Link>
                  )}
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  {status === "authenticated" ? (
                    <span onClick={() => signOut()}>Sign out</span>
                  ) : (
                    <Link
                      href="/auth/register"
                      className="title text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Create account
                    </Link>
                  )}
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <span className="sr-only">, change currency</span>
                  <Currency />
                </div>

                {/* Wishlist */}
                <div className="flex lg:ml-6">
                  <button
                    className="group -m-2 flex items-center p-2"
                    onClick={toggleWishList}
                  >
                    <HeartIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {wishListLength}
                    </span>
                    <span className="sr-only">Wishlist</span>
                  </button>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <button
                    className="group -m-2 flex items-center p-2"
                    onClick={toggleSidenav}
                  >
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cartItems}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <MiniCart open={sidenavOpen} toggleSidenav={toggleSidenav} />
      <MiniWishList toggleSidenav={toggleWishList} open={wishList} />
    </div>
  );
};

export default Header;
