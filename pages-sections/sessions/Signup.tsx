import { FC, useCallback, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Box,
  FormControlLabel,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { Wrapper } from "./Login";
import SocialButtons from "./SocialButtons";
import EyeToggleButton from "./EyeToggleButton";
import { useRouter, useSearchParams } from "next/navigation";
import useUserService from "@/hooks/useUserService";
import { IUserResponse } from "@/interface/IUserResponse";
import { TUserRegisterRequest } from "@/types/TUserRegisterRequest";
import BackdropLoading from "@/components/loading/BackdropLoading";
import { H1, H6, Span } from "@/components/Typography";
import { FlexBox, FlexRowCenter } from "@/components/flex-box";
import { RegisterType, Role } from "@/types/TUser";

type Prop = {
  onClose: () => void;
  handleSetType: (type: string) => void;
};
const Signup: FC<Prop> = ({ handleSetType, onClose }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const { onRegister, userLoad } = useUserService();
  const searchParams = useSearchParams();
  const route = useRouter();

  const [load, setLoad] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = async (values: TUserRegisterRequest) => {
    const result = (await onRegister(values)) as IUserResponse;
    if (result.success) {
      var isCheckoutHistory = searchParams?.get("next");
      if (isCheckoutHistory) {
        window.location.href = isCheckoutHistory;
        //enqueueSnackbar('Register Successfully')
      } else {
        route.push("/");
      }
      onClose();
    } else {
      //enqueueSnackbar(result.message);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });

  return (
    <Wrapper
      elevation={3}
      passwordVisibility={passwordVisibility}
      role={"drawer"}
      sx={{ margin: "auto" }}
    >
      <BackdropLoading open={userLoad || load} />
      <form onSubmit={handleSubmit}>
        <H1 textAlign="center" mt={1} mb={4} fontSize={26}>
          Create Your Account
        </H1>
        <TextField
          sx={{ mb: 2.75 }}
          disabled={load || userLoad}
          fullWidth
          name="email"
          size="small"
          type="email"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          label="Email"
          placeholder="exmple@mail.com"
          error={!!touched.email && !!errors.email}
          helperText={(touched.email && errors.email) as string}
        />

        <TextField
          sx={{ mb: 2.75 }}
          fullWidth
          disabled={load || userLoad}
          size="small"
          name="password"
          label="Password"
          autoComplete="on"
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          type={passwordVisibility ? "text" : "password"}
          error={!!touched.password && !!errors.password}
          helperText={(touched.password && errors.password) as string}
          InputProps={{
            endAdornment: (
              <EyeToggleButton
                show={passwordVisibility}
                click={togglePasswordVisibility}
              />
            ),
          }}
        />
        <TextField
          fullWidth
          disabled={load || userLoad}
          sx={{ mb: 1.75 }}
          size="small"
          autoComplete="on"
          name="re_password"
          label="Retype Password"
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.re_password}
          type={passwordVisibility ? "text" : "password"}
          error={!!touched.re_password && !!errors.re_password}
          helperText={(touched.re_password && errors.re_password) as string}
          InputProps={{
            endAdornment: (
              <EyeToggleButton
                show={passwordVisibility}
                click={togglePasswordVisibility}
              />
            ),
          }}
        />
        <FormControlLabel
          name="agreement"
          className="agreement"
          onChange={handleChange}
          control={
            <Checkbox
              size="small"
              color="primary"
              disabled={load || userLoad}
              checked={values.agreement || false}
            />
          }
          label={
            <FlexBox
              flexWrap="wrap"
              alignItems="center"
              justifyContent="flex-start"
              position={"relative"}
            >
              <H6 sx={{ color: "black", fontSize: "12px" }}>
                {" "}
                By signing up, you agree to
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Span
                    ml={0.4}
                    borderBottom="1px solid"
                    borderColor="grey.900"
                  >
                    Terms & Condtion
                  </Span>
                </a>
              </H6>
              {touched.agreement && errors.agreement && (
                <Span
                  marginLeft={2}
                  color={"maroon"}
                  sx={{
                    position: "absolute",
                    bottom: "-20px",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    marginLeft: "-25px",
                  }}
                >
                  {"*"}
                  {errors.agreement}
                </Span>
              )}
            </FlexBox>
          }
        />

        <Button
          fullWidth
          type="submit"
          //color="dark"
          variant="contained"
          disabled={load || userLoad}
          sx={{ height: 44 }}
        >
          Create Account
        </Button>
      </form>

      <SocialButtons message="Registered successfully" setLoad={setLoad} />
      <FlexRowCenter mt="1.25rem">
        <Box>Already have an account?</Box>

        <H6
          onClick={() => handleSetType("LOGIN")}
          sx={{ cursor: "pointer" }}
          ml={1}
          borderBottom="1px solid"
          borderColor="grey.900"
        >
          Login
        </H6>
      </FlexRowCenter>
    </Wrapper>
  );
};

const initialValues: TUserRegisterRequest = {
  email: "",
  password: "",
  re_password: "",
  role: Role.User,
  type: RegisterType.Self,
  agreement: false,
};

const formSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please re-type password"),
  agreement: yup
    .boolean()
    .required("You have to agree with our Terms and Conditions!")
    .oneOf([true], "You have to agree with our Terms and Conditions!"),
});

export default Signup;
