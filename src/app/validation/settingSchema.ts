import * as Yup from "yup";

export const settingSchema = Yup.object().shape({
  estimate_pickup_normal_hour: Yup.string()
    .notRequired()
    .test(
      "is-numeric",
      "Estimate pickup normal hour must be a positive number",
      (value) => {
        if (!value) return true;
        return /^\d+$/.test(value);
      }
    ),

  estimate_pickup_express_hour: Yup.string()
    .notRequired()
    .test(
      "is-numeric",
      "Estimate pickup express hour must be a positive number",
      (value) => {
        if (!value) return true;
        return /^\d+$/.test(value);
      }
    ),

  gst_percentage: Yup.string()
    .notRequired()
    .test("is-numeric", "GST percentage must be a positive number", (value) => {
      if (!value) return true;
      return /^\d+$/.test(value);
    }),

  estimate_delivery_normal_day: Yup.string()
    .notRequired()
    .test(
      "is-numeric",
      "Estimate delivery normal day must be a positive number",
      (value) => {
        if (!value) return true;
        return /^\d+$/.test(value);
      }
    ),

  estimate_delivery_express_day: Yup.string()
    .notRequired()
    .test(
      "is-numeric",
      "Estimate delivery express day must be a positive number",
      (value) => {
        if (!value) return true;
        return /^\d+$/.test(value);
      }
    ),

  normal_delivery_charges: Yup.string()
    .notRequired()
    .test(
      "is-numeric",
      "Normal delivery charge must be a positive number",
      (value) => {
        if (!value) return true;
        return /^\d+$/.test(value);
      }
    ),

  express_delivery_charge: Yup.string()
    .notRequired()
    .test(
      "is-numeric",
      "Express delivery charge must be a positive number",
      (value) => {
        if (!value) return true;
        return /^\d+$/.test(value);
      }
    ),

  express_delivery_24hrs: Yup.string()
    .notRequired()
    .test(
      "is-numeric",
      "Express delivery charge must be a positive number",
      (value) => {
        if (!value) return true;
        return /^\d+$/.test(value);
      }
    ),

  express_delivery_48hrs: Yup.string()
    .notRequired()
    .test(
      "is-numeric",
      "Express delivery charge must be a positive number",
      (value) => {
        if (!value) return true;
        return /^\d+$/.test(value);
      }
    ),

  express_delivery_72hrs: Yup.string()
    .notRequired()
    .test(
      "is-numeric",
      "Express delivery charge must be a positive number",
      (value) => {
        if (!value) return true;
        return /^\d+$/.test(value);
      }
    ),
});
