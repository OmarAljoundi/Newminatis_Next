import cartSlice from "./Cart-slice";
import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { CartItem } from "../Model/CartItem";

export const cartAction = cartSlice.actions;

export const AddItem = (
  Item: CartItem
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(cartAction.addItem(Item));
  };
};

export const UpdateItem = (
  Item: CartItem
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(cartAction.updateItem(Item));
  };
};

export const UpdateStock = (
  Item: CartItem
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(cartAction.updateStock(Item));
  };
};

export const RemoveItem = (
  Item: CartItem
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(cartAction.removeItem(Item));
  };
};

export const ClearCart = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return (dispatch, getState) => {
    dispatch(cartAction.clearCart());
  };
};
