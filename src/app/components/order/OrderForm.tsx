import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useAddOrder,
  useFetchCoupons,
  useGetCategories,
  useGetPrice,
  useGetProductsOnId,
  useGetServicesOnId,
  useUpdateOrder,
} from "../../hooks";
import * as Yup from "yup";
import useGetCustomer from "../../hooks/customer/useGetCustomer";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import useGetSingleOrder from "../../hooks/order/useGetSingleOrder";
import { orderSchema } from "../../validation/orderSchema";

interface item {
  category_id: number;
  product_id: number;
  service_id: number;
  price: number;
  quantity: number;
  item_Total: number;
}

interface FormData {
  coupon_code: string;
  coupon_discount: number;
  description: string | null;
  express_delivery_charges: number;
  shipping_charges: number;
  payment_type: number;
  order_status: number;
  payment_status: number;
  sub_total: number;
  paid_amount: number;
  transaction_id: string;
  address_details: string | null;
  username: string;
  user_id: number;
  items: item[];
}

const OrderForm: React.FC = () => {
  const { prices, fetchPrices } = useGetPrice();
  const { categories, fetchCategories } = useGetCategories();

  const { products, fetchProductsOnId } = useGetProductsOnId();
  const { services, fetchServicesOnId } = useGetServicesOnId();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(true);
  const { id } = useParams<{ id: string }>();

  const { updateOrder, loading: updating } = useUpdateOrder();
  const { addOrder, loading: adding } = useAddOrder();
  const order_id = Number(id);
  const perPage = 1000;
  const pageNumber = 1;
  const { fetchCustomers } = useGetCustomer();
  const { coupons } = useFetchCoupons(pageNumber, perPage);
  const { order } = useGetSingleOrder(order_id);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    coupon_code: "",
    coupon_discount: null,
    description: "",
    express_delivery_charges: null,
    shipping_charges: null,
    payment_type: null,
    order_status: null,
    payment_status: null,
    sub_total: null,
    paid_amount: null,
    transaction_id: "",
    address_details: "",
    username: "",
    user_id: null,
    items: [
      {
        category_id: null,
        product_id: null,
        service_id: null,
        price: null,
        quantity: 1,
        item_Total: null,
      },
    ],
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories, fetchPrices]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchUserData = async () => {
      if (userSearch && isSearchMode) {
        const userData = await fetchCustomers(userSearch);
        setUsers(userData);
      } else {
        setUsers([]);
      }
    };
    fetchUserData();
  }, [userSearch, isSearchMode]);

  useEffect(() => {
    if (order) {
      const fullName = `${order.user.first_name} ${order.user.last_name}`;
      setUserSearch(fullName);
      setIsSearchMode(false);

      const initialFormData: FormData = {
        coupon_code: order.coupon_code || "",
        coupon_discount: order.coupon_discount || null,
        description: order.description || "",
        express_delivery_charges: order.express_delivery_charges || null,
        shipping_charges: order.shipping_charges || null,
        payment_type: order.payment_type || null,
        order_status: order.order_status || null,
        payment_status: order.payment_status || null,
        sub_total: null,
        paid_amount: order.paid_amount || null,
        transaction_id: order.transaction_id || "",
        address_details: order.address_details || "",
        username: fullName,
        user_id: order.user_id || null,
        items: order.items.map(
          (item: any): item => ({
            category_id: item.category_id,
            product_id: item.product_id,
            service_id: item.service_id,
            price: item.price,
            quantity: item.quantity,
            item_Total: item.price * item.quantity,
          })
        ),
      };

      const calculatedSubTotal = calculateSubTotal(initialFormData);

      setFormData({
        ...initialFormData,
        sub_total: calculatedSubTotal,
      });
    } else {
      const initialFormData: FormData = {
        coupon_code: "",
        coupon_discount: null,
        description: "",
        express_delivery_charges: null,
        shipping_charges: null,
        payment_type: null,
        order_status: 1,
        payment_status: null,
        sub_total: null,
        paid_amount: null,
        transaction_id: "",
        address_details: "",
        username: "",
        user_id: null,
        items: [
          {
            category_id: null,
            product_id: null,
            service_id: null,
            price: null,
            quantity: 1,
            item_Total: null,
          },
        ],
      };
      setFormData(initialFormData);
    }
  }, [order]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formattedItems = formData.items.map((item: item) => ({
        category_id: Number(item.category_id),
        product_id: Number(item.product_id),
        service_id: Number(item.service_id),
        price: Number(item.price),
        quantity: Number(item.quantity),
      }));

      const dataToValidate = {
        ...formData,
        address_id: 1,
        coupon_discount: Number(formData.coupon_discount),
        shipping_charges: Number(formData.shipping_charges),
        paid_amount: Number(formData.paid_amount),
        express_delivery_charges: Number(formData.express_delivery_charges),
        payment_type: Number(formData.payment_type),
        payment_status: Number(formData.payment_status),
        order_status: Number(formData.order_status),
        items: formattedItems,
      };

      let success;

      await orderSchema.validate(dataToValidate, { abortEarly: false });

      if (order) {
        success = await updateOrder(order_id, dataToValidate);
      } else {
        success = await addOrder(dataToValidate);
      }

      if (success) {
        navigate("/orders");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const formErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          formErrors[err.path || ""] = err.message;
        });
        setErrors(formErrors);
      } else {
        toast.error("Failed to submit the form. Please try again.");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSearch(e.target.value);
    setIsSearchMode(true);
  };

  const handleUserClick = (user: any) => {
    const fullName = `${user.first_name} ${user.last_name}`;
    setUserSearch(fullName);
    setIsSearchMode(false);

    setFormData({
      ...formData,
      username: fullName,
      user_id: user.user_id,
    });
  };

  const handleCancel = () => {
    navigate("/orders");
  };

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          category_id: null,
          product_id: null,
          service_id: null,
          price: null,
          quantity: 1,
          item_Total: null,
        },
      ],
    }));
  };

  const handleRemoveItem = (index: number) => {
    setFormData((prev) => {
      const updatedItems = prev.items.filter((_, i) => i !== index);
      const newFormData = { ...prev, items: updatedItems };
      const newSubTotal = calculateSubTotal(newFormData);
      return { ...newFormData, sub_total: newSubTotal };
    });
  };
  

  const handleItemChange = (index: number, field: string, value: any) => {
    setFormData((prev) => {
      const updatedItems = prev.items.map((item, i) => {
        if (i === index) {
          const updatedItem = { ...item, [field]: value };

          const category_id = Number(updatedItem.category_id);

          const product_id = Number(updatedItem.product_id);
          const service_id = Number(updatedItem.service_id);
          const quantity = Number(updatedItem.quantity) || 1;

          if (field === "category_id" || field === "product_id") {
            if (category_id) fetchProductsOnId(category_id);
            if (product_id && category_id)
              fetchServicesOnId(category_id, product_id);
          }

          if (category_id && product_id && service_id) {
            const price = getPriceForCombination(
              category_id,
              product_id,
              service_id
            );
            updatedItem.price = price;
            updatedItem.item_Total = price * quantity;
          } else {
            updatedItem.price = null;
            updatedItem.item_Total = null;
          }

          return updatedItem;
        }
        return item;
      });

      const newFormData = { ...prev, items: updatedItems };
      const newSubTotal = calculateSubTotal(newFormData);
      return { ...newFormData, sub_total: newSubTotal };
    });
  };

  const getPriceForCombination = (
    category_id: number,
    product_id: number,
    service_id: number
  ): number => {
    const key = `${category_id}_${product_id}_${service_id}`;
    return prices[key] || 0;
  };

  const handleDropdownChange = (code: string, discount_value: number) => {
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        coupon_code: code,
        coupon_discount: discount_value,
      };
      const newSubTotal = calculateSubTotal(updatedFormData);
      return { ...updatedFormData, sub_total: newSubTotal };
    });
    setIsDropdownOpen(false);
  };

  const handleChargeChange = (field: string, value: any) => {
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [field]: value,
      };
      const newSubTotal = calculateSubTotal(updatedFormData);
      return { ...updatedFormData, sub_total: newSubTotal };
    });
  };

  const calculateSubTotal = (updatedFormData: typeof formData) => {
    const itemsTotal = updatedFormData.items.reduce(
      (acc, item) => acc + (item.item_Total || 0),
      0
    );

    const expressCharges =
      parseFloat(updatedFormData.express_delivery_charges as any) || 0;
    const shippingCharges =
      parseFloat(updatedFormData.shipping_charges as any) || 0;
    const couponDiscount =
      parseFloat(updatedFormData.coupon_discount as any) || 0;

    const finalSubTotal =
      itemsTotal + expressCharges + shippingCharges - couponDiscount;
    return finalSubTotal;
  };

  return (
    <div className="container-fixed">
      <div className="card max-w-5xl mx-auto p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold mb-6">
          {order ? "Edit Order" : "Add Order"}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative flex flex-col">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                User Name
              </label>

              <input
                type="text"
                value={userSearch || ""}
                onChange={handleInputChange}
                className="input border border-gray-300 rounded-md p-2 w-full mb-2"
                placeholder="Search User..."
              />

              {userSearch && isSearchMode && (
                <ul className="absolute mt-20 bg-white z-10 border border-gray-300 rounded-md p-2 w-full text-sm">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <li
                        key={user.user_id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleUserClick(user)}
                      >
                        {user.first_name} {user.last_name} ({user.mobile_number}
                        )
                      </li>
                    ))
                  ) : (
                    <li className="p-2 text-gray-500">No users found</li>
                  )}
                </ul>
              )}
              <p className="w-full text-red-500 text-sm">
                {errors.username || "\u00A0"}
              </p>
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="input border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address Details
              </label>
              <textarea
                value={formData.address_details || ""}
                onChange={(e) =>
                  setFormData({ ...formData, address_details: e.target.value })
                }
                className="input border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          </div>

          <div>
            <h1 className="text-xl font-semibold leading-none text-gray-900 mt-10 mb-5">
              Item
            </h1>
          </div>

          {formData.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-end md:space-x-4 mb-4"
            >
              <div className="flex flex-col flex-1 mb-4 md:mb-0">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Category
                </label>
                <select
                  value={item.category_id ?? ""}
                  onChange={(e) =>
                    handleItemChange(index, "category_id", e.target.value)
                  }
                  className="select border border-gray-300 rounded-md p-2 w-full text-sm"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.category_id} value={cat.category_id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {"\u00A0"}
              </div>

              <div className="flex flex-col flex-1 mb-4 md:mb-0">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Product
                </label>
                <select
                  value={item.product_id ?? ""}
                  onChange={(e) =>
                    handleItemChange(index, "product_id", e.target.value)
                  }
                  className="select border border-gray-300 rounded-md p-2 w-full text-sm"
                >
                  <option value="" disabled>
                    Select Product
                  </option>
                  {products.map((prod) => (
                    <option
                      key={prod.product_product_id}
                      value={prod.product_product_id}
                    >
                      {prod.product_name}
                    </option>
                  ))}
                </select>
                {"\u00A0"}
              </div>

              <div className="flex flex-col flex-1 mt-4 mb-4 md:mb-0">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Service
                </label>
                <select
                  value={item.service_id ?? ""}
                  onChange={(e) =>
                    handleItemChange(index, "service_id", e.target.value)
                  }
                  className="select border border-gray-300 rounded-md p-2 w-full text-sm"
                >
                  <option value="" disabled>
                    Select Service
                  </option>
                  {services?.map((serv) => (
                    <option
                      key={serv?.service_service_id}
                      value={serv?.service_service_id}
                    >
                      {serv.service_name}
                    </option>
                  ))}
                </select>
                {"\u00A0"}
              </div>

              <div className="flex flex-col flex-1 mb-4 md:mb-0">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Price
                </label>
                <input
                  type="text"
                  value={item.price || ""}
                  onChange={(e) =>
                    handleItemChange(index, "price", e.target.value)
                  }
                  className="input border border-gray-300 rounded-md p-2 w-full"
                  readOnly
                />
                <p className="w-full text-red-500 text-sm">{"\u00A0"}</p>
              </div>

              <div className="flex flex-col flex-1 mb-4 md:mb-0">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Quantity
                </label>
                <input
                  type="text"
                  value={item.quantity ?? 1}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  className="input border border-gray-300 rounded-md p-2 w-full"
                />
                <p className="w-full text-red-500 text-sm">{"\u00A0"}</p>
              </div>

              <div className="flex flex-col flex-1 mb-4 md:mb-0">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Item total
                </label>
                <input
                  type="text"
                  value={item.item_Total ?? ""}
                  onChange={(e) =>
                    handleItemChange(index, "item_Total", e.target.value)
                  }
                  className="input border border-gray-300 rounded-md p-2"
                  min="0"
                  step="0.01"
                  readOnly
                />
                <p className="w-full text-red-500 text-sm">{"\u00A0"}</p>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  className={`p-2 mb-10 rounded-full ${
                    formData.items.length > 1
                      ? "bg-red-100 hover:bg-red-200"
                      : "bg-gray-200 cursor-not-allowed"
                  }`}
                  onClick={() => handleRemoveItem(index)}
                  disabled={formData.items.length === 1}
                >
                  <FaTrash
                    className={`${
                      formData.items.length > 1
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddItem}
            className="btn btn-secondary mb-6"
          >
            Add Item
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Coupon Code
              </label>

              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-gray-200 border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-300 w-full text-left flex justify-between items-center"
              >
                <span>{formData.coupon_code || "Select Coupon code"}</span>
                <span className="ml-2">&#9662;</span>
              </button>

              {isDropdownOpen && (
                <ul className="dropdown-menu scrollable-menu absolute z-10 mt-[73px] w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  {coupons.map((coupon) => (
                    <li
                      key={coupon.coupon_id}
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() =>
                        handleDropdownChange(coupon.code, coupon.discount_value)
                      }
                    >
                      <div className="block px-4 py-2 text-sm">
                        {coupon.code}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <p className="w-full text-red-500 text-sm">
                {errors.coupon_code || "\u00A0"}
              </p>
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Coupon Discount
              </label>
              <input
                type="text"
                value={formData.coupon_discount || ""}
                readOnly
                className="input border border-gray-300 rounded-md p-2"
              />
              <p className="w-full text-red-500 text-sm">
                {errors.coupon_discount || "\u00A0"}
              </p>
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Express Delivery Charges
              </label>
              <input
                type="text"
                min="0"
                value={formData.express_delivery_charges || ""}
                onChange={(e) =>
                  handleChargeChange("express_delivery_charges", e.target.value)
                }
                className="input border border-gray-300 rounded-md p-2"
              />
              <p className="w-full text-red-500 text-sm">
                {errors.express_delivery_charges || "\u00A0"}
              </p>
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Shipping Charges
              </label>
              <input
                type="text"
                min="0"
                value={formData.shipping_charges || ""}
                onChange={(e) =>
                  handleChargeChange("shipping_charges", e.target.value)
                }
                className="input border border-gray-300 rounded-md p-2"
              />
              <p className="w-full text-red-500 text-sm">
                {errors.shipping_charges || "\u00A0"}
              </p>
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Sub Total
              </label>
              <input
                type="text"
                value={formData.sub_total || ""}
                readOnly
                className="input border border-gray-300 rounded-md p-2"
              />
              <p className="w-full text-red-500 text-sm">
                {errors.sub_total || "\u00A0"}
              </p>
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Paid amount
              </label>
              <input
                type="text"
                value={formData.paid_amount || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    paid_amount: e.target.value,
                  })
                }
                className="input border border-gray-300 rounded-md p-2"
                min="0"
                step="0.01"
              />
              <p className="w-full text-red-500 text-sm">
                {errors.paid_amount || "\u00A0"}
              </p>
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Payment Method
              </label>
              <select
                className="select border border-gray-300 rounded-md p-2 w-full text-sm"
                value={formData.payment_type ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    payment_type: Number(e.target.value),
                  })
                }
              >
                <option value="" disabled>
                  Select Payment Type
                </option>
                <option value={1}>Cash on Delivery</option>
                <option value={2}>Online Payment</option>
              </select>
              <p className="w-full text-red-500 text-sm">
                {errors.payment_type || "\u00A0"}
              </p>
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Payment Status
              </label>
              <select
                className="select border border-gray-300 rounded-md p-2 w-full text-sm"
                value={formData.payment_status ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    payment_status: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Select Payment Status
                </option>
                <option value={1}>Pending</option>
                <option value={2}>Received</option>
                <option value={3}>Partial Received</option>
              </select>
              <p className="w-full text-red-500 text-sm">
                {errors.payment_status || "\u00A0"}
              </p>
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Transaction ID
              </label>
              <input
                type="text"
                value={formData.transaction_id || ""}
                onChange={(e) =>
                  setFormData({ ...formData, transaction_id: e.target.value })
                }
                className="input border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="flex justify-start mt-6">
            <button
              type="submit"
              className="btn btn-primary mr-4"
              disabled={adding || updating}
            >
              {order ? "Update Order" : "Add Order"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
