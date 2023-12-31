"use client";
import React, { useCallback, useState } from "react";
import { Wrapper } from "../shared";
import Image from "next/image";
import { Box, Checkbox, FormControlLabel, TextField } from "@mui/material";
import EyeToggleButton from "@/pages-sections/auth/shared/EyeToggleButton";
import { FlexBox, FlexRowCenter } from "@/components/flex-box";
import { H6, Span } from "@/components/Typography";
import { useFormik } from "formik";
import { registerSchema } from "@/utils/schema";
import { TUserRegisterRequest } from "@/types/TUserRegisterRequest";
import { RegisterType, Role } from "@/types/TUser";
import Link from "next/link";
import { LoadingButton } from "@mui/lab";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import SocialButtons from "@/pages-sections/auth/shared/SocialButtons";

export default function RegisterClientPage() {
  const [loading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = async (values: TUserRegisterRequest) => {
    setLoading(true);
    var newUser = {
      email: values.email,
      password: values.password,
      isNewUser: "yes",
    };
    signIn("credentials", {
      ...newUser,
      redirect: false,
    })
      .then(async (callback) => {
        if (callback?.ok) {
          toast.success("Registered Successfully");
        }
        if (callback?.error) {
          toast.error(callback.error);
        }
      })
      .catch((e) => {
        toast.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: registerSchema,
    });

  return (
    <Wrapper
      elevation={3}
      passwordVisibility={passwordVisibility}
      role={"drawer"}
      sx={{ margin: "20px auto", paddingTop: "5px" }}
    >
      <div className="flex min-h-full flex-col justify-center  ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm pb-4">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register a new account
          </h2>
        </div>

        <SocialButtons setLoad={setLoading} message="Logged in successfully" />
        <div className="or-separator_contain">
          <p className="or-separator_or">OR</p>
        </div>
        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <TextField
              disabled={loading}
              fullWidth
              name="email"
              size="small"
              type="email"
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              label="Email"
              placeholder="example@mail.com"
              error={!!touched.email && !!errors.email}
              helperText={(touched.email && errors.email) as string}
            />

            <TextField
              fullWidth
              disabled={loading}
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
              disabled={loading}
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
                  disabled={loading}
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
                    <Link
                      href="/support-related/terms-and-conditions"
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
                    </Link>
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

            <LoadingButton
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              disabled={loading}
              loading={loading}
              loadingPosition="end"
              sx={{ height: 44 }}
            >
              Create Account
            </LoadingButton>
            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold leading-6  text-gray-700 underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Wrapper>
  );
}

const initialValues: TUserRegisterRequest = {
  email: "",
  password: "",
  re_password: "",
  role: Role.User,
  type: RegisterType.Self,
  agreement: false,
};
