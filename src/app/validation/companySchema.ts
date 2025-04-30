import * as Yup from "yup";

type FileValue = File | null;

export const companySchema = (isEdit: boolean = false) => {
  return Yup.object().shape({
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
        if (value === null || value === "") return false;
        return true;
      })
      .test("format", "Zip Code must be a 6 digit number", (value) => {
        if (value === null || value === "") return true;
        return /^[0-9]{6}$/.test(value);
      }),

    company_owner_name: Yup.string()
      .required("Company Owner Name is required")
      .test("required", "Company Owner Name is required", (value) => !!value),

    phone_number: Yup.string()
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

    mobile_number: Yup.string()
      .nullable()
      .test("is-numeric", "Phone number must be a positive number", (value) => {
        if (!value) return true;
        return /^[0-9+\-\s()]{5,15}$/.test(value);
      })
      .test("length", "Phone number must be between 5 to 15 long", (value) => {
        if (!value) return true;
        return value.length >= 5 && value.length <= 15;
      }),

    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email")
      .test("required", "Email is required", (value) => !!value),

    website: Yup.string()
      .nullable()
      .url("Please enter a valid website URL")
      .test("required", "Website URL is required", (value) => !!value),

    logo: Yup.mixed<FileValue>()
      .nullable()
      .test("required", "Logo is required", (value) => {
        if (!isEdit) {
          return !!value;
        }
        return true;
      })
      .test("fileType", "Allowed Format : jpg, jpeg, png, ", (value) => {
        if (value && value instanceof File) {
          return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
        }
        return true;
      })
      .test("dimensions", "Logo must be 92×92 pixels", (value) => {
        if (!value || !(value instanceof File)) {
          return true;
        }
        return new Promise((resolve) => {
          const img = new Image();
          img.src = URL.createObjectURL(value);

          img.onload = () => {
            URL.revokeObjectURL(img.src);
            resolve(img.width === 92 && img.height === 92);
          };

          img.onerror = () => {
            resolve(false);
          };
        });
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

    gst_percentage: Yup.number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .min(0, "GST Percentage cannot be less than 0")
      .max(100, "GST Percentage cannot be more than 100")
      .typeError("GST Percentage must be a number")
      .required("GST Percentage is required"),

    hsn_sac_code: Yup.string()
      .matches(/^\d+$/, "HSN/SAC Code must contain only digits")
      .required("HSN/SAC Code is required"),

    company_ownedby: Yup.string()
      .nullable()
      .test("required", "Company Owned By is required", (value) => {
        if (value === null || value === "") return false;
        return true;
      })
      .test("format", "Company Owned By must be a number", (value) => {
        if (value === null || value === "") return true;
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
      }),

    msme_number: Yup.string()
      .trim()
      .min(8, "MSME number must be at least 8 characters")
      .max(20, "MSME number must be at most 20 characters")
      .matches(/^[a-zA-Z0-9-]+$/, "MSME number must be alphanumeric")
      .required("MSME number is required"),

    signature_image: Yup.mixed<FileValue>()
      .nullable()
      .test("required", "Auth signature image is required", (value) => {
        if (!isEdit) {
          return !!value;
        }
        return true;
      })
      .test("fileType", "Allowed Format : jpg, jpeg, png, ", (value) => {
        if (value && value instanceof File) {
          return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
        }
        return true;
      }),
  });
};
