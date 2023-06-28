import * as yup from "yup";

const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export const AddressValidationSchema = yup.object().shape({
  email: yup
    .string()
    .matches(regex, "Invalid Email")
    .required("Field is required"),
  firstName: yup.string().required("Field is required"),
  phoneNumber: yup
    .string()
    .nullable()
    .matches(phoneRegExp, "Invalid Phone Number")
    .required("Field is required"),
  lastName: yup.string().required("Field is required"),
  country: yup.string().required("Field is required"),
  state: yup.string().nullable().required("Field is required"),
  addressLine: yup.string().required("Field is required"),
});

export const loginSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  email: yup.string().email("invalid email").required("Email is required"),
});

export const registerSchema = yup.object().shape({
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
