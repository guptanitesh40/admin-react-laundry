import * as Yup from "yup";

export const branchSchema = Yup.object().shape({
  branch_name: Yup.string().required("Branch name is required"),

  branch_address: Yup.string().required("Please add branch address"),

  branch_phone_number: Yup.string()
    .nullable()
    .test("required", "Please add phone number", (value) => {
      if (value === null || value === "") return false;
      return true;
    })
    .test("is-numeric", "Phone number must be a positive number", (value) => {
      if (!value) return true;
      return /^[0-9+\-\s()]{5,15}$/.test(value);
    })
    .test("length", "Phone number must be between 5 to 15 long", (value) => {
      if (!value) return true;
      return value.length >= 5 && value.length <= 15;
    }),

  branch_mobile_number: Yup.string()
    .nullable()
    .test("is-numeric", "Phone number must be a positive number", (value) => {
      if (!value) return true;
      return /^[0-9+\-\s()]{5,15}$/.test(value);
    })
    .test("length", "Phone number must be between 5 to 15 long", (value) => {
      if (!value) return true;
      return value.length >= 5 && value.length <= 15;
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
