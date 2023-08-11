import { FC, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";
import { Country, State, City } from "country-state-city";
import { ICountry, IState, ICity } from "country-state-city";
import MuiPhoneNumber from "material-ui-phone-number-2";
import Cookies from "js-cookie";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useAppSelector } from "@/hooks/useRedux";
import { TUserGuest } from "@/types/TUserGuest";
import useUserService from "@/hooks/useUserService";
import { IUserResponse } from "@/interface/IUserResponse";
import FacebookService from "@/service/FacebookService";
import { InitiateCheckoutEvent, grapUserData } from "@/helpers/FacebookEvent";
import { getTotalPrice } from "@/helpers/Extensions";
import { AddressValidationSchema } from "@/utils/schema";

import { ex_countries } from "@/utils/constants";
import Link from "next/link";
import { useFormik } from "formik";
import { FlexBox } from "@/components/flex-box";
import { H6 } from "@/components/Typography";

const GuestForm: FC<{
  createSession: (t?: boolean) => Promise<void>;
}> = ({ createSession }) => {
  const cart = useAppSelector((state) => state.Store.CartReducer?.CartItems);
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<TUserGuest>({
    addressLine: "",
    firstName: "",
    lastName: "",
    state: "",
    deliveryInstructions: "",
    city: "",
    country: "",
    createdDate: null,
    id: 0,
    modifiedDate: null,
    phoneNumber: "",
    postalCode: null,
    email: "",
    newsletter: false,
  });

  const { onGetGuest, onCreateGuest, userLoad } = useUserService();
  const handleFormSubmit = async (values: TUserGuest) => {
    setLoading(true);
    values.city = values.state;
    const result = (await onCreateGuest(values)) as IUserResponse;
    if (result.success) {
      await createSession(true);
      await pushFacebookEvent(values);
      setLoading(false);
    } else {
      setLoading(false);
      setFieldError("email", result.message);
    }
  };

  const pushFacebookEvent = async (userGuest: TUserGuest) => {
    var items = cart?.map((i) => ({
      id: i.sku,
      quantity: i.qty,
      item_price: i.price,
    }));
    await FacebookService.pushEvent({
      data: [
        {
          event_name: InitiateCheckoutEvent,
          user_data: grapUserData(null, userGuest),
          event_source_url: window.location.href,
          custom_data: {
            content_category: "product",
            currency: "USD",
            value: getTotalPrice(cart).toString(),
            contents: items,
          },
        },
      ],
    });
  };

  const tryFetchGuest = async () => {
    if (Cookies.get("GUEST_EMAIL")) {
      const result = (await onGetGuest(
        Cookies.get("GUEST_EMAIL")!
      )) as IUserResponse;
      if (result.success) {
        result.guest.postalCode =
          result.guest.postalCode == 0 ? null : result.guest.postalCode;

        setInitialValues(result.guest);
      }
    }
  };

  useEffect(() => {
    tryFetchGuest();
  }, []);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: AddressValidationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: handleFormSubmit,
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="mb-3"></div>
          <div className="grid ">
            <div className="grid">
              <TextField
                fullWidth
                sx={{ mb: 3 }}
                size="small"
                onBlur={handleBlur}
                label="Email Address *"
                onChange={handleChange}
                name="email"
                value={values.email}
                error={!!touched.email && !!errors.email}
                helperText={(touched.email && errors.email) as string}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-3">
              <TextField
                fullWidth
                sx={{ mb: 3 }}
                size="small"
                onBlur={handleBlur}
                label="First Name *"
                onChange={handleChange}
                name="firstName"
                value={values.firstName}
                error={!!touched.firstName && !!errors.firstName}
                helperText={(touched.firstName && errors.firstName) as string}
              />
              <TextField
                fullWidth
                sx={{ mb: 3 }}
                size="small"
                label="Last Name *"
                onBlur={handleBlur}
                onChange={handleChange}
                name="lastName"
                value={values.lastName}
                error={!!touched.lastName && !!errors.lastName}
                helperText={(touched.lastName && errors.lastName) as string}
              />
            </div>

            <div className="grid grid-cols-2 gap-x-3">
              <Autocomplete
                fullWidth
                autoComplete={false}
                sx={{ mb: 3 }}
                options={Country.getAllCountries().filter(
                  (x) => !ex_countries.includes(x.isoCode.toLowerCase())
                )}
                //@ts-ignore
                value={
                  values.country
                    ? (Country.getCountryByCode(
                        values.country
                      ) as unknown as ICountry[])
                    : null
                }
                onBlur={handleBlur}
                getOptionLabel={(option: ICountry) => option.name}
                onChange={(_, value: any) => {
                  if (value) setFieldValue("country", value.isoCode);
                  setFieldValue("state", null);
                }}
                renderInput={(params) => (
                  <TextField
                    label="Country *"
                    //@ts-ignore
                    size="small"
                    variant="outlined"
                    placeholder="Select Country"
                    error={!!touched.country && !!errors.country}
                    helperText={(touched.country && errors.country) as string}
                    {...params}
                  />
                )}
              />
              <MuiPhoneNumber
                id="contactPhoneNumber"
                label="Phone Number *"
                defaultCountry={
                  values.country ? values.country.toLowerCase() : "us"
                }
                onChange={handleChange("phoneNumber")}
                onBlur={handleBlur}
                variant="outlined"
                fullWidth
                value={values.phoneNumber}
                disableDropdown={true}
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={
                  (touched.phoneNumber && errors.phoneNumber) as string
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-x-3">
              <Autocomplete
                autoComplete={false}
                fullWidth
                disabled={values.country == "" || values.country == null}
                sx={{ mb: 3 }}
                //@ts-ignore
                options={State.getStatesOfCountry(values.country)}
                getOptionLabel={(option: IState) => option.name}
                onChange={(_, value: any) => setFieldValue("state", value.name)}
                onBlur={handleBlur}
                //@ts-ignore
                value={
                  values.state
                    ? //@ts-ignore
                      (State.getStatesOfCountry(values.country).find(
                        (x) => x.name == values.state
                      ) as unknown as IState[])
                    : null
                }
                renderInput={(params) => (
                  <TextField
                    label="State/City *"
                    //@ts-ignore
                    size="small"
                    variant="outlined"
                    placeholder="State/City"
                    error={!!touched.state && !!errors.state}
                    helperText={(touched.state && errors.state) as string}
                    {...params}
                  />
                )}
              />

              <TextField
                fullWidth
                size="small"
                sx={{ mb: 3 }}
                type="number"
                label="PostalCode *"
                name="postalCode"
                defaultValue={values.postalCode}
                inputProps={{
                  inputMode: "numeric",
                }}
                inputMode={"numeric"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.postalCode ?? ""}
                error={!!touched.postalCode && !!errors.postalCode}
                helperText={(touched.postalCode && errors.postalCode) as string}
              />
            </div>

            <div className="grid grid-cols-1">
              <TextField
                fullWidth
                label="Address Line *"
                onBlur={handleBlur}
                onChange={handleChange}
                sx={{ mb: 3 }}
                size="small"
                name="addressLine"
                value={values.addressLine}
                error={!!touched.addressLine && !!errors.addressLine}
                helperText={
                  (touched.addressLine && errors.addressLine) as string
                }
              />
              <TextField
                fullWidth
                label="Delivery Instruction(s)"
                onBlur={handleBlur}
                onChange={handleChange}
                sx={{ mb: 3 }}
                size="small"
                name="deliveryInstructions"
                value={values.deliveryInstructions}
                error={
                  !!touched.deliveryInstructions &&
                  !!errors.deliveryInstructions
                }
                helperText={
                  (touched.deliveryInstructions &&
                    errors.deliveryInstructions) as string
                }
              />
            </div>
            <div className="grid">
              <FormControlLabel
                name="newsletter"
                className="newsletter"
                sx={{
                  margin: "0 0 20px 0",
                  alignItems: "flex-start",
                }}
                onChange={handleChange}
                control={
                  <Checkbox
                    size="small"
                    color="primary"
                    checked={values.newsletter || false}
                    sx={{ padding: "0px 10px 0 0" }}
                  />
                }
                label={
                  <FlexBox
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="flex-start"
                    position={"relative"}
                  >
                    <H6
                      sx={{
                        color: "black",
                        fontSize: "12px",
                      }}
                    >
                      I'm excited to stay up-to-date with all your latest news
                      and updates!
                    </H6>
                  </FlexBox>
                }
              />
            </div>
          </div>
          <Grid container spacing={4}>
            <Grid item sm={6} xs={6}>
              <Link href="/cart">
                <Button
                  variant="outlined"
                  color="secondary"
                  type="button"
                  fullWidth
                  sx={{
                    fontSize: {
                      xs: "11px",
                      sm: "14px",
                    },
                  }}
                >
                  Back to Cart
                </Button>
              </Link>
            </Grid>

            <Grid item sm={6} xs={6}>
              <LoadingButton
                variant="contained"
                color="primary"
                loading={loading}
                type={"submit"}
                fullWidth
                sx={{
                  fontSize: {
                    xs: "11px",
                    sm: "14px",
                  },
                  paddingX: {
                    xs: "0",
                    sm: "0",
                    md: "0",
                    lg: "5px",
                  },
                  ":disabled": {
                    opacity: "0.95",
                  },
                }}
              >
                Proceed to Payment
              </LoadingButton>
            </Grid>
          </Grid>
        </div>
      </form>
    </>
  );
};

export default GuestForm;
