import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import ContentSlice from "./content-slice";
import { TContent } from "@/types/TUsefulLinks";

export const contentAction = ContentSlice.actions;

export const setContent = (
  Item: TContent
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(contentAction.SetContent(Item));
  };
};
