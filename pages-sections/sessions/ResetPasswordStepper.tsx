import { Button, Step, StepLabel, Stepper, TextField } from "@mui/material";
import { maxWidth } from "@mui/system";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

import ForgetPassword from "./ForgetPassword";
import { Wrapper } from "./Login";
import PasswordChange from "./PasswordChanged";
import ResetPassword from "./ResetPassword";
import VerifiyForgetPassword from "./VerifiyForgetPassword";
import * as yup from "yup";
import useUserService from "@/hooks/useUserService";
import { IUserResponse } from "@/interface/IUserResponse";
import BackdropLoading from "@/components/loading/BackdropLoading";
import { H1 } from "@/components/Typography";
import {
  ColorlibConnector,
  ColorlibStepIcon,
  Steps,
  labelStyle,
} from "./PasswordStepperStyle";
type Prop = {
  onClose: () => void;
  handleSetType: (type: string) => void;
};
const ResetPasswordStepper: FC<Prop> = ({ handleSetType, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [code, setCode] = useState("");
  const { onResetPasswordRequest, userLoad } = useUserService();

  useEffect(() => {
    return () => {
      handleSetType("LOGIN");
    };
  }, []);

  const containerStyle = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  const handleFormSubmit = async (value: any) => {
    const result = (await onResetPasswordRequest(value.email)) as IUserResponse;
    if (result.success) {
      setActiveStep(1);
    }
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues: initialValues,
      validationSchema: formSchema,
    });
  return (
    <Wrapper elevation={3} role={"drawer"} sx={{ margin: "auto" }}>
      <BackdropLoading open={userLoad} />

      <Stepper
        className="pt-5"
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {Steps.map((step) => (
          <Step key={step.header}>
            <StepLabel
              className="steperLabel"
              StepIconComponent={ColorlibStepIcon}
              sx={labelStyle}
            ></StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep == 0 && (
        <animated.div
          style={containerStyle}
          className="row flex-row-reverse m-auto"
        >
          <H1 textAlign={"center"} my={2}>
            {" "}
            Reset Your Password
          </H1>

          <form
            className="d-grid mt-3"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              sx={{ mb: 2.75 }}
              fullWidth
              name="email"
              size="small"
              type="text"
              inputProps={{
                inputMode: "email",
              }}
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              label="Email"
              placeholder="exmple@mail.com"
              error={!!touched.email && !!errors.email}
              helperText={(touched.email && errors.email) as string}
            />

            <Button type="submit" fullWidth>
              Send Code
            </Button>
          </form>
        </animated.div>
      )}
      {activeStep == 1 ? (
        <VerifiyForgetPassword
          email={values.email}
          setCode={setCode}
          setActiveStep={setActiveStep}
        />
      ) : null}
      {activeStep == 2 ? (
        <ResetPassword
          email={values.email}
          code={code}
          setActiveStep={setActiveStep}
        />
      ) : null}
      {activeStep == 3 ? (
        <PasswordChange handleSetType={handleSetType} />
      ) : null}
    </Wrapper>
  );
};

export default ResetPasswordStepper;
const initialValues = {
  email: "",
};

const formSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("Email is required"),
});
