import * as yup from "yup";

export const couponSchema = yup.object().shape({
  code: yup.string().required("Code is required"),
  description: yup.string().required("Description is required"),
  title: yup.string().required("Title is required"),
  start_time: yup.string().required("Start time is required"),
  end_time: yup.string().required("End time is required"),
  total_usage_count: yup.number().required("Total usage count is required").min(1),
  maximum_usage_count_per_user: yup.number().required("Max usage count per user is required").min(1),
  discount_type: yup.number().required("Discount type is required"),
  discount_value: yup.number().required("Discount value is required").min(0),
  coupon_type: yup.number().required("Coupon type is required"),
});
