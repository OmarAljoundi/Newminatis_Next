import { ModeEditOutline } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Country, ICountry, IState, State } from "country-state-city";
import { useFormik } from "formik";
import { FC, Fragment, useState } from "react";
import MuiPhoneNumber from "material-ui-phone-number-2";
import { UpdateUserAddress } from "@/store/Auth/Auth-action";
import { IUserResponse } from "@/interface/IUserResponse";
import { ex_countries } from "@/utils/constants";
import { TUserAddress } from "@/types/TUserAddress";
import { useAppDispatch } from "@/hooks/useRedux";
import useUserService from "@/hooks/useUserService";
import { AddressValidationSchema } from "@/utils/schema";
import { toast } from "react-hot-toast";
// ================================================================
type EditAddressFormProps = {
  initialValues: TUserAddress;
};
// ================================================================

const EditAddressForm: FC<EditAddressFormProps> = ({ initialValues }) => {
  const [addCardForm, setAddCardForm] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { onPostAddress } = useUserService();

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    setFieldValue,
    touched,
    values,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: AddressValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      values.city = values.state!;
      const result = (await onPostAddress(values)) as IUserResponse;
      if (result.success) {
        dispatch(UpdateUserAddress(result.userAddress));
        toast.success("Address Saved Successfully", {
          duration: 5000,
        });
        setAddCardForm(false);
      }
    },
  });

  return (
    <Fragment>
      <IconButton
        size="small"
        color="error"
        sx={{ mr: 1 }}
        onClick={() =>
          addCardForm ? setAddCardForm(false) : setAddCardForm(true)
        }
      >
        <ModeEditOutline
          sx={{
            fontSize: 20,
          }}
        />
      </IconButton>

      <Dialog
        open={addCardForm}
        onClose={() => setAddCardForm(false)}
        PaperProps={{
          role: "drawer",
        }}
      >
        <DialogContent>
          <Typography variant="h6" mb={3}>
            Edit Address Information
          </Typography>

          <form onSubmit={handleSubmit}>
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
                  helperText={(touched.firstName && errors.firstName) as string}
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
                      helperText={(touched.country && errors.country) as string}
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
            <Grid container spacing={4}>
              <Grid item sm={6} xs={6}>
                <Button
                  variant="outlined"
                  color="secondary"
                  type="button"
                  onClick={() => setAddCardForm(false)}
                  fullWidth
                >
                  Cancel
                </Button>
              </Grid>

              <Grid item sm={6} xs={6}>
                <Button
                  variant="contained"
                  color="dark"
                  type="submit"
                  fullWidth
                >
                  Update Address
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default EditAddressForm;
