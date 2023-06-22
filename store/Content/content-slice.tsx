import { ContentState } from "@/types/TStore";
import { TContent } from "@/types/TUsefulLinks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialContentState: ContentState = {
  Content: null,
};

const ContentSlice = createSlice({
  name: "Content",
  initialState: initialContentState,
  reducers: {
    SetContent(
      state: ContentState = initialContentState,
      action: PayloadAction<TContent>
    ) {
      state.Content = action.payload;
    },
  },
});
export default ContentSlice;
