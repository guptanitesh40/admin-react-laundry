import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useAddOrder,
  useApplyCoupon,
  useGeneratePaymentLink,
  useGetAddress,
  useGetBranches,
  useGetCategories,
  useGetOrder,
  useGetPrice,
  useGetProductsOnId,
  useGetServicesOnId,
  useUpdateOrder,
} from "../../hooks";
import * as Yup from "yup";
import { FaEye, FaTrash } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { orderSchema } from "../../validation/orderSchema";
import AddressModal from "./AddressModal";
import useGetUsersByRole from "../../hooks/user/useGetUsersByRole";
import CustomerModal from "./CustomerModal";
import useGetValidCoupon from "../../hooks/coupon/useGetValidCoupons";
import { RiShareForwardFill } from "react-icons/ri";
import useGetUser from "../../hooks/user/useGetuser";

interface item {
  category_id: number;
  product_id: number;
  product_name: string;
  service_id: number;
  service_name: string;
  description: string | null;
  price: number;
  quantity: number;
  item_Total: number;
  showDescription: boolean;
}

interface FormData {
  coupon_code: string;
  coupon_discount: number;
  express_delivery_charges: number;
  shipping_charges: number;
  payment_type: number;
  payment_status: number;
  sub_total: number;
  paid_amount: number;
  transaction_id: string;
  address_id: number | null;
  username: string;
  user_id: number;
  items: item[];
  total: number;
  branch_id: number;
  order_status: number | null;
}

