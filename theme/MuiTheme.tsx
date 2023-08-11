import { FC, ReactNode, useEffect } from "react";
import { merge } from "merge";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import customThemeOptions from "./themeOptions";
import { AxiosResponse } from "axios";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import useSettingService from "@/hooks/useSettingService";
import { TSetting } from "@/types/TSetting";
import { SetSetting } from "@/store/Setting/Setting-action";
import { IContentResponse } from "@/interface/IContentResponse";
import { setContent } from "@/store/Content/content-action";

// =======================================================
type MuiThemeProps = { children?: ReactNode };
// =======================================================
const MuiTheme: FC<MuiThemeProps> = ({ children }) => {
  const _setting = useAppSelector((x) => x.Store.SettingReducer.setting);
  const { onGetUserSetting, settingLoader, onReadJson } = useSettingService();
  const dispatch = useAppDispatch();
  const handleFetchUserSetting = async () => {
    const result = (await onGetUserSetting(
      _setting?.currencyCode
    )) as AxiosResponse<any>;
    if (result.status == 200) {
      const object: TSetting = result.data as TSetting;
      dispatch(
        SetSetting({
          setting: {
            currencyCode: object.currencyCode,
            rate: object.rate,
            onSale: object.onSale,
            country: object.country,
          },
        })
      );
    } else {
      if (_setting == null) {
        dispatch(
          SetSetting({
            setting: {
              currencyCode: "USD",
              rate: 1,
              onSale: false,
              country: "AE",
            },
          })
        );
      }
    }
  };

  const handleFetchContent = async () => {
    const result = (await onReadJson()) as IContentResponse;
    dispatch(setContent(result.content));
  };

  useEffect(() => {
    Promise.all([handleFetchContent(), handleFetchUserSetting()]).then();
  }, []);

  const themeOptions = customThemeOptions();
  let theme = createTheme(merge({}, { ...themeOptions, direction: "ltr" }));
  theme = responsiveFontSizes(theme);

  // theme shadows
  theme.shadows[1] = "0px 1px 3px rgba(3, 0, 71, 0.09)";
  theme.shadows[2] = "0px 4px 16px rgba(43, 52, 69, 0.1)";
  theme.shadows[3] = "0px 8px 45px rgba(3, 0, 71, 0.09)";
  theme.shadows[4] = "0px 0px 28px rgba(3, 0, 71, 0.01)";

  return (
    <ThemeProvider theme={theme}>
      {/* <LoadingBar ref={ref} color="red" /> */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiTheme;
