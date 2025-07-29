import * as Yup from "yup";

export const ourServiceSchema = (isEditing: boolean) =>
  Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .max(50, "Title must be at most 50 characters"),
    image: isEditing
      ? Yup.mixed()
      : Yup.mixed()
          .test("image-validation", "Image is required", (value) => {
            if (!value) return false;
            if (!(value instanceof File)) return false;
            const validTypes = ["image/jpeg", "image/jpg", "image/png"];
            return validTypes.includes(value.type);
          })
          .test("fileType", "Invalid image format", (value) => {
            if (!value || !(value instanceof File)) return true;
            const validTypes = ["image/jpeg", "image/jpg", "image/png"];
            return validTypes.includes(value.type);
          }),
  });
