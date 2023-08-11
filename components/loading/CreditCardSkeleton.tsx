"use client";

import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";

import { FlexBox } from "../flex-box";

export const CreditCardSkeleton = () => {
  return (
    <div>
      <FlexBox justifyContent={"space-between"} columnGap={"10px"}>
        <Skeleton width="50%" height={"70px"}>
          <TextField />
        </Skeleton>
        <Skeleton width="25%" height={"70px"}>
          <TextField />
        </Skeleton>
        <Skeleton width="25%" height={"70px"}>
          <TextField />
        </Skeleton>
      </FlexBox>
      <Skeleton width="100%" height={"70px"}>
        <TextField />
      </Skeleton>

      <Skeleton width="100%" height={"70px"}>
        <TextField />
      </Skeleton>
    </div>
  );
};
