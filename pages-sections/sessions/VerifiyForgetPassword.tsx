import { H3 } from "@/components/Typography";
import useUserService from "@/hooks/useUserService";
import { IUserResponse } from "@/interface/IUserResponse";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useSpring, animated } from "react-spring";

const VerifiyForgetPassword: FC<{
  email: string;
  setActiveStep: any;
  setCode: Dispatch<SetStateAction<string>>;
}> = ({ email, setActiveStep, setCode }) => {
  const containerStyle = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });
  const { onResetPasswordCodeCheck } = useUserService();
  const handleFormSubmit = async () => {
    const result = (await onResetPasswordCodeCheck({
      code: values.code,
      email: email,
    })) as IUserResponse;
    if (result.success) {
      setActiveStep(2);
      setCode(values.code);
    } else {
      setFieldError("code", "You have enter a wrong code");
    }
  };
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldError,
    setFieldTouched,
    touched,
    errors,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues: initialValues,
  });

  return (
    <animated.div
      style={containerStyle}
      className="row flex-row-reverse m-auto"
    >
      <H3 textAlign={"center"} my={2}>
        A Code Has Been Sent To Your Email
      </H3>

      <form className="d-grid mt-3" autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          sx={{ mb: 2.75 }}
          fullWidth
          name="code"
          size="small"
          inputProps={{
            inputMode: "numeric",
          }}
          type="text"
          onBlur={handleBlur}
          onChange={handleChange}
          label="Code"
          error={!!errors.code}
          helperText={errors.code as string}
        />

        <Button type="submit" fullWidth>
          Verifiy Code
        </Button>
      </form>
    </animated.div>
  );
};

export default VerifiyForgetPassword;
const initialValues = {
  code: "",
};
