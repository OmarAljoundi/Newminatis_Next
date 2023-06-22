import { IBannerSetting } from "@/interface/IBannerSetting";
import { http, httpFormData } from "./httpService";
import axios from "axios";
import { InstgramResponse } from "@/interface/InstgramResponse";
import { IContentResponse } from "@/interface/IContentResponse";

class SettingService {
  getBannerSetting() {
    return http(axios.create()).get<IBannerSetting>(`/Setting/Banner`);
  }

  postBannerSetting(data: FormData) {
    return httpFormData(axios.create()).post<IBannerSetting>(
      `/Setting/Banner`,
      data
    );
  }

  getInstgramFeed() {
    return httpFormData(axios.create()).get<InstgramResponse>(
      `/External/InstagramFeed`
    );
  }

  getUserSetting(currecnyCode?: string | null) {
    if (currecnyCode) {
      return http(axios.create()).get<any>(
        `/Setting/UserSettings?CurrencyCode=${currecnyCode}`
      );
    }

    return http(axios.create()).get<any>("/Setting/UserSettings");
  }
  readJson() {
    return http(axios.create()).get<IContentResponse>(`/Setting/Read`);
  }
}

export default new SettingService();
