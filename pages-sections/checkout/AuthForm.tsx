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
import { useSession } from "next-auth/react";

const AuthForm: FC = () => {
  const router = useRouter();
  const cart = useAppSelector((state) => state.Store.CartReducer?.CartItems);
  const [loading, setLoading] = useState(false);
  const { data: authedSession, status, update } = useSession();
  const [selected, setSelected] = useState<number | null>(
    authedSession?.user?.selectedAddress &&
      authedSession?.user?.userAddress != null &&
      authedSession?.user?.userAddress.length > 0
      ? authedSession?.user?.selectedAddress
      : authedSession?.user?.userAddress != null &&
        authedSession?.user?.userAddress.length > 0
      ? 0
      : 0
  );

  const { onPostAddress, onDeleteAddress } = useUserService();
  const dispatch = useAppDispatch();

  const handleFormSubmit = async (values: TUserAddress) => {
    setLoading(true);
    values.city = values.state!;
    const result = (await onPostAddress(values)) as IUserResponse;
    if (result.success) {
      if (authedSession)
        await update({
          userAddress: [...authedSession.user.userAddress, result.userAddress],
        });
      //dispatch(AddUserAddress(result.userAddress));
      if (process.env.NODE_ENV != "development") {
        // await pushFacebookEvent();
      }
      setLoading(false);
      router.push("/payment");
    }
  };

  // const pushFacebookEvent = async () => {
  //   var items = cart?.map((i) => ({
  //     id: i.sku,
  //     quantity: i.qty,
  //     item_price: i.price,
  //   }));
  //   await FacebookService.pushEvent({
  //     data: [
  //       {
  //         event_name: InitiateCheckoutEvent,
  //         user_data: grapUserData(auth),
  //         event_source_url: window.location.href,
  //         custom_data: {
  //           content_category: "product",
  //           currency: "USD",
  //           value: getTotalPrice(cart).toString(),
  //           contents: items,
  //         },
  //       },
  //     ],
  //   });
  // };

  const deleteAddress = async (id: number) => {
    const result = (await onDeleteAddress(id)) as IBaseResponse;
    if (result.success) {
      let userAddress = [...(authedSession?.user.userAddress || [])];
      userAddress.map((i) => {
        if (i.id == id) {
          i.active = false;
        }
      });
      update({
        userAddress: userAddress,
      });

      //dispatch(DeleteUserAddress(id));
      toast.success("Address Deleted Successfully", {
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    if (authedSession?.user?.userAddress.length == 0) {
      setSelected(null);
    } else {
      setSelected(authedSession?.user?.selectedAddress ?? 0);
    }
    setFieldValue("email", authedSession?.user.email ?? null);
  }, [status]);

  const handleProceedPayment = async () => {
    setLoading(true);
    update({
      selectedAddress: selected || 0,
      userAddress: authedSession?.user.userAddress,
    });
    //dispatch(SelectUserAddress(selected || 0));
    if (process.env.NODE_ENV != "development") {
      //await pushFacebookEvent();
    }
    setLoading(false);
    router.push("/payment");
  };

  useEffect(() => {
    resetForm();
  }, [selected, authedSession?.user.selectedAddress]);

  const initialValues: TUserAddress = {
    addressLine:
      selected != null &&
      authedSession?.user?.userAddress &&
      authedSession?.user.userAddress.length > 0
        ? authedSession?.user.userAddress[selected].addressLine
        : "",

    deliveryInstructions:
      selected != null &&
      authedSession?.user?.userAddress &&
      authedSession?.user.userAddress.length > 0
        ? authedSession?.user.userAddress[selected].deliveryInstructions
        : "",
    firstName:
      selected != null &&
      authedSession?.user?.userAddress &&
      authedSession?.user.userAddress.length > 0
        ? authedSession?.user.userAddress[selected].firstName
        : "",
    lastName:
      selected != null &&
      authedSession?.user?.userAddress &&
      authedSession?.user.userAddress.length > 0
        ? authedSession?.user.userAddress[selected].lastName
        : "",
    city:
      selected != null &&
      authedSession?.user?.userAddress &&
      authedSession?.user.userAddress.length > 0
        ? authedSession?.user.userAddress[selected].city
        : "",
    country:
      selected != null &&
      authedSession?.user?.userAddress &&
      authedSession?.user.userAddress.length > 0
        ? authedSession?.user.userAddress[selected].country
        : "",
    createdDate:
      selected != null &&
      authedSession?.user?.userAddress &&
      authedSession?.user.userAddress.length > 0
        ? authedSession?.user.userAddress[selected].createdDate
        : null,
    id:
      selected != null &&
      authedSession?.user?.userAddress &&
      authedSession?.user.userAddress.length > 0
        ? authedSession?.user.userAddress[selected].id
        : 0,
    modifiedDate: null,
    phoneNumber:
      selected != null &&
      authedSession?.user?.userAddress &&
      authedSession?.user.userAddress.length > 0
        ? authedSession?.user.userAddress[selected].phoneNumber
        : "",
    postalCode:
      selected != null &&
      authedSession?.user?.userAddress &&
      authedSession?.user.userAddress.length > 0
        ? authedSession?.user.userAddress[selected].postalCode
        : "",

    userId: authedSession?.user?.id || 0,
    active: true,
    email: authedSession?.user?.email ?? "",
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

  const updateSelectedAddress = async (selectDefaultAddress: number) => {
    await update({
      selectedAddress: selectDefaultAddress,
      userAddress: authedSession?.user.userAddress,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card sx={{ mb: 4 }} elevation={1} role={"drawer"}>
          {selected === null && (
            <>
              <H2 mb={2}>Shipping Information</H2>
              <Grid item xs={12}>
                <FlexBetween>
                  <TextField
                    fullWidth
                    sx={{ mb: 3 }}
                    size="small"
                    onBlur={handleBlur}
                    disabled={status === "authenticated"}
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
                    label="PostalCode *"
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
                </Grid>
              </Grid>
            </>
          )}

          {status == "authenticated" &&
            authedSession!.user.userAddress.length > 0 && (
              <>
                <FlexBetween mb={2} columnGap={2}>
                  <Box>
                    <H3>Shipping Address</H3>
                  </Box>
                  <NewAddressForm />
                </FlexBetween>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-2">
                  {authedSession!.user.userAddress?.map((item, ind) => (
                    <div
                      key={ind}
                      onClick={() => updateSelectedAddress(ind)}
                      className={`cursor-pointer border border-gray-300 relative pt-1 pb-3 px-3 ${
                        item.id === initialValues.id
                          ? "shadow-lg opacity-100"
                          : "opacity-50"
                      }`}
                    >
                      <div className="flex gap-x-2 items-baseline">
                        <div className="grid w-3/4">
                          <span className="font-medium truncate">
                            {item.firstName} {item.lastName}
                          </span>

                          <span className="font-medium truncate">
                            {item.country}
                            {item.city && (
                              <span>
                                {", "}
                                {item.city}
                              </span>
                            )}
                          </span>
                          <span className="font-medium">
                            {item.phoneNumber}
                          </span>
                          <span className="font-medium truncate">
                            {item.addressLine}
                          </span>
                        </div>
                        <div className="flex justify-end w-1/4">
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
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
        </Card>

        <div className="grid grid-cols-2 gap-x-2">
          <div>
            <Link href="payment" passHref>
              <Button
                variant="outlined"
                color="secondary"
                type="button"
                sx={{ fontSize: "12px" }}
                fullWidth
              >
                Back to Cart
              </Button>
            </Link>
          </div>

          <div>
            <LoadingButton
              variant="contained"
              color="primary"
              loading={loading}
              sx={{
                fontSize: "12px",
                paddingX: {
                  xs: "0",
                  sm: "0",
                  md: "0",
                  lg: "5px",
                },
              }}
              type={selected != null ? "button" : "submit"}
              onClick={() => (selected != null ? handleProceedPayment() : {})}
              fullWidth
            >
              Proceed to Payment
            </LoadingButton>
          </div>
        </div>
      </form>
    </>
  );
};

export default AuthForm;
