import * as Yup from "yup";

type FileValue = File | null;

export const productSchema = (
  editMode: boolean
): Yup.ObjectSchema<any, any, any> =>
  Yup.object().shape({
    name: Yup.string()
      .required("Name cannot be empty")
      .test("required", "Name cannot be empty", (value) => !!value)
      .max(30, "Maximum length of 30 characters exceeded"),

    image: Yup.mixed<FileValue>()
      .test("required", "Image is required", function (value) {
        if (editMode) {
          return true;
        }
        return value instanceof File;
      })
      .test("fileType", "Allowed Format : jpg, jpeg, png, ", (value) => {
        if (value && value instanceof File) {
          return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
        }
        return true;
      })
      .test("dimensions", "image dimention 85×85 pixels allowed", (value) => {
        if (!value || !(value instanceof File)) {
          return true;
        } 
        return new Promise((resolve) => {
          const img = new Image();
          img.src = URL.createObjectURL(value);

          img.onload = () => {
            URL.revokeObjectURL(img.src);
            resolve(img.width === 85 && img.height === 85);
          };

          img.onerror = () => {
            resolve(false);
          };
        });
      })
      .nullable(),
  });
