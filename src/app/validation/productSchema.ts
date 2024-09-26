import * as Yup from "yup";

type FileValue = File | null;

export const productSchema = (editMode: boolean): Yup.ObjectSchema<any, any, any> => 
  Yup.object().shape({
    name: Yup.string()
      .required("Name cannot be empty")
      .test("required", "Name cannot be empty", (value) => !!value),

    image: Yup.mixed<FileValue>()
      .test("required", "Image is required", function (value) {
        if (editMode) {
          return true; 
        }
        return value instanceof File; 
      })
      .test("fileSize", "File too large", (value) => {
        if (value && value instanceof File) {
          return value.size <= 2000000; 
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
