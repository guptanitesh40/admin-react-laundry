import * as Yup from "yup";

const itemSchema = Yup.object().shape({
  category_id: Yup.number()
    .nullable()
    .required("Please select a category")
    .test("required", "Please select a category", (value) => !!value),

  product_id: Yup.number()
    .nullable()
    .required("Please select a product")
    .test("required", "Please select a product", (value) => !!value),

  service_id: Yup.number()
    .nullable()
    .required("Please select a service")
    .test("required", "Please select a service", (value) => !!value),

  price: Yup.number()
    .nullable()
    .when(
      ["category_id", "product_id", "service_id"],
      (
        [category_id, product_id, service_id]: [
          number | null,
          number | null,
          number | null
        ],
        schema: Yup.NumberSchema
      ) => {
        return category_id && product_id && service_id
          ? schema.required(
              "Price is not available for the combination, please add a price"
            )
          : schema.nullable();
      }
    ),
});

export const orderSchema = Yup.object().shape({
  username: Yup.string().required("Please enter username"),

  address_id: Yup.number()
    .required("Please select address")
    .test("required", "Please select address", (value) => !!value),

  express_delivery_charges: Yup.number()
    .typeError("Express delivery charges must be a number")
    .min(0, "Express delivery charges must be a positive number"),

  shipping_charges: Yup.number()
    .typeError("Shipping charge must be a number")
    .min(0, "Shipping charge must be a positive number"),

  payment_type: Yup.number()
    .required("Please choose payment type")
    .test("required", "Please choose payment type", (value) => !!value),

  payment_status: Yup.number()
    .required("Please choose payment status")
    .test("required", "Please choose payment status", (value) => !!value),

  paid_amount: Yup.number()
    .typeError("Paid amount must be a number")
    .min(0, "Paid amount must be a positive number")
    .test(
      "max-paid",
      "Paid amount cannot be greater than the total amount",
      function (value) {
        if (value === undefined || value === null || value === 0) {
          return true;
        }
        return value <= this.options.context?.total;
      }
    ),

  branch_id: Yup.number()
    .required("Please select branch")
    .test("required", "Please select branch", (value) => !!value),

  items: Yup.array().of(itemSchema),
});
