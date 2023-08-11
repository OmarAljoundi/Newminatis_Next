import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

export interface BazaarIconProps {}

const BazaarIcon: React.FC<BazaarIconProps> = () => {
  return (
    <SvgIcon htmlColor="primary" viewBox="0 0 24 24">
      <img src="/assets/images/icons/bag.svg" alt="" />
    </SvgIcon>
  );
};

export default BazaarIcon;
