import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateWishlist } from "./ThunkAPI";
import { WishlistState } from "@/types/TStore";
import { TProduct } from "@/types/TProduct";

const initialWishlistState: WishlistState = {
  wishlistItems: [],
};

const WishlistSlice = createSlice({
  name: "Wishlist",
  initialState: initialWishlistState,
  reducers: {
    addItem(
      state: WishlistState = initialWishlistState,
      action: PayloadAction<TProduct>
    ) {
      if (state.wishlistItems.find((x) => x.id == action.payload.id)) {
        state.wishlistItems = state.wishlistItems.filter(
          (x) => x.id != action.payload.id
        );
      } else {
        state.wishlistItems.push(action.payload);
      }
    },

    removeItem(
      state: WishlistState = initialWishlistState,
      action: PayloadAction<TProduct>
    ) {
      state.wishlistItems = state.wishlistItems.filter(
        (x) => x.sku !== action.payload.sku
      );
    },
    clearCart(state: WishlistState = initialWishlistState) {
      state.wishlistItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateWishlist.fulfilled, (state, action) => {
      state?.wishlistItems.map((i) => {
        var remoteObj = action.payload.find((x) => x.id == i.id);
        if (
          (i.id == remoteObj?.id &&
            //@ts-ignore
            i["price"] != remoteObj["price"]) ||
          //@ts-ignore
          i["salePrice"] != remoteObj["salePrice"]
        ) {
          //@ts-ignore
          i["price"] = remoteObj["price"];
          //@ts-ignore
          i["salePrice"] = remoteObj["salePrice"];
        }
      });
    });
  },
});
export default WishlistSlice;
