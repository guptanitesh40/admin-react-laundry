import * as Yup from "yup";

export const userSchema = (isEdit: boolean = false) => {
  return Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
    .email("Enter a valid email"),
    password: isEdit
      ? Yup.string().min(6, "Password must be at least 6 characters")
      : Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    mobile_number: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    gender: Yup.number().required("Gender is required"),
    role_id: Yup.number().required("Role is required"),
  });
};
