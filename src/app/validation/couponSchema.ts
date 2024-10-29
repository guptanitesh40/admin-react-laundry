import * as Yup from "yup";

export const couponSchema = Yup.object().shape({
  code: Yup.string()
    .required("Please enter coupon value")
    .test("required", "Please enter coupon value", (value) => !!value)
    .min(3, "Coupon code must be at least 3 characters long")
    .max(30, "Coupon code cannot be more than 30 characters")
    .matches(
      /^[a-zA-Z0-9]*$/,
      "Coupon code can only contain letters and numbers"
    )
    .nullable(),
  title: Yup.string()
    .required("Please enter title value")
    .max(50, "Max title length exceeded by 50 characters"),
  description: Yup.string()
    .required("Description is required")
    .max(255, "Max description length exceeded by 255 characters"),
  discount_type: Yup.number()
    .required("Please choose a discount type")
    .test("required", "Please choose discount type", (value) => !!value),

  discount_value: Yup.number()
    .nullable()
    .when("discount_type", {
      is: 1,
      then: (schema) =>
        schema
          .typeError("Discount value must be a number")
          .max(1000, "Maximum flat discount is 1000"),
      otherwise: (schema) =>
        schema
          .typeError("Discount value must be a number")
          .max(100, "Maximum discount is 100%")
          .test("required", "Please enter discount value", (value) => !!value)
          .required("Discount value is required"),
    }),

  start_time: Yup.date()
    .required("Start date is required")
    .typeError("Invalid start date format")
    .test("is-valid-date", "Invalid start date", (value) => {
      return value instanceof Date && !isNaN(value.getTime());
    })
    .test("is-not-past", "Please enter a valid start date", (value) => {
      if (!(value instanceof Date)) return false;
      const now = new Date();
      const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );
      return value >= startOfToday;
    }),
  end_time: Yup.date()
    .required("End date is required")
    .typeError("Invalid end date format")
    .test("is-valid-date", "Invalid end date", (value) => {
      return value instanceof Date && !isNaN(value.getTime());
    })
    .test(
      "is-after-start",
      "End date must be after start date",
      function (value) {
        const { start_time } = this.parent;
        return (
          !start_time ||
          (value instanceof Date &&
            start_time instanceof Date &&
            value > start_time)
        );
      }
    ),
  maximum_usage_count_per_user: Yup.number()
    .required("Maximum usage per user is required")
    .typeError("Maximum usage per user must be a number")
    .min(1, "Must be at least 1"),
  total_usage_count: Yup.number()
    .required("Total usage count is required")
    .typeError("Total usage count must be a number")
    .min(1, "Must be at least 1"),
  coupon_type: Yup.number()
    .required("Please choose coupon type")
    .test("required", "Please choose coupon type", (value) => !!value),
});
