import * as Yup from "yup";

export const mobileNumberSchema = Yup.object().shape({
  mobileNumber: Yup.string().required("Mobile number is required").matches(/^\d{10}$/, "Invalid mobile number"),
});

export const otpSchema = Yup.object().shape({
  mobileNumber: Yup.string().required(),
  otp: Yup.string().required("OTP is required").length(6, "OTP must be 6 digits"),
});

export const resetPasswordSchema = Yup.object().shape({
  mobileNumber: Yup.string().required(),
  otp: Yup.string().required(),
  newPassword: Yup.string().required("New password is required").min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});
