import { Box, Card, Grid, Skeleton, Theme, useMediaQuery } from "@mui/material";
import { FC } from "react";
import { FlexBox } from "../flex-box";

type Prop = {
  loop?: number;
};
export const ProductCardLoading: FC<Prop> = ({ loop }) => {
  const downSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  return (
    <>
      {loop ? (
        <Grid container spacing={1}>
          {Array.from(new Array(loop)).map((i) => (
            <Grid item lg={4} sm={6} xs={6} key={i}>
              <Card
                sx={{
                  backgroundColor: "rgba(200,200,200,0.5)",
                  borderRadius: "0",
                  padding: "0!important",
                }}
                elevation={6}
              >
                <Skeleton
                  variant="rectangular"
                  className="aspect-[1/1.5]"
                  sx={{
                    borderRadius: "0",
                    width: "100%",
                    height: "100%",
                    minHeight: "100%",
                  }}
                />
                <Box p={1}>
                  <FlexBox justifyContent={"space-between"}>
                    <Skeleton
                      width="45%"
                      height={20}
                      sx={{ bgcolor: "#c1c1c1", borderRadius: "0" }}
                    />
                    <Skeleton
                      width="45%"
                      height={20}
                      sx={{ bgcolor: "#c1c1c1", borderRadius: "0" }}
                    />
                  </FlexBox>
                  <FlexBox justifyContent={"flex-start"} columnGap={1} my={2}>
                    <Skeleton
                      variant="rectangular"
                      width="30px"
                      height={"30px"}
                      sx={{
                        bgcolor: "#c1c1c1",
                        borderRadius: "0",
                      }}
                    />
                    <Skeleton
                      variant="rectangular"
                      width="30px"
                      height={"30px"}
                      sx={{
                        bgcolor: "#c1c1c1",
                        borderRadius: "0",
                      }}
                    />
                    <Skeleton
                      variant="rectangular"
                      width="30px"
                      height={"30px"}
                      sx={{
                        bgcolor: "#c1c1c1",
                        borderRadius: "0",
                      }}
                    />
                  </FlexBox>
                  <Skeleton
                    width="75%"
                    height={40}
                    sx={{
                      margin: "10px auto",
                      bgcolor: "#c1c1c1",
                      borderRadius: "0",
                    }}
                  />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card
          sx={{
            backgroundColor: "rgba(30,30,30,0.5)",
            borderRadius: "4px",
          }}
          elevation={6}
        >
          <Skeleton
            variant="rectangular"
            height={downSm ? 357 : 440}
            sx={{
              borderRadius: "4px",

              minHeight: "100%",
            }}
          />
          <Box p={1}>
            <FlexBox justifyContent={"space-between"}>
              <Skeleton width="45%" height={20} sx={{ bgcolor: "#c1c1c1" }} />
              <Skeleton width="45%" height={20} sx={{ bgcolor: "#c1c1c1" }} />
            </FlexBox>
            <FlexBox justifyContent={"flex-start"} columnGap={1} my={2}>
              <Skeleton
                variant="rectangular"
                width="30px"
                height={"30px"}
                sx={{ bgcolor: "#c1c1c1", borderRadius: "8px" }}
              />
              <Skeleton
                variant="rectangular"
                width="30px"
                height={"30px"}
                sx={{ bgcolor: "#c1c1c1", borderRadius: "8px" }}
              />
              <Skeleton
                variant="rectangular"
                width="30px"
                height={"30px"}
                sx={{ bgcolor: "#c1c1c1", borderRadius: "8px" }}
              />
            </FlexBox>
            <Skeleton
              width="75%"
              height={40}
              sx={{ margin: "10px auto", bgcolor: "#c1c1c1" }}
            />
          </Box>
        </Card>
      )}
    </>
  );
};
