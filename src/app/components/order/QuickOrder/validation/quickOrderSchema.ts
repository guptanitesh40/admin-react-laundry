import * as Yup from "yup";

const quickOrderSchema = Yup.object().shape({
  company_id: Yup.number().required("Company is required"),
  branch_id: Yup.number().required("Branch is required"),
  user_id: Yup.number().required("User is required"),
  username: Yup.string().trim().required("Username is required"),
  address_id: Yup.number().required("Address is required"),
  description: Yup.string()
    .trim()
    .nullable()
    .max(500, "Order note must not exceed 500 characters"),

  payment_type: Yup.number().required("Payment type is required"),

  gstin: Yup.string()
    .trim()
    .nullable()
    .when([], {
      is: (value: any) => !!value,
      then: (schema) =>
        schema.matches(
          /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
          "Invalid GSTIN format"
        ),
    }),

  gst_company_name: Yup.string().trim().nullable(),
});

export { quickOrderSchema };
