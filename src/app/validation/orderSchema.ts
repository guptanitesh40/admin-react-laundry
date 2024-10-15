import * as Yup from "yup";

const itemSchema = Yup.object().shape({
  category_id: Yup.number().required("Please select a category"),
  product_id: Yup.number().required("Please select a product"),
  service_id: Yup.number().required("Please select a service"),
  price: Yup.number()
    .required("Price is not available for the combination, please add a price")
    .test("required", "Price is not available for the combination, please add a price", (value) => !!value)
    .typeError("Price must be a positive number"),
});

export const orderSchema = Yup.object().shape({
    username: Yup.string().required("Please enter username"),
    coupon_code: Yup.string().required("Please select coupon code"),
    express_delivery_charges:Yup.number()
    .typeError("Express delivery charges must be a positive number") ,    
    shipping_charges:Yup.number()
    .typeError("shipping charge must be a positive number"),
    payment_type:Yup.number()
    .required("Please choose payment type")
    .test("required", "Please choose order status", (value) => !!value),
    order_status:Yup.number()
    .required("Please choose order status")
    .test("required", "Please choose order status", (value) => !!value),
    payment_status:Yup.number()
    .required("Please choose payment status")
    .test("required", "Please choose payment status", (value) => !!value),
    kasar_amount:Yup.number()
    .typeError("kasar amount must be a positive number"),
    paid_amount:Yup.number()
    .required("Please enter paid amount")
    .test("required", "Please enter paid amount", (value) => !!value)
    .typeError("Paid amount must be a positive number"),
    items: Yup.array().of(itemSchema)
  });


  
