import * as Yup from "yup";


export const searchSchema = Yup.object().shape({
  search: Yup.string().max(
    50,
    "Max search input length exceeded by 50 characters"
  ),
});

