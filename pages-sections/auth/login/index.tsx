"use client";
import EyeToggleButton from "@/pages-sections/sessions/EyeToggleButton";
import { TUser } from "@/types/TUser";
import { loginSchema } from "@/utils/schema";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { Wrapper } from "../shared";
import Link from "next/link";

export default function LoginClientPage() {
  const [loading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);
  const handleFormSubmit = async (values: TUser) => {
    var AuthUser = {
      email: values.email,
      password: values.password,
      isNewUser: "no",
    };
    setLoading(true);
    signIn("credentials", {
      ...AuthUser,
      redirect: false,
    })
      .then(async (callback) => {
        if (callback?.ok) {
          toast.success("Logged in");
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
      validationSchema: loginSchema,
    });

  return (
    <Wrapper
      elevation={3}
      passwordVisibility={passwordVisibility}
      role={"drawer"}
      sx={{ margin: "20px auto" }}
    >
      <div className="flex min-h-full flex-col justify-center py-12 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            width={90}
            height={70}
            className="mx-auto"
            src="/assets/images/logos/newminatis-LOGO-black.png"
            alt="Newminatis"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              disabled={loading}
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
              fullWidth
              size="small"
              disabled={loading}
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

            <LoadingButton
              fullWidth
              disabled={loading}
              loading={loading}
              loadingPosition="end"
              type="submit"
              color="primary"
              variant="contained"
              sx={{ height: 44 }}
            >
              Login
            </LoadingButton>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href="/auth/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create your account here
            </Link>
          </p>
        </div>
      </div>
    </Wrapper>
  );
}
const initialValues = {
  email: "",
  password: "",
};
