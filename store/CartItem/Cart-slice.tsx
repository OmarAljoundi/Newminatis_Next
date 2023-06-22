import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateCart } from "./ThunkAPI";
import ReactGA from "react-ga4";
import { CartState } from "@/types/TStore";
import { CartItem } from "../Model/CartItem";

const initialCartState: CartState = {
  CartItems: [],
};

const CartSlice = createSlice({
  name: "Cart",
  initialState: initialCartState,
  reducers: {
    addItem(
      state: CartState = initialCartState,
      action: PayloadAction<CartItem>
    ) {
      var old = state.CartItems.find((x) => x.sku == action.payload.sku);
      if (old) {
        state.CartItems.map((item) => {
          if (item.sku === action.payload.sku) {
            item.qty = action.payload.qty;
          }
        });
      } else {
        state.CartItems.push(action.payload);
      }

      var items: any[] = [];
      state.CartItems.map((i) => {
        items.push({
          item_id: i.sku,
          item_name: i.name,
          price: i.price,
          quantity: i.qty,
        });
      });

      if (process.env.NODE_ENV !== "development") {
        ReactGA.event("add_to_cart", {
          currency: "USD",
          value: action.payload.price,
          items: items,
        });
      }
    },

    updateItem(
      state: CartState = initialCartState,
      action: PayloadAction<CartItem>
    ) {
      state.CartItems.map((item) => {
        if (item.sku === action.payload.sku) {
          item.qty = action.payload.qty;
        }
      });
    },
    updateStock(
      state: CartState = initialCartState,
      action: PayloadAction<CartItem>
    ) {
      state.CartItems.map((item) => {
        if (item.sku === action.payload.sku) {
          item.stock = action.payload.stock;
        }
      });
    },

    removeItem(
      state: CartState = initialCartState,
      action: PayloadAction<CartItem>
    ) {
      state.CartItems = state.CartItems.filter(
        (x) => x.sku !== action.payload.sku
      );
    },
    clearCart(state: CartState = initialCartState) {
      state.CartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateCart.fulfilled, (state, action) => {
      var CartI: CartItem[] = [];
      //@ts-ignore
      state.CartItems.map((i) => {
        var remoteObj = action.payload.find((x) => x.id == i.id);
        if (
          (i.id == remoteObj?.id && i["price"] != remoteObj["price"]) ||
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
export default CartSlice;
