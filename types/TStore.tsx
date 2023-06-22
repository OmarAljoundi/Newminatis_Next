import { CartItem } from "@/store/Model/CartItem";
import { TProduct } from "./TProduct";
import { TSetting } from "./TSetting";
import { TContent } from "./TUsefulLinks";
import { TUser } from "./TUser";

export type CartState = {
  CartItems: CartItem[];
};

export type CartAction = {
  type: string;
  cartItems: CartItem[];
};

export type WishlistState = {
  wishlistItems: TProduct[];
};
export type WishlistAction = {
  type: string;
  wishlistItems: TProduct[];
};

export type SettingState = {
  setting: TSetting | null;
};

export type SettingAction = {
  type: string;
  setting: TSetting;
};

export type DispatchTypeCart = (args: CartAction) => CartAction;

export type AuthState = {
  Auth: TUser | null;
};

export type AuthAction = {
  type: string;
  Auth: TUser;
};

export type ContentState = {
  Content: TContent | null;
};

export type ContentAction = {
  type: string;
  Content: TContent;
};
