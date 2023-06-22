import { TUser } from "@/types/TUser";
import { removeDuplicates } from "./Extensions";
import Cookies from "js-cookie";
import { TUserGuest } from "@/types/TUserGuest";

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
  Auth?: TUser | null,
  userAddress?: TUserGuest
): UserData => {
  var emailList: string[] | null = null;
  var phoneNumberList: string[] | null = null;
  var countriesList: string[] | null = null;
  var citiesList: string[] | null = null;
  var zipCodeList: string[] | null = null;
  var fnList: string[] | null = null;
  var lnList: string[] | null = null;
  if (Auth) {
    //@ts-ignore
    emailList = Auth?.userAddress.map((i) => i.email);
    //@ts-ignore
    phoneNumberList = Auth?.userAddress.map((i) => i.phoneNumber);
    //@ts-ignore
    countriesList = Auth?.userAddress.map((i) => i.country);
    //@ts-ignore
    citiesList = Auth?.userAddress.map((i) => i.city);
    //@ts-ignore
    zipCodeList = Auth?.userAddress.map((i) => i.postalCode);
    //@ts-ignore
    fnList = Auth?.userAddress.map((i) => i.firstName);
    //@ts-ignore
    lnList = Auth?.userAddress.map((i) => i.lastName);
  } else if (userAddress) {
    //@ts-ignore
    phoneNumberList = [userAddress?.phoneNumber];
    //@ts-ignore
    countriesList = [userAddress?.country];
    //@ts-ignore
    citiesList = [userAddress?.city];
    //@ts-ignore
    zipCodeList = [userAddress?.postalCode?.toString()];
    //@ts-ignore
    fnList = [userAddress?.firstName];
    //@ts-ignore
    lnList = [userAddress?.lastName];
  }
  var email = Cookies.get("GUEST_EMAIL");
  if (email) {
    try {
      //@ts-ignore
      emailList.push(email);
    } catch (ex) {
      emailList = [];
      emailList.push(email);
    }
  }

  emailList = removeDuplicates(emailList);
  phoneNumberList = removeDuplicates(phoneNumberList);
  countriesList = removeDuplicates(countriesList);
  citiesList = removeDuplicates(citiesList);
  zipCodeList = removeDuplicates(zipCodeList);
  fnList = removeDuplicates(fnList);
  lnList = removeDuplicates(lnList);

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
