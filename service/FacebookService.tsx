import axios from "axios";
import { http } from "./httpService";
import { FacebookEventModel } from "@/helpers/FacebookEvent";

class FacebookService {
  pushEvent(data: FacebookEventModel) {
    return http(axios.create()).post<FacebookEventModel>(
      `/Analytics/PushFBEvent`,
      data
    );
  }
}

export default new FacebookService();
