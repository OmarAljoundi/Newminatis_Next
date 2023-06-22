import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { FC, useCallback, useState } from "react";
import { useSpring, animated } from "react-spring";
import * as yup from "yup";
import EyeToggleButton from "./EyeToggleButton";
import useUserService from "@/hooks/useUserService";
import { IUserResponse } from "@/interface/IUserResponse";
import { H3 } from "@/components/Typography";
const ResetPassword: FC<{
  email: string;
  setActiveStep: any;
  code: string;
}> = ({ email, setActiveStep, code }) => {
  const containerStyle = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });
  const { onResetPassword } = useUserService();
  const { userLoad } = useUserService();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = async () => {
    const result = (await onResetPassword({
      code: code,
      email: email,
      password: values.password,
    })) as IUserResponse;
    if (result.success) {
      setActiveStep(3);
    }
  };

  const initialValues = {
    email: email,
    password: "",
    re_password: "",
  };
  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues: initialValues,
      validationSchema: formSchema,
    });

  return (
    <animated.div style={containerStyle} className="container">
      <H3 textAlign={"center"} my={2}>
        Enter your new password
      </H3>

      <form className="d-grid mt-3" autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          sx={{ mb: 2.75 }}
          fullWidth
          disabled={userLoad}
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
          disabled={userLoad}
          sx={{ mb: 2.75 }}
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

        <Button type="submit" fullWidth>
          Reset Password
        </Button>
      </form>
    </animated.div>
  );
};

export default ResetPassword;

const formSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please re-type password"),
});
