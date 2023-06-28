import { FC, Fragment, useEffect } from "react";
import { Avatar, Box, Button, Chip, IconButton, styled } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { AddItemWish, RemoveItemWish } from "@/store/Wishlist/Wishlist-action";
import { updateWishlist } from "@/store/Wishlist/ThunkAPI";
import { FlexBetween, FlexBox } from "../flex-box";
import { TProduct } from "@/types/TProduct";
import Link from "next/link";
import { H5 } from "../Typography";
import { calculateDiscountAsNumber, currency } from "@/lib";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// =========================================================
type MiniWishListProps = { toggleSidenav: () => void; open: boolean };
// =========================================================

const StyledChip = styled(Chip)(() => ({
  zIndex: 1,
  bottom: "2px",
  right: "10px",
  paddingLeft: 3,
  paddingRight: 3,
  fontSize: "17px",
  height: "24px",
}));
const MiniWishList: FC<MiniWishListProps> = ({ toggleSidenav, open }) => {
  const wishlistList = useAppSelector(
    (state) => state.Store.WishlistReducer?.wishlistItems
  );
  const _setting = useAppSelector((x) => x.Store.SettingReducer.setting);
  const dispatch = useAppDispatch();
  const handleCartAmountChange = (
    product: TProduct,
    type: "Remove" | "Add"
  ) => {
    if (type == "Add") {
      dispatch(AddItemWish(product));
    } else {
      dispatch(RemoveItemWish(product));
    }
  };

  useEffect(() => {
    dispatch(updateWishlist(wishlistList || []));
  }, []);

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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity " />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="-translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="-translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          WishList Items
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
                            {wishlistList?.map((item) => (
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
                                    onClick={() =>
                                      handleCartAmountChange(item, "Remove")
                                    }
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
                                  ></Box>

                                  <Button
                                    color="secondary"
                                    variant="outlined"
                                    onClick={() =>
                                      handleCartAmountChange(item, "Remove")
                                    }
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
                                    src={item.mainImage || ""}
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
                                      {item.name}
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

                                  <Box
                                    fontWeight={600}
                                    fontSize="14px"
                                    color="primary.main"
                                    mt={0.5}
                                  >
                                    {currency(
                                      calculateDiscountAsNumber(item.price, 0),
                                      _setting
                                    )}
                                  </Box>
                                </Box>

                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    handleCartAmountChange(item, "Remove")
                                  }
                                  sx={{ marginLeft: 2.5 }}
                                >
                                  <DeleteOutlineIcon fontSize="medium" />
                                </IconButton>
                              </FlexBox>
                            ))}
                          </ul>
                        </div>
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

export default MiniWishList;

