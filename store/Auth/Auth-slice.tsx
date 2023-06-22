import { AuthState } from "@/types/TStore";
import { TUser } from "@/types/TUser";
import { TUserAddress } from "@/types/TUserAddress";
import { TPaymentMethodModel } from "@/types/TUserPayment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialAuthState: AuthState = {
  Auth: null,
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState: initialAuthState,
  reducers: {
    setUser(state: AuthState = initialAuthState, action: PayloadAction<TUser>) {
      var SelectedAddress =
        state.Auth && state.Auth?.selectedAddress
          ? state.Auth.selectedAddress
          : 0;
      state.Auth = action.payload;
      state.Auth.userAddress = action.payload?.userAddress?.filter(
        (x) => x.active == true
      );
      //@ts-ignore
      if (state.Auth.userAddress.length > SelectedAddress) {
        state.Auth.selectedAddress = SelectedAddress;
      } else {
        state.Auth.selectedAddress = 0;
      }
    },

    resetUser(state: AuthState = initialAuthState) {
      state.Auth = null;
    },
    addUserAddress(
      state: AuthState = initialAuthState,
      action: PayloadAction<TUserAddress>
    ) {
      if (state.Auth?.userAddress) {
        state.Auth?.userAddress.push(action.payload);
        state.Auth.selectedAddress = state.Auth.userAddress.indexOf(
          action.payload
        );
      } else {
        var useAddress: TUserAddress[] = [];
        useAddress.push(action.payload);
        //@ts-ignore
        state.Auth.userAddress = useAddress;
        //@ts-ignore
        state.Auth.selectedAddress = 0;
      }
    },
    deleteUserAddress(
      state: AuthState = initialAuthState,
      action: PayloadAction<number>
    ) {
      //@ts-ignore
      state.Auth.userAddress = state.Auth.userAddress.filter(
        (x) => x.id != action.payload
      );
      //@ts-ignore
      if (state.Auth.userAddress.length == 0) {
        //@ts-ignore
        state.Auth.userAddress = [];
        //@ts-ignore
        state.Auth.selectedAddress = null;
      } else {
        //@ts-ignore
        state.Auth.selectedAddress = 0;
      }
    },
    updateUserAddress(
      state: AuthState = initialAuthState,
      action: PayloadAction<TUserAddress>
    ) {
      var ind = 0;
      //@ts-ignore
      state.Auth.userAddress.map((item, index) => {
        if (item.id === action.payload.id) {
          ind = index;
          return;
        }
      });
      //@ts-ignore
      state.Auth.userAddress[ind] = action.payload;
    },
    selectUserAddress(
      state: AuthState = initialAuthState,
      action: PayloadAction<number>
    ) {
      //@ts-ignore
      state.Auth.selectedAddress = action.payload;
    },
    addUserPayment(
      state: AuthState = initialAuthState,
      action: PayloadAction<TPaymentMethodModel>
    ) {
      //@ts-ignore
      if (state.Auth.userPayment && state.Auth.userPayment.length > 0) {
        //@ts-ignore
        state.Auth.userPayment.push(action.payload);
      }
    },
    deleteUserPayment(
      state: AuthState = initialAuthState,
      action: PayloadAction<string>
    ) {
      //@ts-ignore
      state.Auth.userPayment = state.Auth.userPayment.filter(
        (x) => x.id != action.payload
      );
      //@ts-ignore
      if (state.Auth.userAddress.length == 0) {
        //@ts-ignore
        state.Auth.userAddress = null;
      }
    },
    SetUserPayment(
      state: AuthState = initialAuthState,
      action: PayloadAction<TPaymentMethodModel[]>
    ) {
      //@ts-ignore
      state.Auth.userPayment = [];
      //@ts-ignore
      state.Auth.userPayment = action.payload;
    },
  },
});
export default AuthSlice;
