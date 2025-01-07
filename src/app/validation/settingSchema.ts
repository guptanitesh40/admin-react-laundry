import * as Yup from "yup";

export const settingSchema = Yup.object().shape({
  estimate_pickup_normal_hour: Yup.number()
    .typeError("estimate pickup normal hour must be a number")
    .min(0, "estimate pickup normal hour must be a positive number"),

  estimate_pickup_express_hour: Yup.number()
    .typeError("estimate pickup express hour must be a number")
    .min(0, "estimate pickup express hour must be a positive number"),

  gst_percentage: Yup.number()
    .typeError("gst percentage must be a number")
    .min(0, "gst percentage must be a positive number"),

  estimate_delivery_normal_day: Yup.number()
    .typeError("estimate delivery normal day must be a number")
    .min(0, "estimate delivery normal day must be a positive number"),

  estimate_delivery_express_day: Yup.number()
    .typeError("estimate delivery express day must be a number")
    .min(0, "estimate delivery express day must be a positive number"),

  shipping_charge: Yup.number()
    .typeError("shipping charge must be a number")
    .min(0, "shipping charge must be a positive number"),

  express_delivery_charge: Yup.number()
    .typeError("express delivery charge must be a number")
    .min(0, "express delivery charge must be a positive number"),
});
