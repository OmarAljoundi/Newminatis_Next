import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import authSlice from "./Auth-slice";
import { TUser } from "@/types/TUser";
import { TUserAddress } from "@/types/TUserAddress";
import { TPaymentMethodModel } from "@/types/TUserPayment";

export const authAction = authSlice.actions;

export const SetUser = (
  Item: TUser
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(authAction.setUser(Item));
  };
};

export const ResetUser = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return (dispatch, getState) => {
    dispatch(authAction.resetUser());
  };
};

export const AddUserAddress = (
  Item: TUserAddress
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(authAction.addUserAddress(Item));
  };
};

export const DeleteUserAddress = (
  item: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(authAction.deleteUserAddress(item));
  };
};

export const UpdateUserAddress = (
  item: TUserAddress
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(authAction.updateUserAddress(item));
  };
};

export const SetUserPayment = (
  item: TPaymentMethodModel[]
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(authAction.SetUserPayment(item));
  };
};

export const AddUserPayment = (
  item: TPaymentMethodModel
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(authAction.addUserPayment(item));
  };
};

export const DeleteUserPayment = (
  item: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(authAction.deleteUserPayment(item));
  };
};

export const SelectUserAddress = (
  item: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(authAction.selectUserAddress(item));
  };
};
