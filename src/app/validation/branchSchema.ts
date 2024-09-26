import * as Yup from "yup";

export const branchSchema = Yup.object().shape({
  branch_name: Yup.string().required("Branch name is required"),

  branch_address: Yup.string().required("Branch address is required"),

  branch_manager_id: Yup.string()
  .test("required", "branch manager id is required", (value) => {
    if (value === null || value === '') return false; 
    return true; 
  })
  .test("format", "branch manager id must be a number", (value) => {
    if (value === null || value === '') return true;
    return /^[0-9]+$/.test(value);
  }),

  branch_phone_number: Yup.string()
    .nullable()
    .test("format", "Phone Number must be a 10-digit number", (value) => {
      if (value === null || value === "") return true;
      return /^[0-9]{10}$/.test(value);
    })
    .test("required", "Phone Number is required", (value) => {
      if (value === null || value === "") return false;
      return true;
    }),
    
  branch_email: Yup.string()
    .required("Branch email is required")
    .email("Invalid email address"),

  branch_registration_number: Yup.string()
    .nullable()
    .test(
      "required",
      "Branch registration number is required",
      (value) => !!value
    ),

  company_id: Yup.number()
    .typeError("Company ID must be a number")
    .required("Company ID is required")
    .positive("Company ID must be a positive number")
    .integer("Company ID must be an integer")
    .test("required", "Company id must be a number", (value) => !!value),
});
