import * as Yup from "yup";

export const userSchema = (isEdit: boolean) => {
  return Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Enter a valid email"),
    password: isEdit
      ? Yup.string().test(
          "password-validation",
          "Password must be at least 6 characters",
          function (value) {
            if (value && value.length > 0) {
              return value.length >= 6;
            }
            return true;
          }
        )
      : Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
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
    branch_ids: Yup.array().when("role_id", {
      is: (value: number) => value === 3,
      then: (schema) =>
        schema
          .min(1, "Please select at least one branch")
          .required("Please select a branch"),
      otherwise: (schema) => schema,
    }),
  });
};
