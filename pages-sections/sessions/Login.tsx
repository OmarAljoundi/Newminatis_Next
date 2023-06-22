import { useCallback, useState, FC } from "react";
import { Button, Card, CardProps, Box, styled, TextField } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import SocialButtons from "./SocialButtons";
import EyeToggleButton from "./EyeToggleButton";
import Cookies from "js-cookie";
import { SetUser } from "@/store/Auth/Auth-action";
import { H1, H6 } from "@/components/Typography";
import { FlexBox, FlexRowCenter } from "@/components/flex-box";
import useUserService from "@/hooks/useUserService";
import { useAppDispatch } from "@/hooks/useRedux";
import { RegisterType, TUser } from "@/types/TUser";
import { IUserResponse } from "@/interface/IUserResponse";
import BackdropLoading from "@/components/loading/BackdropLoading";

const fbStyle = { background: "#3B5998", color: "white" };
const googleStyle = { background: "#4285F4", color: "white" };

type WrapperProps = { passwordVisibility?: boolean };

export const Wrapper = styled<FC<WrapperProps & CardProps>>(
  ({ children, passwordVisibility, ...rest }) => (
    <Card {...rest}>{children}</Card>
  )
)<CardProps>(({ theme, passwordVisibility }) => ({
  width: 500,
  padding: "2rem 3rem",
  [theme.breakpoints.down("sm")]: { width: "100%", padding: "2rem 1.5rem" },
  ".passwordEye": {
    color: passwordVisibility
      ? theme.palette.grey[600]
      : theme.palette.grey[400],
  },
  ".facebookButton": { marginBottom: 10, ...fbStyle, "&:hover": fbStyle },
  ".googleButton": { ...googleStyle, "&:hover": googleStyle },
  ".agreement": { marginTop: 12, marginBottom: 24 },
}));

type Prop = {
  onClose: () => void;
  handleSetType: (type: string) => void;
};
const Login: FC<Prop> = ({ onClose, handleSetType }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { onAuthByEmail, userLoad } = useUserService();
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);
  const [load, setLoad] = useState(false);
  const dispatch = useAppDispatch();
  //const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const handleFormSubmit = async (values: TUser) => {
    values.type = RegisterType.Self;
    const result = (await onAuthByEmail(values)) as IUserResponse;
    if (result.success) {
      dispatch(SetUser(result.user));
      Cookies.set("token", result.token);
      onClose();
      // enqueueSnackbar('Logged in successfully', {
      //     autoHideDuration: 3000,
      //     action: (key) => (
      //         <SnakeBarDismiss closeSnackbar={() => closeSnackbar(key)} />
      //     ),
      // })
    } else {
      // enqueueSnackbar(result.message, {
      //     autoHideDuration: 3000,
      //     action: (key) => (
      //         <SnakeBarDismiss closeSnackbar={() => closeSnackbar(key)} />
      //     ),
      // })
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
          Login To Newminatis Shop
        </H1>

        <TextField
          sx={{ mb: 2.75 }}
          fullWidth
          disabled={load || userLoad}
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
          size="small"
          disabled={load || userLoad}
          name="password"
          label="Password"
          autoComplete="on"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          placeholder="*********"
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

        <Button
          fullWidth
          disabled={load || userLoad}
          type="submit"
          //color="dark"
          variant="contained"
          sx={{ height: 44 }}
        >
          Login
        </Button>
      </form>

      <SocialButtons
        onClose={onClose}
        message="Logged in successfully"
        setLoad={setLoad}
      />

      <FlexRowCenter mt="1.25rem">
        <Box>Not a member yet?</Box>
        <H6
          ml={1}
          borderBottom="1px solid"
          borderColor="grey.900"
          onClick={() => handleSetType("REGISTER")}
          sx={{ cursor: "pointer" }}
        >
          Join the community
        </H6>
      </FlexRowCenter>

      <FlexBox
        justifyContent="center"
        bgcolor="grey.200"
        borderRadius="4px"
        py={2.5}
        mt="1.25rem"
        color={"white"}
      >
        Forgot your password?
        <H6
          ml={1}
          borderBottom="1px solid"
          color={"white"}
          onClick={() => handleSetType("RESET")}
          sx={{ cursor: "pointer" }}
          fontFamily={"Semi-Bold"}
        >
          Reset It
        </H6>
      </FlexBox>
    </Wrapper>
  );
};

const initialValues = {
  email: "",
  password: "",
};

const formSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  email: yup.string().email("invalid email").required("Email is required"),
});

export default Login;
