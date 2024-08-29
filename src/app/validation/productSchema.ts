import * as yup from "yup";

export const addItemSchema = yup.object({
  name: yup.string().required("Name cannot be empty"),
  image: yup
    .mixed()
    .required("Image is required")
    .test("fileSize", "File too large", (value) => {
      if (value && value instanceof FileList) {
        return value[0]?.size <= 2000000;
      }
      return false;
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (value && value instanceof FileList) {
        return ["image/jpg", "image/jpeg", "image/png"].includes(
          value[0]?.type
        );
      }
      return false;
    })
});

export const updateItemSchema = yup.object({
  image: yup
    .mixed()
    .nullable()
    .test("fileSize", "File too large", (value) => {
      if (value && value instanceof FileList) {
        return value[0]?.size <= 2000000;
      }
      return true; 
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (value && value instanceof FileList) {
        return ["image/jpg", "image/jpeg", "image/png"].includes(
          value[0]?.type
        );
      }
      return true;
    })
});
