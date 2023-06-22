import { IUserResponse } from "@/interface/IUserResponse";
import { http } from "./httpService";
import axios from "axios";
import { TUser } from "@/types/TUser";
import { TUserRegisterRequest } from "@/types/TUserRegisterRequest";
import { TUserAddress } from "@/types/TUserAddress";
import { IBaseResponse } from "@/interface/IBaseResponse";
import { IUserOrderResponse } from "@/interface/IUserOrderResponse";
import { TResetPasswordRequest } from "@/types/TResetPasswordRequest";
import { TUserGuest } from "@/types/TUserGuest";

class UserService {
  register(data: TUserRegisterRequest) {
    return http(axios.create()).post<IUserResponse>(`/User/Register`, data);
  }

  authByEmail(data: TUser) {
    return http(axios.create()).post<IUserResponse>(`/User/AuthByEmail`, data);
  }

  addAddress(data: TUserAddress) {
    return http(axios.create()).post<IUserResponse>(`/User/UserAddress`, data);
  }
  deleteAddress(id: number) {
    return http(axios.create()).delete<IBaseResponse>(
      `/User/UserAddress/${id}`
    );
  }

  authByThirdParty(data: TUser) {
    return http(axios.create()).post<IUserResponse>(
      `/User/AuthByThirdParty`,
      data
    );
  }
  getUserOrders() {
    return http(axios.create()).get<IUserOrderResponse>(`/User/UserOrders`);
  }

  resetPasswordRequest(email: string) {
    return http(axios.create()).get<IUserResponse>(
      `/User/ResetPassword/${email}`
    );
  }
  ResetPasswordCodeCheck(req: TResetPasswordRequest) {
    return http(axios.create()).post<IUserResponse>(
      `/User/ResetPasswordCodeCheck`,
      req
    );
  }
  ResetPassword(req: TResetPasswordRequest) {
    return http(axios.create()).post<IUserResponse>(`/User/ResetPassword`, req);
  }
  IsUserAlive() {
    return http(axios.create()).get<IUserResponse>(`/User/IsUserStillAlive`);
  }

  createGuest(data: TUserGuest) {
    return http(axios.create()).post<IUserResponse>(`/User/CreateGuest`, data);
  }

  getGuest(data: string) {
    const uri = `/User/GetGuest/${data}`;
    return http(axios.create()).get<IUserResponse>(uri);
  }
}

export default new UserService();
