import * as Yup from "yup";

type FileValue = File | null;

export const companySchema = Yup.object().shape({
  company_name: Yup.string()
    .required("Company name is required")
    .test("required", "Company name is required", (value) => !!value),

  address: Yup.string()
    .required("Address is required")
    .test("required", "Address is required", (value) => !!value),

  city: Yup.string()
    .required("City is required")
    .test("required", "City is required", (value) => !!value),

  state: Yup.string()
    .required("State is required")
    .test("required", "State is required", (value) => !!value),

  zip_code: Yup.string()
    .test("required", "Zip Code is required", (value) => {
      if (value === null || value === '') return false; 
      return true; 
    })
    .test("format", "Zip Code must be a number", (value) => {
      if (value === null || value === '') return true;
      return /^[0-9]+$/.test(value);
    }),

  company_owner_name: Yup.string()
    .required("Company Owner Name is required")
    .test("required", "Company Owner Name is required", (value) => !!value),

  phone_number: Yup.string()
    .nullable()
    .test("format", "Phone Number must be a 10-digit number", (value) => {
      if (value === null || value === '') return true; 
      return /^[0-9]{10}$/.test(value);
    })
    .test("required", "Phone Number is required", (value) => {
      if (value === null || value === '') return false; 
      return true;
    }),

  mobile_number: Yup.string()
    .required("Mobile Number is required")
    .matches(/^[0-9]{10}$/, "Mobile Number must be a 10-digit number")
    .test("required", "Mobile Number is required", (value) => !!value)
    .test("format", "Mobile Number must be a 10-digit number", (value) => {
      if (!value) return true; 
      return /^[0-9]{10}$/.test(value);
    }),

  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address")
    .test("required", "Email is required", (value) => !!value),

    logo: Yup.mixed<FileValue>()
    .nullable()
    .required("Logo is required")
    .test("fileSize", "Logo file is too large", (value) => {
      if (!value) return true;
      if (value instanceof File) {
        return value.size <= 2000000; 
      }
      return true;
    })
    .test("fileType", "Unsupported logo format", (value) => {
      if (!value) return true; 
      if (value instanceof File) {
        return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
      }
      return true;
    }),

  registration_number: Yup.string()
    .nullable()
    .test("required", "Registration Number is required", (value) => !!value),

  registration_date: Yup.date()
    .nullable()
    .required("Please select the registration date")
    .typeError("Please select the registration date")
    .max(new Date(), "Registration Date cannot be in the future"),

  gstin: Yup.string()
    .nullable()
    .test("required", "GSTIN is required", (value) => !!value),

  company_ownedby: Yup.string()
    .test("required", "Company Owned By is required", (value) => {
      if (value === null || value === '') return false; 
      return true; 
    })
    .test("format", "Company Owned By must be a number", (value) => {
      if (value === null || value === '') return true;
      return /^[0-9]+$/.test(value);
    }),

  contract_document: Yup.mixed<FileValue>()
    .nullable()
    .test("fileSize", "File is too large", (value) => {
      if (!value) return true;
      if (value instanceof File) {
        return value.size <= 5000000; 
      }
      return true;
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (!value) return true;
      if (value instanceof File) {
        return ["application/pdf"].includes(value.type);
      }
      return true;
    })
});
