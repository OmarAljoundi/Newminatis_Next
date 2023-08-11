import useUserService from "@/hooks/useUserService";
import { IUserResponse } from "@/interface/IUserResponse";
import { TUserAddress } from "@/types/TUserAddress";
import { ex_countries } from "@/utils/constants";
import { AddressValidationSchema } from "@/utils/schema";
import { LoadingButton } from "@mui/lab";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Country, ICountry, IState, State } from "country-state-city";
import { useFormik } from "formik";
import MuiPhoneNumber from "material-ui-phone-number-2";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function AddressForm() {
  const { data: authedSession, update } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const { onPostAddress } = useUserService();
  const searchParams = useSearchParams();
  const initalFormData = {
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
    postalCode: "",
    email: "",
    active: true,
    userId: authedSession?.user.id || 0,
  };
  const [initialValues, setInitialValues] =
    useState<TUserAddress>(initalFormData);

  const handleFormSubmit = async (values: TUserAddress) => {
    setLoading(true);
    values.city = values.state!;
    const result = (await onPostAddress(values)) as IUserResponse;
    if (result.success) {
      if (authedSession) {
        if (
          authedSession.user.userAddress.find(
            (x) => x.id == result.userAddress.id
          )
        ) {
          await update({
            userAddress: [
              ...authedSession.user.userAddress.filter(
                (x) => x.id != result.userAddress.id
              ),
              result.userAddress,
            ],
            selectedAddress: authedSession.user.selectedAddress || 0,
          });
        } else {
          await update({
            userAddress: [
              ...authedSession.user.userAddress,
              result.userAddress,
            ],
            selectedAddress: authedSession.user.selectedAddress || 0,
          });
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchParams?.get("address")) {
      var address = authedSession?.user.userAddress.find(
        (x) => x.id == Number(searchParams?.get("address"))
      );
      if (address) {
        setInitialValues(address);
      }
    } else {
      setInitialValues(initalFormData);
      resetForm();
    }
  }, [searchParams]);

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
    <form
      className="grid  border border-gray-300 relative pt-6 pb-3 px-3 shadow-lg opacity-100 bg-white "
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-2 gap-x-3 ">
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
          defaultCountry={values.country ? values.country.toLowerCase() : "us"}
          onChange={handleChange("phoneNumber")}
          onBlur={handleBlur}
          variant="outlined"
          fullWidth
          value={values.phoneNumber}
          disableDropdown={true}
          error={!!touched.phoneNumber && !!errors.phoneNumber}
          helperText={(touched.phoneNumber && errors.phoneNumber) as string}
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
          onChange={(_, value: any) => setFieldValue("state", value?.name)}
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
          helperText={(touched.addressLine && errors.addressLine) as string}
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
            !!touched.deliveryInstructions && !!errors.deliveryInstructions
          }
          helperText={
            (touched.deliveryInstructions &&
              errors.deliveryInstructions) as string
          }
        />
      </div>
      <div className="grid">
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
            ":disabled": {
              opacity: "0.95",
            },
          }}
        >
          Save Address
        </LoadingButton>
      </div>
    </form>
  );
}
