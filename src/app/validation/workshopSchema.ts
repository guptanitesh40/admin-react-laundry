import * as Yup from "yup";

export const workshopSchema = Yup.object().shape({
  workshop_name: Yup.string().required("Workshop name is required"),
  address: Yup.string().required("Workshop address is required"),
  email: Yup.string().email("Enter a valid email"),
  mobile_number: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  workshop_managers_ids: Yup.array()
    .min(1, "Please select at least workshop manager")
    .required("Please select workshop manager"),
});
