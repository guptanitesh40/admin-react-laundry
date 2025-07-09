import * as Yup from "yup";

export const ourServiceSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(50, "Title must be at most 50 characters"),
  description: Yup.string()
    .required("Description is required")
    .max(150, "Description must be at most 150 characters"),
});
