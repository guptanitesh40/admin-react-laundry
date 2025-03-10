import * as Yup from "yup";

export const userSchema = (isEdit: boolean) => {
  return Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Enter a valid email"),
    mobile_number: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    gender: Yup.number().required("Please select gender"),
    role_id: Yup.number().required("Please select role"),
    company_ids: Yup.array().when("role_id", {
      is: (value: number) => value === 2,
      then: (schema) =>
        schema
          .min(1, "Please select at least one company")
          .required("Please select a company"),
      otherwise: (schema) => schema,
    }),
  });
};

export const customerSchema = () => {
  return Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email")
      .test("required", "Email is required", (value) => !!value),
    mobile_number: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits number")
      .required("Mobile number is required"),

    gender: Yup.number().required("Please select gender"),
  });
};
