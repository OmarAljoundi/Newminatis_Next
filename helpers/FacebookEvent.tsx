import { TUser } from "@/types/TUser";
import { removeDuplicates } from "./Extensions";
import Cookies from "js-cookie";
import { TUserGuest } from "@/types/TUserGuest";
import { TUserAddress } from "@/types/TUserAddress";

export const AddToCartEvent = "AddToCart";
export const AddToWishlistEvent = "AddToWishlist";
export const PurchaseEvent = "Purchase";
export const InitiateCheckoutEvent = "InitiateCheckout";
export const ViewContentEvent = "ViewContent";

export interface FacebookEventModel {
  data: EventType[];
}

export interface EventType {
  event_name: string;
  event_id?: string | null;
  event_time?: number | null;
  event_source_url: string;
  user_data?: UserData;
  custom_data?: CustomData;
}

export interface UserData {
  em?: string[] | null;
  ph?: string[] | null;
  country?: string[] | null;
  fbc?: string | null;
  fbp?: string | null;
  fn?: string[] | null;
  ln?: string[] | null;
  zp?: string[] | null;
  ct?: string[] | null;
}

export interface CustomData {
  currency: string;
  value: string;
  content_category: string | null;
  contents: any;
}

export const grapUserData = (
  AuthAddress?: TUserAddress | null,
  guestAddress?: TUserGuest,
  EmailAddress?: string | null
): UserData => {
  var emailList: string[] = [];
  var phoneNumberList: string[] = [];
  var countriesList: string[] = [];
  var citiesList: string[] = [];
  var zipCodeList: string[] = [];
  var fnList: string[] = [];
  var lnList: string[] = [];
  if (EmailAddress) {
    emailList.push(EmailAddress);
  }

  if (AuthAddress) {
    phoneNumberList.push(AuthAddress.phoneNumber);
    countriesList.push(AuthAddress.country);
    citiesList.push(AuthAddress.city);
    zipCodeList.push(AuthAddress.postalCode);
    fnList.push(AuthAddress.firstName);
    lnList.push(AuthAddress.lastName);
  } else if (guestAddress) {
    emailList.push(guestAddress.email!);
    phoneNumberList.push(guestAddress.phoneNumber!);
    countriesList.push(guestAddress.country!);
    citiesList.push(guestAddress.city!);
    zipCodeList.push(guestAddress.postalCode! as unknown as string);
    fnList.push(guestAddress.firstName!);
    lnList.push(guestAddress.lastName!);
  }

  return {
    country: countriesList,
    em: emailList,
    fbc: Cookies.get("_fbc") ?? null,
    fbp: Cookies.get("_fbp") ?? null,
    fn: fnList,
    ln: lnList,
    ph: phoneNumberList,
    ct: citiesList,
    zp: zipCodeList,
  };
};
