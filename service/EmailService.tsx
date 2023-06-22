import { IBaseResponse } from "@/interface/IBaseResponse";
import { http } from "./httpService";
import axios from "axios";

class EmailService {
  postEmail(email: string) {
    return http(axios.create()).put<IBaseResponse>(`/Email/${email}`);
  }
}

export default new EmailService();
