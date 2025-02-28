import * as Yup from "yup";

export const branchSchema = Yup.object().shape({
  branch_name: Yup.string().required("Branch name is required"),

  branch_address: Yup.string().required("Please add branch address"),

  branch_phone_number: Yup.string()
    .nullable()
    .test("required", "Please add mobile number", (value) => {
      if (value === null || value === "") return false;
      return true;
    })
    .test("is-numeric", "Mobile number must be a positive number", (value) => {
      if (!value) return true;
      return /^\d+$/.test(value);
    }),

  branch_email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email")
    .test("required", "Email is required", (value) => !!value),

  branch_registration_number: Yup.string()
    .nullable()
    .test(
      "required",
      "Branch registration number is required",
      (value) => !!value
    ),

  company_id: Yup.number()
    .required("Please select company")
    .test("required", "Please select company", (value) => !!value),
});