import useUserService from "@/hooks/useUserService";
import { IUserResponse } from "@/interface/IUserResponse";
import { LoadingButton } from "@mui/lab";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { Dispatch, FC, SetStateAction } from "react";
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
  const { onResetPasswordCodeCheck, userLoad } = useUserService();
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
    errors,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues: initialValues,
  });

  return (
    <animated.div
      style={containerStyle}
      className="row flex-row-reverse m-auto  px-8"
    >
      <h1 className="mt-8 text-center text-2xl">
        A Code Has Been Sent To Your Email
      </h1>

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

        <LoadingButton
          type="submit"
          fullWidth
          color="primary"
          loading={userLoad}
          disabled={userLoad}
        >
          Verifiy Code
        </LoadingButton>
      </form>
    </animated.div>
  );
};

export default VerifiyForgetPassword;
const initialValues = {
  code: "",
};
