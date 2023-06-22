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
    <Grid container flexWrap="wrap-reverse" spacing={3}>
      <Grid item lg={8} md={8} xs={12}>
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
          <Skeleton width="100%">
            <Typography>.</Typography>
          </Skeleton>

          <Skeleton width="100%" height={"70px"}>
            <TextField />
          </Skeleton>
        </Card>
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        <Card elevation={5} role={"drawer"}>
          <FlexBox justifyContent={"space-between"}>
            <Skeleton width="40%">
              <TextField />
            </Skeleton>
            <Skeleton width="40%">
              <TextField />
            </Skeleton>
          </FlexBox>

          <FlexBox justifyContent={"space-between"}>
            <Skeleton width="40%">
              <TextField />
            </Skeleton>
            <Skeleton width="40%">
              <TextField />
            </Skeleton>
          </FlexBox>

          <FlexBox justifyContent={"space-between"}>
            <Skeleton width="40%">
              <TextField />
            </Skeleton>
            <Skeleton width="40%">
              <TextField />
            </Skeleton>
          </FlexBox>

          <FlexBox justifyContent={"space-between"}>
            <Skeleton width="40%">
              <TextField />
            </Skeleton>
            <Skeleton width="40%">
              <TextField />
            </Skeleton>
          </FlexBox>

          <Skeleton width="100%" height={"50px"}>
            <Button>Pay Now</Button>
          </Skeleton>
        </Card>
      </Grid>
    </Grid>
  );
};
