import { SettingState } from "@/types/TStore";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialSettingState: SettingState = {
  setting: null,
};

const SettingSlice = createSlice({
  name: "Setting",
  initialState: initialSettingState,
  reducers: {
    setSetting(
      state: SettingState = initialSettingState,
      action: PayloadAction<SettingState>
    ) {
      state.setting = action.payload.setting;
    },
  },
});
export default SettingSlice;
