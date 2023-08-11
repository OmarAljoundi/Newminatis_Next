import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import useSettingService from "@/hooks/useSettingService";
import { SetSetting } from "@/store/Setting/Setting-action";
import { TSetting } from "@/types/TSetting";
import { currencyList } from "@/utils/constants";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { AxiosResponse } from "axios";
import React from "react";
import { Span } from "../Typography";

export default function Currency() {
  const currentCurrency = useAppSelector(
    (x) => x.Store.SettingReducer.setting?.currencyCode
  );
  const dispatch = useAppDispatch();
  const { onGetUserSetting, settingLoader } = useSettingService();
  const handleCurrencyClick = async (item: any) => {
    var result = (await onGetUserSetting(item)) as AxiosResponse<any>;

    if (result.status == 200) {
      var object: TSetting = result.data as TSetting;
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
    }
  };
  return (
    <TextField
      select
      value={currentCurrency ?? "USD"}
      SelectProps={{
        sx: {
          width: "80px",
        },
        MenuProps: {
          MenuListProps: {
            sx: {
              background: "white",
              color: "black",
              padding: "0",
              li: {
                padding: "5px 10px",
                width: "80px",
                minHeight: "25px",
                height: "25px",
              },
            },
          },
        },
      }}
      sx={{
        fieldset: {
          border: "none",
        },
      }}
    >
      {currencyList.map((item) => (
        <MenuItem
          key={item.title}
          value={item.title}
          onClick={() => handleCurrencyClick(item.title)}
          sx={{
            width: "150px",
            "& .MuiPaper-root": {
              background: "white",
            },
          }}
        >
          <Span className="menuTitle">{item.display}</Span>
        </MenuItem>
      ))}
    </TextField>
  );
}
