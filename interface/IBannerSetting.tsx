import { TBannerSetting } from "@/types/TBannerSetting";
import { IBaseResponse } from "./IBaseResponse";

export interface IBannerSetting extends IBaseResponse {
  bannerSetting: TBannerSetting;
  bannersSetting: TBannerSetting[];
}
