import * as Yup from "yup";

export const addressSchema = Yup.object().shape({
  pincode: Yup.string()
    .required("Pin Code is required")
    .matches(/^[0-9]{6}$/, "Pincode must be 6 digit"),
  address_type: Yup.number().required("Address type is required"),
  building_number: Yup.string().required("Building number is required"),
  area: Yup.string().required("Area is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  landmark: Yup.string().required("Landmark is required"),
});
