import { FC, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  styled,
  useTheme,
} from "@mui/material";
import { Add, Close, Remove, ShoppingBagOutlined } from "@mui/icons-material";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CartItem } from "@/store/Model/CartItem";
import { calculateDiscount, calculateDiscountAsNumber, currency } from "@/lib";
import { FlexBox } from "../flex-box";
import Link from "next/link";
import { H5, Span } from "../Typography";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateCart } from "@/store/CartItem/ThunkAPI";
import { AddItem, RemoveItem, UpdateItem } from "@/store/CartItem/Cart-action";
import { StyledChip } from "../product-card/StyledComponents";

// =========================================================
type MiniCartProps = { toggleSidenav: () => void; open: boolean };
// =========================================================

const MiniCart: FC<MiniCartProps> = ({ toggleSidenav, open }) => {
  const cartList = useAppSelector(
    (state) => state.Store.CartReducer?.CartItems
  );
  const _setting = useAppSelector((x) => x.Store.SettingReducer.setting);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateCart(cartList || []));
    var x = document.getElementsByClassName("hide");
    for (var i = 0; i < x.length; i++) {
      x[i].classList.add("opacity-0");
    }

    return () => {
      var x = document.getElementsByClassName("hide");
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("opacity-0");
      }
    };
  }, []);
  //const { enqueueSnackbar } = useSnackbar();
  const handleCartAmountChange =
    (amount: number, product: CartItem, type: "remove" | "add" | "update") =>
    () => {
      var cart: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        salePrice: product.salePrice,
        qty: amount,
        slug: product.slug,
        imgUrl: product.imgUrl,
        sku: product.sku,
        color: product.color,
        size: product.size,
        stock: product.stock,
      };
      if (amount > product.stock) {
        // enqueueSnackbar(
        //   `Only avaliable ${product.stock} pieces you can't add more`
        // );
        return;
      }
      if (type == "add") {
        dispatch(AddItem(cart));
      } else if (type == "update") {
        dispatch(UpdateItem(cart));
      } else {
        dispatch(RemoveItem(product));
      }
    };

  const getTotalPrice = () =>
    cartList?.reduce(
      (accum, item) =>
        accum +
        calculateDiscountAsNumber(item.price, item.salePrice) * item.qty,
      0
    );

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={toggleSidenav}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={toggleSidenav}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cartList?.map((item) => (
                              <FlexBox
                                py={2}
                                px={2.5}
                                key={item.id}
                                alignItems="center"
                                borderBottom={`1px solid gray`}
                              >
                                <FlexBox
                                  alignItems="center"
                                  flexDirection="column"
                                >
                                  <Button
                                    color="secondary"
                                    variant="outlined"
                                    onClick={handleCartAmountChange(
                                      item.qty + 1,
                                      item,
                                      "add"
                                    )}
                                    disabled={item.qty >= item.stock}
                                    sx={{
                                      height: "32px",
                                      width: "32px",
                                      borderRadius: "300px",
                                    }}
                                  >
                                    <Add fontSize="small" />
                                  </Button>

                                  <Box
                                    fontWeight={600}
                                    fontSize="15px"
                                    my="3px"
                                  >
                                    {item.qty}
                                  </Box>

                                  <Button
                                    color="secondary"
                                    variant="outlined"
                                    disabled={
                                      item.qty === 1 || item.stock === 0
                                    }
                                    onClick={handleCartAmountChange(
                                      item.qty - 1,
                                      item,
                                      "update"
                                    )}
                                    sx={{
                                      height: "32px",
                                      width: "32px",
                                      borderRadius: "300px",
                                    }}
                                  >
                                    <Remove fontSize="small" />
                                  </Button>
                                </FlexBox>

                                <Link
                                  href={`/product/${item.name.toLowerCase()}-${item.color?.toString()}`}
                                  onClick={toggleSidenav}
                                >
                                  <Avatar
                                    alt={item.name}
                                    src={item.imgUrl}
                                    sx={{ mx: 2, width: 76, height: 76 }}
                                  />
                                </Link>

                                <Box
                                  flex="1"
                                  sx={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                  position="relative"
                                >
                                  {!!item.salePrice && (
                                    <StyledChip
                                      color="secondary"
                                      size="small"
                                      label={`${item.salePrice}% off`}
                                    />
                                  )}
                                  <Link
                                    href={`/product/${item.name.toLowerCase()}-${item.color?.toString()}`}
                                    onClick={toggleSidenav}
                                  >
                                    <H5
                                      color={"black"}
                                      ellipsis
                                      fontSize="14px"
                                      className="title"
                                    >
                                      {item.name} ({item.size})
                                    </H5>
                                  </Link>

                                  {!!item.salePrice && (
                                    <Box color="grey.600">
                                      Original Price{" "}
                                      <del>
                                        {currency(item.price, _setting)}
                                      </del>
                                    </Box>
                                  )}

                                  <Span color="grey.600">
                                    {calculateDiscount(
                                      item.price,
                                      item.salePrice,
                                      _setting
                                    )}{" "}
                                    x {item.qty}
                                  </Span>

                                  <Box
                                    fontWeight={600}
                                    fontSize="14px"
                                    color="primary.main"
                                    mt={0.5}
                                  >
                                    {currency(
                                      calculateDiscountAsNumber(
                                        item.price,
                                        item.salePrice
                                      ) * item.qty,
                                      _setting
                                    )}
                                  </Box>
                                </Box>

                                <IconButton
                                  size="small"
                                  onClick={handleCartAmountChange(
                                    0,
                                    item,
                                    "remove"
                                  )}
                                  sx={{ marginLeft: 2.5 }}
                                >
                                  <Close fontSize="small" />
                                </IconButton>
                              </FlexBox>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>({currency(getTotalPrice() || 0, _setting)})</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link
                          onClick={toggleSidenav}
                          href="/checkout"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={toggleSidenav}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MiniCart;

// {
//   cartList?.length == 0 && (
//     <FlexBox
//       alignItems="center"
//       flexDirection="column"
//       justifyContent="center"
//       height="calc(100% - 74px)"
//     >
//       <img
//         width={90}
//         height={100}
//         alt="banner"
//         src="/assets/images/logos/shopping-bag.svg"
//       />
//       <Box
//         component="p"
//         mt={2}
//         color="grey.600"
//         textAlign="center"
//         maxWidth="200px"
//       >
//         Your shopping bag is empty. Start shopping
//       </Box>
//     </FlexBox>
//   );
// }
