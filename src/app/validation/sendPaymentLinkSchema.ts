import * as yup from "yup";

export const sendPaymentLinkSchema = yup.object().shape({
  user_id: yup.number().required("Please select customer"),
  amount: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : Number(originalValue)
    )
    .typeError("Amount must be a valid number")
    .min(1, "Min amount is 1 or more")
    .required("Amount is required"),
  customer: yup.object().shape({
    contact: yup
      .string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits number")
      .required("Mobile number is required"),
    email: yup
      .string()
      .transform((value) => (value === "" ? undefined : value))
      .optional()
      .nullable()
      .email("Please enter valid email address"),
  }),
});
