import * as Yup from "yup";

export const priceSchema = Yup.object().shape({
  category_name: Yup.string()
  .required("Category is required"),
  service_names: Yup.array()
    .min(1, "Please select service name")
    .required("Please select servuce name"),
  price: Yup.number()
    .typeError("Maximum usage per user must be a number")
    .required("Please enter price"),
});
