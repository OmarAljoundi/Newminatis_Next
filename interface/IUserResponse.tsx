import { TUserGuest } from "@/types/TUserGuest";
import { IBaseResponse } from "./IBaseResponse";
import { TUser } from "@/types/TUser";
import { TUserAddress } from "@/types/TUserAddress";

export interface IUserResponse extends IBaseResponse {
  user: TUser;
  users: TUser[];
  guest: TUserGuest;
  userAddress: TUserAddress;
  token: string;
  code: string;
}
