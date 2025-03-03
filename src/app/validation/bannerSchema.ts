import * as Yup from "yup";

type FileValue = File | null;

export const bannerSchema = (
  editMode: boolean
): Yup.ObjectSchema<any, any, any> =>
  Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .test("required", "Title is required", (value) => !!value)
      .max(50, "Max title length exceeded by 50 characters"),

    description: Yup.string()
      .required("Description is required")
      .test("required", "Description is required", (value) => !!value)
      .max(255, "Max description length exceeded by 255 characters"),

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
      .test(
        "dimensions",
        "Max image dimention 300×425 pixels allowed",
        (value) => {
          if (!value || !(value instanceof File)) {
            return true;
          }

          return new Promise((resolve) => {
            const img = new Image();
            img.src = URL.createObjectURL(value);

            img.onload = () => {
              URL.revokeObjectURL(img.src);
              resolve(img.width <= 300 && img.height <= 425);
            };

            img.onerror = () => {
              console.error("Error loading image file.");
              resolve(false);
            };
          });
        }
      )
      .nullable(),
    banner_type: Yup.number().required("Please select banner type"),
  });
