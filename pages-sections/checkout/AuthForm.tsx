import { FC, useEffect, useState } from "react";
import { Button, Card, Grid, IconButton, TextField } from "@mui/material";
import { Country, State, City } from "country-state-city";
import { Formik, useFormik } from "formik";
import Autocomplete from "@mui/material/Autocomplete";
import { DeleteOutline, ModeEditOutline } from "@mui/icons-material";
import { Box } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import useUserService from "@/hooks/useUserService";
import { TUserAddress } from "@/types/TUserAddress";
import {
  AddUserAddress,
  DeleteUserAddress,
  SelectUserAddress,
} from "@/store/Auth/Auth-action";
import { IUserResponse } from "@/interface/IUserResponse";
import FacebookService from "@/service/FacebookService";
import { InitiateCheckoutEvent, grapUserData } from "@/helpers/FacebookEvent";
import { getTotalPrice } from "@/helpers/Extensions";
import { IBaseResponse } from "@/interface/IBaseResponse";
import { toast } from "react-hot-toast";
import { H2, H3, H5, H6, Span } from "@/components/Typography";
import { FlexBetween, FlexBox } from "@/components/flex-box";
import MuiPhoneNumber from "material-ui-phone-number-2";
import { IState, ICountry, ICity } from "country-state-city";
import Link from "next/link";
import { ex_countries } from "@/utils/constants";
import { AddressValidationSchema } from "@/utils/schema";
import NewAddressForm from "@/components/address/NewAddressForm";
import EditAddressForm from "@/components/address/EditAddressForm";

