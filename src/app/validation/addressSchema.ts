import * as Yup from "yup";

export const addressSchema = Yup.object().shape({
  pincode: Yup.string()
    .optional()
    .test(
      "is-valid-pincode",
      "Pincode must be exactly 6 digits",
      (value) => !value || /^[0-9]{6}$/.test(value)
    ),
  address_type: Yup.number()
    .typeError("Address type is required")
    .required("Address type is required"),
  building_number: Yup.string().required("House number is required"),
  area: Yup.string().required("Area is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
});
