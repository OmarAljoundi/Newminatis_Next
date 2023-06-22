import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import WishlistSlice from "./Wishlist-slice";
import { TProduct } from "@/types/TProduct";

export const wishlistAction = WishlistSlice.actions;

export const AddItemWish = (
  Item: TProduct
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(wishlistAction.addItem(Item));
  };
};

export const RemoveItemWish = (
  Item: TProduct
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(wishlistAction.removeItem(Item));
  };
};

export const ClearWish = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return (dispatch, getState) => {
    dispatch(wishlistAction.clearCart());
  };
};
