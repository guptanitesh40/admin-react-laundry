import * as yup from "yup";

export const sendPaymentLinkSchema = yup.object().shape({
  user_id: yup.number().required("Please select customer"),
  amount: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : Number(originalValue);
    })
    .required("Amount is required")
    .positive("Amount must be a positive number")
    .typeError("Amount must be a valid number"),
  customer: yup.object().shape({
    contact: yup
      .string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits number")
      .required("Mobile number is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
  }),
});
