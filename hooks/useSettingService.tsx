import SettingService from "@/service/SettingService";
import { useState } from "react";

const useSettingService = () => {
  const [settingLoader, setSettingLoader] = useState(false);

  const onGetUserSetting = (currencyCode?: string) => {
    setSettingLoader(true);
    return new Promise((resolve, reject) => {
      SettingService.getUserSetting(currencyCode)
        .then((res) => {
          setSettingLoader(false);
          resolve(res);
        })
        .catch((err) => {
          setSettingLoader(false);
          reject(err);
        });
    });
  };

  const onReadJson = () => {
    setSettingLoader(true);

    return new Promise((resolve, reject) => {
      SettingService.readJson()
        .then((res) => {
          setSettingLoader(false);
          resolve(res.data);
        })
        .catch((err) => {
          setSettingLoader(false);
          reject(err);
        });
    });
  };

  return {
    onGetUserSetting,
    settingLoader,
    onReadJson,
  };
};

export default useSettingService;
