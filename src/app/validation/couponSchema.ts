import * as Yup from "yup";

export const couponSchema = Yup.object().shape({
  code: Yup.string(),
  title: Yup.string(),
  description: Yup.string(),
  discount_value: Yup.number()
    .typeError("Discount Value must be a number")
    .min(1, "Discount value must be at least 1"),
  discount_type: Yup.number()
    .oneOf([1, 2], "Invalid discount type"),
  start_time: Yup.date()
    .typeError("Invalid start date format")
    .test("is-valid-date", "Invalid start date", value => {
      return value instanceof Date && !isNaN(value.getTime());
    })
    .test("is-not-past", "Please enter a valid start date", value => {
      if (!(value instanceof Date)) return false;
      const now = new Date();
      // Set the time to the start of the current day
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      return value >= startOfToday;
    })
    .test("is-before-end", "Start date must be before end date", function (value) {
      const { end_time } = this.parent;
      return !end_time || (value instanceof Date && end_time instanceof Date && value < end_time);
    }),
  end_time: Yup.date()
    .typeError("Invalid end date format")
    .test("is-valid-date", "Invalid end date", value => {
      return value instanceof Date && !isNaN(value.getTime());
    })
    .test("is-after-start", "End date must be after start date", function (value) {
      const { start_time } = this.parent;
      return !start_time || (value instanceof Date && start_time instanceof Date && value > start_time);
    }),
  maximum_usage_count_per_user: Yup.number()
    .typeError("Maximum usage per user must be a number")
    .min(1, "Must be at least 1"),
  total_usage_count: Yup.number()
    .typeError("Total usage count must be a number")
    .min(1, "Must be at least 1"),
  coupon_type: Yup.number()
    .oneOf([1, 2, 3], "Invalid coupon type"),
});