const OrderForm: React.FC = () => {
  const { prices } = useGetPrice();
  const { categories } = useGetCategories();
  const { fetchProductsOnId } = useGetProductsOnId();
  const { fetchServicesOnId } = useGetServicesOnId();

  const [userSearch, setUserSearch] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(true);
  const { id } = useParams<{ id: string }>();

  const { updateOrder, loading: updating } = useUpdateOrder();
  const { addOrder, loading: adding } = useAddOrder();
  const order_id = Number(id);
  const perPage = 1000;
  const pageNumber = 1;

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [userModalIsOpen, setUserModalIsOpen] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const { users, fetchUsersByRole } = useGetUsersByRole();
  const { validCoupons, fetchValidCoupons } = useGetValidCoupon();

  const { branches } = useGetBranches(pageNumber, perPage);
  const { order, fetchOrder } = useGetOrder();
  const { address, fetchAddress } = useGetAddress();
  const { applyCoupon } = useApplyCoupon();
  const { userData, fetchUser } = useGetUser();
  const { transactionId, generatePaymentLink } = useGeneratePaymentLink();
  const user = userData?.user;
  const location = useLocation();

  const [productCache, setProductCache] = useState<Record<number, any[]>>({});
  const [serviceCache, setServiceCache] = useState<Record<number, any[]>>({});

  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    coupon_code: "",
    coupon_discount: null,
    express_delivery_charges: null,
    shipping_charges: null,
    payment_type: null,
    payment_status: null,
    sub_total: 0,
    paid_amount: null,
    transaction_id: "",
    address_id: null,
    username: "",
    user_id: null,
    items: [
      {
        category_id: null,
        product_id: null,
        service_id: null,
        product_name: "",
        service_name: "",
        description: null,
        price: null,
        quantity: 1,
        item_Total: null,
        showDescription: false,
      },
    ],
    total: 0,
    branch_id: null,
    order_status: null,
  });

  const [retrivedData, setRetrivedData] = useState<FormData>({
    coupon_code: "",
    coupon_discount: null,
    express_delivery_charges: null,
    shipping_charges: null,
    payment_type: null,
    payment_status: null,
    sub_total: 0,
    paid_amount: null,
    transaction_id: "",
    address_id: null,
    username: "",
    user_id: null,
    items: [
      {
        category_id: null,
        product_id: null,
        service_id: null,
        product_name: "",
        service_name: "",
        description: null,
        price: null,
        quantity: 1,
        item_Total: null,
        showDescription: false,
      },
    ],
    total: 0,
    branch_id: null,
    order_status: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      await fetchOrder(order_id);
    };
    fetchData();
  }, [order_id]);

  useEffect(() => {
    const fetchData = async () => {
      if (formData.user_id) {
        await fetchAddress(formData.user_id);
        await fetchValidCoupons(formData.user_id);
        await fetchUser(formData.user_id);
      }
      if (isSubmit) {
        await fetchAddress(formData.user_id);
        setIsSubmit(false);
      }
    };
    fetchData();
  }, [formData.user_id, isSubmit]);

  useEffect(() => {
    if (transactionId) {
      setFormData({
        ...formData,
        transaction_id: transactionId,
      });
    }
  }, [transactionId]);

  useEffect(() => {
    if (!order_id) {
      setFormData((prev) => ({
        ...prev,
        payment_status: formData.payment_type === 1 ? 1 : null,
      }));
    }
  }, [formData.payment_type]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userSearch && isSearchMode) {
        await fetchUsersByRole(5, userSearch);
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
        express_delivery_charges: order.express_delivery_charges || null,
        shipping_charges: order.shipping_charges || null,
        payment_type: order.payment_type || null,
        payment_status: order.payment_status || null,
        sub_total: order.sub_total || 0,
        paid_amount: order.paid_amount || null,
        transaction_id: order.transaction_id || "",
        address_id: order.address_id,
        username: fullName,
        user_id: order.user_id || null,
        items: order.items.map((item: any) => {
          const category_id = item.category.category_id;
          const product_id = item.product?.product_id || null;
          const service_id = item.service?.service_id || null;

          const product_name = item.product?.name || "";
          const service_name = item.service?.name || "";

          return {
            category_id,
            product_id,
            service_id,
            product_name,
            service_name,
            description: item.description || null,
            price: item.price,
            quantity: item.quantity,
            item_Total: item.price * item.quantity,
            showDescription: !!item.description,
          };
        }),
        total:
          (order.sub_total || 0) +
          (order.express_delivery_charges || 0) +
          (order.shipping_charges || 0),
        branch_id: order.branch_id,
        order_status: order.order_status,
      };

      setFormData(initialFormData);
      setRetrivedData(initialFormData);
    }
  }, [order]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formattedItems = formData.items.map((item: item) => ({
        category_id: Number(item.category_id),
        product_id: Number(item.product_id),
        service_id: Number(item.service_id),
        description: item.description,
        price: Number(item.price),
        quantity: Number(item.quantity),
      }));

      const dataToValidate = {
        ...formData,
        address_id: Number(formData.address_id),
        coupon_discount: Number(formData.coupon_discount),
        shipping_charges: Number(formData.shipping_charges),
        paid_amount: Number(formData.paid_amount),
        express_delivery_charges: Number(formData.express_delivery_charges),
        payment_type: Number(formData.payment_type),
        payment_status: Number(formData.payment_status),
        order_status: 4,
        items: formattedItems,
      };

      await orderSchema.validate(dataToValidate, { abortEarly: false });

      const isDataChanged = () => {
        return (Object.keys(formData) as (keyof typeof formData)[]).some(
          (key) => {
            return formData[key] !== retrivedData[key];
          }
        );
      };

      if (!isDataChanged()) {
        navigate(`${location?.state?.prevUrl}`);
        return;
      }

      let success;
      if (order) {
        success = await updateOrder(order_id, dataToValidate);
      } else {
        success = await addOrder(dataToValidate);
      }

      if (success) {
        navigate(`${location?.state?.prevUrl}`);
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    navigate(`${location?.state?.prevUrl}`);
  };

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          category_id: null,
          product_id: null,
          product_name: "",
          service_id: null,
          service_name: "",
          description: null,
          price: null,
          quantity: 1,
          item_Total: null,
          showDescription: false,
        },
      ],
    }));
  };

  const handleRemoveItem = (index: number) => {
    setFormData((prev) => {
      const updatedItems = prev.items.filter((_, i) => i !== index);
      const newFormData = {
        ...prev,
        items: updatedItems,
        coupon_code: "",
        coupon_discount: 0,
      };

      const newSubTotal = calculateItemTotal(newFormData);
      const newTotal =
        newSubTotal +
        Number(formData.express_delivery_charges || 0) +
        Number(formData.shipping_charges || 0);

      return { ...newFormData, sub_total: newSubTotal, total: newTotal };
    });
  };

  const handleItemChange = async (index: number, field: string, value: any) => {
    if (
      ["category_id", "product_id", "service_id", "price", "quantity"].includes(
        field
      )
    ) {
      setFormData((prev) => ({
        ...prev,
        coupon_code: "",
        coupon_discount: 0,
      }));
    }
    setFormData((prev) => {
      const updatedItems = prev.items.map((item, i) => {
        if (i === index) {
          const updatedItem = { ...item, [field]: value };
          if (field === "showDescription") {
            updatedItem.showDescription = value;
          }
          const category_id = Number(updatedItem.category_id);
          const product_id = Number(updatedItem.product_id);
          const service_id = Number(updatedItem.service_id);
          const quantity = Number(updatedItem.quantity) || 1;

          if (field === "category_id") {
            const categoryId = Number(value);
            if (!productCache[categoryId]) {
              fetchProductsOnId(categoryId).then((products) => {
                setProductCache((prevCache) => ({
                  ...prevCache,
                  [categoryId]: products,
                }));
              });
            }
            updatedItem.product_id = null;
            updatedItem.service_id = null;
          }

          if (field === "product_id") {
            const categoryId = Number(item.category_id);
            const productId = Number(value);
            const cacheKey = `${categoryId}_${productId}`;

            if (!serviceCache[cacheKey]) {
              fetchServicesOnId(categoryId, productId).then((services) => {
                setServiceCache((prevCache) => ({
                  ...prevCache,
                  [cacheKey]: services,
                }));
              });
            }
            updatedItem.service_id = null;
          }

          if (["category_id", "product_id", "service_id"].includes(field)) {
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
          } else if (field === "price") {
            updatedItem.item_Total = value * quantity;
          } else if (field === "quantity") {
            updatedItem.item_Total = updatedItem.price * Number(value);
          }
          return updatedItem;
        }
        return item;
      });

      const newFormData = { ...prev, items: updatedItems };
      const newSubTotal = calculateItemTotal(newFormData);
      const updatedSubTotal = newSubTotal - prev.coupon_discount;

      const newTotal =
        updatedSubTotal +
        Number(prev.express_delivery_charges || 0) +
        Number(prev.shipping_charges || 0);

      return { ...newFormData, sub_total: updatedSubTotal, total: newTotal };
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

  const handleDropdownChange = async (code: string) => {
    const newSubTotal = calculateItemTotal(formData);
    const couponData = await applyCoupon(formData.user_id, newSubTotal, code);

    const newTotal =
      Number(couponData.finalTotal || 0) +
      Number(formData.express_delivery_charges || 0) +
      Number(formData.shipping_charges || 0);

    if (couponData) {
      setFormData((prev) => ({
        ...prev,
        coupon_code: code,
        coupon_discount: couponData.discountAmount,
        sub_total: couponData.finalTotal,
        total: newTotal,
      }));
    }
  };

  const calculateItemTotal = (data: typeof formData) => {
    return data.items.reduce((acc, item) => acc + (item.item_Total || 0), 0);
  };

  const handleChargeChange = (field: string, value: string) => {
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [field]: value,
      };
      const newTotal =
        Number(updatedFormData.sub_total || 0) +
        Number(updatedFormData.express_delivery_charges || 0) +
        Number(updatedFormData.shipping_charges || 0);

      return { ...updatedFormData, total: newTotal };
    });
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAddressId = event.target.value;
    setFormData((prev) => ({
      ...prev,
      address_id: Number(selectedAddressId),
    }));
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.user_id) {
      toast.error("Please select the user to add address");
    } else {
      setModalIsOpen(true);
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUserModalIsOpen(true);
  };

  const handleViewOrder = () => {
    navigate(`/order/${order_id}`);
  };

  const handleSendCustomerData = async () => {
    const customerInfo = {
      amount: formData.paid_amount,
      currency: "INR",
      user_id: formData.user_id,
      customer: {
        name: formData.username,
        mobile_number: Number(user?.mobile_number),
        email: user?.email,
      },
    };

    await generatePaymentLink(customerInfo);
  };

  return (
    <div className="container-fixed">
      <div className="card max-w-5xl mx-auto p-6 bg-white shadow-md">
        <div className="flex">
          <h1 className="text-2xl font-bold mb-6">
            {order ? "Edit Order" : "Add Order"}
          </h1>
          {!isNaN(order_id) && (
            <button
              className="btn bg-gray-200 ml-4 text-gray-700 text-sm font-bold rounded-md"
              onClick={handleViewOrder}
            >
              <FaEye size={20} />
              View Order
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-6 mt-4">
            <div className="relative col-span-1">
              <span className="flex justify-between items-center">
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Customer name
                </label>

                <button
                  className="btn btn-sm btn-primary -mt-6 sm:btn-lg"
                  onClick={handleAddUser}
                >
                  Add Customer
                </button>
              </span>
              <input
                type="text"
                id="username"
                autoComplete="off"
                value={userSearch || ""}
                onChange={handleSearchChange}
                className="input border border-gray-300 rounded-md p-2 w-full mb-2"
                placeholder="Search customer..."
              />

              {users && userSearch && isSearchMode && (
                <ul className="absolute -mt-2 bg-white border z-10 border-gray-300 rounded-md p-2 w-full text-sm">
                  {users.length > 0 ? (
                    users.map((user: any) => (
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

            <div className="relative col-span-1">
              <span className="flex justify-between items-center">
                <label
                  htmlFor="address"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Customer address
                </label>

                <button
                  className="btn btn-sm btn-primary -mt-6"
                  onClick={handleAddAddress}
                >
                  Add address
                </button>
              </span>

              <select
                id="address"
                value={formData.address_id}
                onChange={handleAddressChange}
                className="select border border-gray-300 rounded-md w-full text-sm"
              >
                <option value="" selected disabled>
                  Select Address
                </option>
                {address.length > 0 ? (
                  address.map((addr) => (
                    <option key={addr.address_id} value={addr.address_id}>
                      {addr.building_number}, {addr.area}, {addr.landmark},{" "}
                      {addr.city}, {addr.state},{addr.country}, {addr.pincode}
                    </option>
                  ))
                ) : (
                  <option disabled>No Address Available</option>
                )}
              </select>
              <p className="w-full text-red-500 text-sm">
                {errors.address_id || "\u00A0"}
              </p>
            </div>

            <div className="col-span-1">
              <label
                htmlFor="branch"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Branch
              </label>
              <select
                id="branch"
                className="select border border-gray-300 rounded-md p-2 w-full text-sm"
                value={formData.branch_id || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    branch_id: e.target.value ? Number(e.target.value) : null,
                  })
                }
              >
                <option value="" disabled>
                  Select Branch
                </option>
                {branches.length > 0 ? (
                  branches.map((branch) => (
                    <option key={branch.branch_id} value={branch.branch_id}>
                      {branch.branch_name}
                    </option>
                  ))
                ) : (
                  <option>No Data Available</option>
                )}
              </select>
              <p className="w-full text-red-500 text-sm">
                {errors.branch_id || "\u00A0"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap">
            <h1 className="text-xl font-semibold leading-none text-gray-900 mt-6 mb-5 ml-1">
              Item
            </h1>
          </div>

          {formData.items.map((item, index) => {
            return (
              <>
                <div className="border border-gray-200 rounded-xl mt-4 p-4">
                  <div key={index}>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,4fr))] gap-x-5 gap-y-3">
                      <div>
                        <label
                          htmlFor="category"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Category
                        </label>
                        <select
                          id="category"
                          value={item.category_id ?? ""}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "category_id",
                              e.target.value
                            )
                          }
                          className="select border border-gray-300 rounded-md p-2 w-full text-sm"
                        >
                          <option value="" disabled>
                            Select Category
                          </option>
                          {categories.map((cat) => (
                            <option
                              key={cat.category_id}
                              value={cat.category_id}
                            >
                              {cat.name}
                            </option>
                          ))}
                        </select>
                        <p className="w-full text-red-500 text-sm">
                          {errors[`items[${index}].category_id`]}
                        </p>
                      </div>

                      <div>
                        <label
                          htmlFor="product"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Product
                        </label>
                        <select
                          id="product"
                          value={item.product_id ?? ""}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "product_id",
                              e.target.value
                            )
                          }
                          className="select border border-gray-300 rounded-md p-2 w-full text-sm"
                        >
                          <option value="" disabled>
                            Select Product
                          </option>
                          {productCache[item.category_id]?.map((prod) => (
                            <option
                              key={prod.product_product_id}
                              value={prod.product_product_id}
                            >
                              {prod.product_name}
                            </option>
                          )) ||
                            (item.product_id && (
                              <option
                                key={item.product_id}
                                value={item.product_id}
                              >
                                {item.product_name}
                              </option>
                            ))}
                        </select>
                        <p className="w-full text-red-500 text-sm">
                          {errors[`items[${index}].product_id`]}
                        </p>
                      </div>

                      <div>
                        <label
                          htmlFor="service"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Service
                        </label>
                        <select
                          id="service"
                          value={item.service_id ?? ""}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "service_id",
                              e.target.value
                            )
                          }
                          className="select border border-gray-300 rounded-md p-2 w-full text-sm"
                        >
                          <option value="" disabled>
                            Select Service
                          </option>
                          {serviceCache[
                            `${item.category_id}_${item.product_id}`
                          ]?.map((serv: any) => (
                            <option
                              key={serv.service_service_id}
                              value={serv.service_service_id}
                            >
                              {serv.service_name}
                            </option>
                          ))}
                        </select>
                        <p className="w-full text-red-500 text-sm">
                          {errors[`items[${index}].service_id`]}
                        </p>
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Price
                        </label>
                        <input
                          type="text"
                          value={item.price || ""}
                          onChange={(e) =>
                            handleItemChange(index, "price", e.target.value)
                          }
                          className={`input border rounded-md p-2 w-full ${
                            isNaN(order_id)
                              ? "border-gray-300 bg-gray-100 text-sm text-gray-600 cursor-not-allowed focus:outline-none"
                              : "border-gray-300"
                          }`}
                          readOnly={isNaN(order_id)}
                        />
                        <p className="w-full text-red-500 text-sm">
                          {errors[`items[${index}].price`]}
                        </p>
                      </div>

                      <div>
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
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Item total
                        </label>
                        <input
                          type="text"
                          value={item.item_Total ?? ""}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "item_Total",
                              e.target.value
                            )
                          }
                          min="0"
                          step="0.01"
                          readOnly
                          className="input w-full border border-gray-300 bg-gray-100 text-sm text-gray-600 rounded-md p-2 cursor-not-allowed focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="description_checkbox"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Description
                        </label>
                        <input
                          className="checkbox checkbox-lg mt-2 ml-5"
                          id="description_checkbox"
                          data-datatable-check="true"
                          type="checkbox"
                          checked={item.showDescription}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "showDescription",
                              e.target.checked
                            )
                          }
                        />
                        <p className=" text-red-500 text-sm">{"\u00A0"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between sm:items-center smmobile:flex-col gap-y-2 smmobile:w-full">
                    <div>
                      {item.showDescription && (
                        <div>
                          <div className="flex smmobile:w-[100%] smmobile:justify-self-start flex-col md:w-[350px] lg:w-[420px] sm:w-[300px] h-[80px] mb-2">
                            <label
                              htmlFor="description"
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Description
                            </label>
                            <textarea
                              id="description"
                              value={item.description || ""}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              className="h-full input border border-gray-300 rounded-md p-2 w-full"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex block-element flex-end smmobile:justify-self-end justify-end relative">
                      <div>
                        <button
                          type="button"
                          className={`p-2 rounded-full ${
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
                  </div>
                </div>
              </>
            );
          })}

          <button
            type="button"
            onClick={handleAddItem}
            className="btn btn-secondary mb-6 mt-4"
          >
            Add Item
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Coupon Code
              </label>
              <select
                id="coupon_code"
                className="select border border-gray-300 rounded-md p-2 w-full text-sm"
                value={formData.coupon_code ?? ""}
                onChange={(e) => {
                  const selectedCoupon = validCoupons.find(
                    (coupon) => coupon.code === e.target.value
                  );
                  handleDropdownChange(selectedCoupon?.code);
                }}
              >
                <option value="" disabled>
                  Select Coupon Code
                </option>
                {validCoupons && validCoupons.length > 0 ? (
                  validCoupons.map((coupon) => (
                    <option key={coupon.coupon_id} value={coupon.code}>
                      {coupon.code}
                    </option>
                  ))
                ) : (
                  <option>No Coupons available</option>
                )}
              </select>
              <p className="text-red-500 text-sm">
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
                className="input border border-gray-300 bg-gray-100 text-sm text-gray-600 rounded-md p-2 cursor-not-allowed focus:outline-none"
              />
              <p className="w-full text-red-500 text-sm">
                {errors.coupon_discount || "\u00A0"}
              </p>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="express_delivery_charges"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Express Delivery Charges
              </label>
              <input
                type="text"
                id="express_delivery_charges"
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
              <label
                htmlFor="shipping_charges"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Shipping Charges
              </label>
              <input
                type="text"
                id="shipping_charges"
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
                className="input border border-gray-300 bg-gray-100 text-sm text-gray-600 rounded-md p-2 cursor-not-allowed focus:outline-none"
              />
              <p className="w-full text-red-500 text-sm">
                {errors.sub_total || "\u00A0"}
              </p>
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Total
              </label>
              <input
                type="text"
                value={formData.total || ""}
                readOnly
                className="input border border-gray-300 bg-gray-100 text-sm text-gray-600 rounded-md p-2 cursor-not-allowed focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="paid_amount"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Paid amount
              </label>
              <input
                type="text"
                id="paid_amount"
                value={formData.paid_amount || ""}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    paid_amount: Number(e.target.value),
                  });
                }}
                className="input border border-gray-300 rounded-md p-2"
                min="0"
                step="0.01"
              />
              <p className="w-full text-red-500 text-sm">
                {errors.paid_amount || "\u00A0"}
              </p>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="payment_method"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Payment Method
              </label>
              <select
                className="select border border-gray-300 rounded-md p-2 w-full text-sm"
                id="payment_method"
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
              {!order_id && formData.payment_type === 2 && (
                <div>
                  <button
                    className="-mt-2 badge text-sm badge-info badge-outline"
                    onClick={handleSendCustomerData}
                  >
                    <RiShareForwardFill color="blue" />
                    {"  "} Send Payment Link
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="payment_status"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Payment Status
              </label>
              <select
                className="select border border-gray-300 rounded-md p-2 w-full text-sm"
                id="payment_status"
                value={formData.payment_status ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    payment_status: Number(e.target.value),
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
              <label
                htmlFor="transaction_id"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Transaction ID
              </label>
              <input
                type="text"
                id="transaction_id"
                value={transactionId || ""}
                className="input border border-gray-300 bg-gray-100 text-sm text-gray-600 rounded-md p-2 cursor-not-allowed focus:outline-none"
                readOnly
              />
            </div>

            {/* {!order_id && (
              <div className="flex flex-col">
                <label
                  htmlFor="item_status"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Item status
                </label>
                <select
                  className="select border border-gray-300 rounded-md p-2 w-full text-sm"
                  id="item_status"
                  value={formData.order_status ?? null}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order_status: Number(e.target.value),
                    })
                  }
                >
                  <option value="" disabled selected>
                    Select item status
                  </option>
                  <option value={4}>Received at branch</option>
                  <option value={1}>Need to pickup</option>
                </select>
              </div>
            )} */}
          </div>

          <div className="mt-6 flex gap-4">
            <button
              type="submit"
              className={`btn btn-primary ${
                adding || updating ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={adding || updating}
            >
              {adding || updating
                ? adding
                  ? "Adding..."
                  : "Updating..."
                : order_id
                ? "Update Order"
                : "Add Order"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
              disabled={adding || updating}
            >
              Cancel
            </button>
          </div>
        </form>

        <AddressModal
          isOpen={modalIsOpen}
          setIsSubmit={setIsSubmit}
          onClose={() => setModalIsOpen(false)}
          userId={formData.user_id}
        />
        <CustomerModal
          isOpen={userModalIsOpen}
          setIsSubmit={setIsSubmit}
          onClose={() => setUserModalIsOpen(false)}
        />
      </div>
    </div>
  );
};

export default OrderForm;
