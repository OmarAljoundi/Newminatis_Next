import {
  Button,
  Card,
  Grid,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { FlexBox } from "../flex-box";

export const CreditCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-2">
      <div>
        <Card elevation={5} role={"drawer"}>
          {Array.from(new Array(2)).map((i) => (
            <div className="flex mt-2 gap-x-3">
              <Skeleton width="60px" height={"60px"} variant="rounded">
                <TextField />
              </Skeleton>
              <div className="grid w-full content-center h-fit">
                <Skeleton width="100%" height={"10px"}>
                  <TextField />
                </Skeleton>
                <Skeleton width="80%" height={"10px"}>
                  <TextField />
                </Skeleton>
                <Skeleton width="60%" height={"10px"}>
                  <TextField />
                </Skeleton>
                <Skeleton width="40%" height={"10px"}>
                  <TextField />
                </Skeleton>
              </div>
            </div>
          ))}

          <div className="my-4 grid gap-y-1">
            {Array.from(new Array(6)).map((i) => (
              <div className="flex justify-between">
                <Skeleton width="40%" height={"20px"}>
                  <TextField />
                </Skeleton>
                <Skeleton width="40%" height={"20px"}>
                  <TextField />
                </Skeleton>
              </div>
            ))}
          </div>

          <Skeleton width="100%" height={"50px"}>
            <Button>Pay Now</Button>
          </Skeleton>
        </Card>
      </div>
      <div className="col-span-1 lg:col-span-2">
        <Card elevation={5} role={"drawer"}>
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
        </Card>
      </div>
    </div>
  );
};
