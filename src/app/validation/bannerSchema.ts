import * as Yup from "yup";

type FileValue = File | null;

export const bannerSchema = (editMode: boolean): Yup.ObjectSchema<any, any, any> =>
  Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .test("required", "Title is required", (value) => !!value)
      .max(50,"Max title length exceeded by 50 characters"),

    description: Yup.string()
      .required("Description is required")
      .test("required", "Description is required", (value) => !!value)
      .max(255,"Max description length exceeded by 255 characters"),

    image: Yup.mixed<FileValue>()
      .test(
        "required",
        "Image is required",
        function (value) {
          if (editMode) {
            return true; 
          }
          return value instanceof File; 
        }
      )
      .test("fileSize", "File is too large", (value) => {
        if (value && value instanceof File) {
          return value.size <= 2 * 1024 * 1024; 
        }
        return true; 
      })
      .test("fileType", "Unsupported file format", (value) => {
        if (value && value instanceof File) {
          return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
        }
        return true; 
      })
      .nullable(),
  });
