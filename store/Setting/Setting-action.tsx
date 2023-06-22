import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import settingSlice from "./Setting-slice";
import { SettingState } from "@/types/TStore";

export const settingAction = settingSlice.actions;

export const SetSetting = (
  Item: SettingState
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(settingAction.setSetting(Item));
  };
};