const AuthForm: FC = () => {
  const router = useRouter();
  const auth = useAppSelector((state) => state.Store.AuthReducer.Auth);
  const cart = useAppSelector((state) => state.Store.CartReducer?.CartItems);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(
    auth?.selectedAddress &&
      auth?.userAddress != null &&
      auth?.userAddress.length > 0
      ? auth?.selectedAddress
      : auth?.userAddress != null && auth?.userAddress.length > 0
      ? 0
      : 0
  );

  const { onPostAddress, onDeleteAddress } = useUserService();
  const dispatch = useAppDispatch();

  const toggleDialog = () => setDialogOpen(!dialogOpen);
  const handleFormSubmit = async (values: TUserAddress) => {
    setLoading(true);
    values.city = values.state!;
    const result = (await onPostAddress(values)) as IUserResponse;
    if (result.success) {
      dispatch(AddUserAddress(result.userAddress));
      if (process.env.NODE_ENV != "development") {
        await pushFacebookEvent();
      }
      setLoading(false);
      router.push("/payment");
    }
  };

  const pushFacebookEvent = async () => {
    var items = cart?.map((i) => ({
      id: i.sku,
      quantity: i.qty,
      item_price: i.price,
    }));
    await FacebookService.pushEvent({
      data: [
        {
          event_name: InitiateCheckoutEvent,
          user_data: grapUserData(auth),
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

  const deleteAddress = async (id: number) => {
    const result = (await onDeleteAddress(id)) as IBaseResponse;
    if (result.success) {
      dispatch(DeleteUserAddress(id));
      toast.success("Address Deleted Successfully", {
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    if (auth?.userAddress == null || auth?.userAddress.length == 0) {
      setSelected(null);
    } else {
      setSelected(auth.selectedAddress ?? 0);
    }
  }, [auth?.userAddress]);

  useEffect(() => {
    if (auth) {
      setFieldValue("email", auth?.email);
    } else {
      setFieldValue("email", null);
    }
  }, [auth]);

  const handleProceedPayment = async () => {
    setLoading(true);
    dispatch(SelectUserAddress(selected || 0));
    if (process.env.NODE_ENV != "development") {
      await pushFacebookEvent();
    }
    setLoading(false);
    router.push("/payment");
  };

  useEffect(() => {
    resetForm();
  }, [selected, auth?.selectedAddress]);

  const initialValues: TUserAddress = {
    addressLine:
      selected != null && auth?.userAddress && auth.userAddress.length > 0
        ? auth.userAddress[selected].addressLine
        : "",

    deliveryInstructions:
      selected != null && auth?.userAddress && auth.userAddress.length > 0
        ? auth.userAddress[selected].deliveryInstructions
        : "",
    firstName:
      selected != null && auth?.userAddress && auth.userAddress.length > 0
        ? auth.userAddress[selected].firstName
        : "",
    lastName:
      selected != null && auth?.userAddress && auth.userAddress.length > 0
        ? auth.userAddress[selected].lastName
        : "",
    city:
      selected != null && auth?.userAddress && auth.userAddress.length > 0
        ? auth.userAddress[selected].city
        : "",
    country:
      selected != null && auth?.userAddress && auth.userAddress.length > 0
        ? auth.userAddress[selected].country
        : "",
    createdDate:
      selected != null && auth?.userAddress && auth.userAddress.length > 0
        ? auth.userAddress[selected].createdDate
        : null,
    id:
      selected != null && auth?.userAddress && auth.userAddress.length > 0
        ? auth.userAddress[selected].id
        : 0,
    modifiedDate: null,
    phoneNumber:
      selected != null && auth?.userAddress && auth.userAddress.length > 0
        ? auth.userAddress[selected].phoneNumber
        : "",
    postalCode:
      selected != null && auth?.userAddress && auth.userAddress.length > 0
        ? auth.userAddress[selected].postalCode
        : "",

    userId: auth?.id || 0,
    active: true,
    email: auth?.email ?? "",
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
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
        <Card sx={{ mb: 4 }} elevation={1} role={"drawer"}>
          {selected === null && (
            <>
              <H2 mb={2}>Shipping Address</H2>
              <Grid item xs={12}>
                <FlexBetween>
                  <TextField
                    fullWidth
                    sx={{ mb: 3 }}
                    size="small"
                    onBlur={handleBlur}
                    disabled={auth != null}
                    label="Email Address"
                    onChange={handleChange}
                    name="email"
                    value={values.email}
                    error={!!touched.email && !!errors.email}
                    helperText={(touched.email && errors.email) as string}
                  />
                </FlexBetween>
              </Grid>

              <Grid container spacing={1}>
                <Grid item sm={6} xs={6}>
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
                    helperText={
                      (touched.firstName && errors.firstName) as string
                    }
                  />

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
                        helperText={
                          (touched.country && errors.country) as string
                        }
                        {...params}
                      />
                    )}
                  />
                </Grid>
                <Grid item sm={6} xs={6}>
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
                </Grid>

                <Grid item sm={6} xs={6}>
                  <Autocomplete
                    autoComplete={false}
                    fullWidth
                    disabled={values.country == "" || values.country == null}
                    sx={{ mb: 3 }}
                    options={State.getStatesOfCountry(values.country)}
                    getOptionLabel={(option: IState) => option.name}
                    onChange={(_, value: any) =>
                      setFieldValue("state", value.name)
                    }
                    onBlur={handleBlur}
                    //@ts-ignore
                    value={
                      values.state
                        ? (State.getStatesOfCountry(values.country).find(
                            (x) => x.name == values.state
                          ) as unknown as IState[])
                        : null
                    }
                    renderInput={(params) => (
                      <TextField
                        label="State/City *"
                        variant="outlined"
                        placeholder="State/City"
                        error={!!touched.state && !!errors.state}
                        helperText={(touched.state && errors.state) as string}
                        {...params}
                      />
                    )}
                  />
                </Grid>

                <Grid item sm={6} xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    sx={{ mb: 3 }}
                    type="number"
                    label="PostalCode (optional)"
                    name="postalCode"
                    inputProps={{
                      inputMode: "numeric",
                    }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.postalCode ?? ""}
                    error={!!touched.postalCode && !!errors.postalCode}
                    helperText={
                      (touched.postalCode && errors.postalCode) as string
                    }
                  />
                </Grid>

                <Grid item sm={12} xs={12}>
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
                    label="Delivery Instruction"
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
                </Grid>
              </Grid>
            </>
          )}

          {auth?.userAddress && auth?.userAddress.length > 0 && (
            <>
              <FlexBetween mb={2} columnGap={2}>
                <Box>
                  <H3>Shipping Address</H3>
                </Box>
                <NewAddressForm />
              </FlexBetween>
              <Grid container spacing={3}>
                {auth.userAddress?.map((item, ind) => (
                  <Grid item md={4} sm={6} xs={12} key={ind}>
                    <Card
                      sx={{
                        boxShadow:
                          item.id === initialValues.id
                            ? "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)"
                            : "none",
                        cursor: "pointer",
                        border: "1px solid black",
                        position: "relative",
                        opacity: item.id === initialValues.id ? "1" : "0.5",
                      }}
                      onClick={() => setSelected(ind)}
                    >
                      <FlexBox
                        justifyContent="flex-end"
                        sx={{
                          position: "absolute",
                          top: 5,
                          right: 5,
                        }}
                      >
                        <EditAddressForm initialValues={item} />

                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => deleteAddress(item.id)}
                        >
                          <DeleteOutline
                            sx={{
                              fontSize: 20,
                            }}
                          />
                        </IconButton>
                      </FlexBox>
                      <H5 mb={0.5} color={"black"}>
                        {item.firstName} {item.lastName}
                      </H5>

                      <H6>{item.addressLine}</H6>

                      <H6>
                        {item.country}
                        {item.city && (
                          <Span>
                            {", "}
                            {item.city}
                          </Span>
                        )}
                      </H6>
                      <Span>{item.phoneNumber}</Span>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Card>

        <Grid container spacing={4}>
          <Grid item sm={6} xs={6}>
            <Link href="payment" passHref>
              <Button
                variant="outlined"
                color="secondary"
                type="button"
                fullWidth
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
              type={selected != null ? "button" : "submit"}
              onClick={() => (selected != null ? handleProceedPayment() : {})}
              fullWidth
            >
              Proceed to Payment
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AuthForm;
