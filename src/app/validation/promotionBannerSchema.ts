import * as Yup from "yup";

type FileValue = File | null;

export const promotionBannerSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  price: Yup.number()
    .required("Please enter price")
    .typeError("Price must be a number")
    .min(0, "Price must be a positive number"),

  promotion_code: Yup.string()
    .notRequired()
    .matches(
      /^[a-zA-Z0-9]*$/,
      "Coupon code can only contain letters and numbers"
    )
    .test(
      "length",
      "Coupon code must be between 3 and 30 characters long",
      (value) => !value || (value.length >= 3 && value.length <= 30)
    )
    .nullable(),

  image: Yup.mixed<FileValue>()
    .test("fileSize", "Allowed Size : 300 * 425", (value) => {
      if (value && value instanceof File) {
        return value.size <= 2 * 300 * 425;
      }
      return true;
    })
    .test("fileType", "Allowed Format : jpg, jpeg, png, ", (value) => {
      if (value && value instanceof File) {
        return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
      }
      return true;
    })
    .nullable(),
});
