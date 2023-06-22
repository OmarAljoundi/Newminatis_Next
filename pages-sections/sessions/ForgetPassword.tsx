import { H1 } from "@/components/Typography";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { useSpring, animated } from "react-spring";

const ForgetPassword: FC<{
  setActiveStep: any;
}> = ({ setActiveStep }) => {
  const containerStyle = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  const handleFormSubmit = async () => {
    setActiveStep(1);
  };
  const {
    values,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    isValid,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues: initialValues,
  });

  return (
    <animated.div
      style={containerStyle}
      className="row flex-row-reverse m-auto"
    >
      <H1 textAlign={"center"} my={2}>
        {" "}
        Reset Your Password
      </H1>

      <form className="d-grid mt-3" autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          sx={{ mb: 2.75 }}
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

        <Button type="submit" color="dark" fullWidth>
          Send Code
        </Button>
      </form>
    </animated.div>
  );
};

export default ForgetPassword;
const initialValues = {
  email: "",
};
