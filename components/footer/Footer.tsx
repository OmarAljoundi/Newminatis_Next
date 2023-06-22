import { FC, useState } from "react";

import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
} from "@mui/material";
import FiberSmartRecordIcon from "@mui/icons-material/FiberSmartRecord";
import { AxiosResponse } from "axios";
import EmailService from "@/service/EmailService";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { IBaseResponse } from "@/interface/IBaseResponse";
import useSettingService from "@/hooks/useSettingService";
import { TSetting } from "@/types/TSetting";
import { SetSetting } from "@/store/Setting/Setting-action";
import { H3, H6, Span } from "../Typography";
import { isHTMLString } from "@/helpers/Extensions";
import Link from "next/link";
import { SocialMediaIcons } from "../SocialMediaIcons";
import LoadingButton from "@mui/lab/LoadingButton";
const styles = {
  boxContainer: {
    background: "black",
    //backgroundImage: `url(${require('../../images/footer.jpg')})`,
  },
};

const Footer: FC = () => {
  const our_story_content = useAppSelector(
    (x) => x.Store.ContentReducer.Content?.ourStory
  );

  const currentCurrency = useAppSelector(
    (x) => x.Store.SettingReducer.setting?.currencyCode
  );

  const [email, setEmail] = useState("");
  // const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false);
  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const result = (await EmailService.postEmail(
      email
    )) as AxiosResponse<IBaseResponse>;
    if (result.data.success) {
      // enqueueSnackbar(
      //     'Congratulation! You have successfully subscribed to our newsletter'
      // )
      window.scroll({
        behavior: "smooth",
        left: 0,
        top: 0,
      });
      setEmail("");
    } else {
      //enqueueSnackbar('You have already subscribed to our newsletter')
    }
    setLoading(false);
  };
  const handleChange = (e: any) => {
    setEmail(e.target.value);
  };

  const isValidEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
    <footer style={{ position: "relative" }}>
      <Box sx={styles.boxContainer}>
        <Container sx={{ p: "1rem", color: "white" }}>
          <Box overflow="hidden">
            <Grid container spacing={1}>
              <Grid
                item
                lg={3}
                md={6}
                sm={6}
                xs={12}
                paddingRight={{
                  xs: "24px!important",
                  sm: "24px!important",
                }}
              >
                <H3>Our Mission</H3>

                {isHTMLString(our_story_content?.ourMission || "") ? (
                  <H6
                    mb={2.5}
                    dangerouslySetInnerHTML={{
                      __html: our_story_content?.ourMission || "",
                    }}
                  />
                ) : (
                  <H6
                    mb={2.5}
                    pt={"8px"}
                    display={"block"}
                    color="grey.500"
                    sx={{
                      whiteSpace: "break-spaces",
                    }}
                    className="title-sub-font"
                  >
                    {our_story_content?.ourMission}
                  </H6>
                )}

                <H3>Our Vision</H3>
                {isHTMLString(our_story_content?.ourVision || "") ? (
                  <H6
                    mb={2.5}
                    dangerouslySetInnerHTML={{
                      __html: our_story_content?.ourVision || "",
                    }}
                  />
                ) : (
                  <H6
                    pt={"8px"}
                    mb={2.5}
                    display={"block"}
                    color="grey.500"
                    sx={{
                      whiteSpace: "break-spaces",
                    }}
                    className="title-sub-font"
                  >
                    {our_story_content?.ourVision}
                  </H6>
                )}
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <H3>Useful Links</H3>

                <Box mb={2}>
                  <List>
                    {importantLinks.map((item, ind) => (
                      <Link href={item.link} key={ind}>
                        <ListItem
                          disablePadding
                          sx={{
                            padding: "0!important",
                          }}
                        >
                          <ListItemButton sx={{ paddingY: "2px" }}>
                            <ListItemIcon>
                              <FiberSmartRecordIcon
                                sx={{
                                  color: "white",
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </Box>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box mb={2}>
                  <H3>Contact Us</H3>
                  <Box
                    py={0.6}
                    color="white"
                    fontFamily={"GlacialIndifference-Regular"}
                    fontSize={"14px"}
                  >
                    Newminatis LLC
                  </Box>
                  <Box
                    pb={0.6}
                    color="white"
                    fontSize={"14px"}
                    fontFamily={"GlacialIndifference-Regular"}
                  >
                    3680 Wilshire Blvd Ste P04 <br /> 1716 Los Angeles, CA 90010
                  </Box>

                  <Box
                    pb={0.6}
                    fontSize={"14px"}
                    color="white"
                    fontFamily={"GlacialIndifference-Regular"}
                  >
                    Email: support@newminatis.com
                  </Box>
                  <Box
                    pb={0.6}
                    fontSize={"14px"}
                    color="white"
                    fontFamily={"GlacialIndifference-Regular"}
                  >
                    Phone: +1 415 818 1185
                  </Box>

                  <Box
                    pb={0.6}
                    fontSize={"14px"}
                    mb={2}
                    color="white"
                    fontFamily={"GlacialIndifference-Regular"}
                  >
                    @2023 NEWMINATIS
                  </Box>

                  <SocialMediaIcons />
                </Box>
              </Grid>
              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box>
                  <H3 mb={2}> Join The Tribe</H3>

                  <form
                    onSubmit={handleSubmitForm}
                    className="d-flex"
                    style={{ columnGap: "5px" }}
                  >
                    <TextField
                      fullWidth
                      name="email"
                      value={email}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{
                        mb: 2,
                        "& .MuiInputBase-root": {
                          background: "white",
                          borderRadius: "0",
                        },
                      }}
                      placeholder="Email Address"
                    />

                    <Box
                      sx={{
                        marginLeft: "auto",
                        width: "fit-content",
                      }}
                    >
                      <LoadingButton
                        type="submit"
                        loading={loading}
                        disabled={!isValidEmail()}
                        //color="marron"
                        sx={{
                          color: "black",
                          background: "white",
                          height: "40px",
                          padding: "9.3px 30px",
                          fontWeight: "bold",
                          borderRadius: "0",
                          "&.MuiLoadingButton-root:hover": {
                            background: "white",
                          },
                          "& .MuiLoadingButton-loadingIndicator": {
                            color: "black",
                          },
                          ":disabled": {
                            color: "black",
                            opacity: "0.75",
                            background: "#f4f4f4",
                          },
                        }}
                      >
                        <Span
                          style={
                            loading
                              ? {
                                  visibility: "hidden",
                                }
                              : {
                                  visibility: "visible",
                                }
                          }
                          sx={{
                            textTransform: "uppercase",
                          }}
                        >
                          Subscribe
                        </Span>
                      </LoadingButton>
                    </Box>
                  </form>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          height: {
            xs: "80px",
            sm: "80px",
            md: "30px",
            lg: "30px",
          },
          paddingBottom: "10px",
          paddingTop: "3px",
          background: "white",
          display: "flex",
          justifyContent: "center",
          columnGap: "20px",
        }}
      >
        {PaymentIcons.map((i) => (
          <img
            src={i.link}
            alt={i.label}
            key={i.label}
            style={{ width: "30px", height: "30px" }}
          />
        ))}
      </Box>
    </footer>
  );
};

const importantLinks = [
  {
    label: "About Us",
    link: "/our-story",
  },
  {
    label: "Terms & Conditions",
    link: "/terms-and-conditions",
  },
  {
    label: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    label: "Shipping Information",
    link: "/shipping-information",
  },
  {
    label: "Return Policy",
    link: "/return-policy",
  },
  {
    label: "FAQs",
    link: "/faqs",
  },
];

const PaymentIcons = [
  {
    label: "Apple-Pay",
    link: "/assets/images/payments/apple-pay.svg",
  },
  {
    label: "Google-Pay",
    link: "/assets/images/payments/google-pay.svg",
  },
  {
    label: "Mastercard",
    link: "/assets/images/payments/mastercard.svg",
  },
  {
    label: "Visa",
    link: "/assets/images/payments/visa.svg",
  },
];

export default Footer;
