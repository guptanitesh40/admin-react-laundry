/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  useAddOrder,
  useApplyCoupon,
  useGeneratePaymentLink,
  useGetAddress,
  useGetBranches,
  useGetCategories,
  useGetCompanies,
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
import LoadingSpinner from "../shimmer/LoadingSpinner";
import { useSelector } from "react-redux";
import useFetchSettings from "../../hooks/settings/useGetSetting";
import Loading from "../shimmer/Loading";
import dayjs from "dayjs";

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
  express_delivery_hour: number | null;
  normal_delivery_charges: number;
  delivery_by: number | null;
  payment_type: number;
  payment_status: number;
  sub_total: number;
  paid_amount: number;
  kasar_amount: number;
  transaction_id: string;
  address_id: number | null;
  username: string;
  user_id: number;
  items: item[];
  total: number;
  branch_id: number;
  order_status: number | null;
  company_id: number | null;
  gstin: string;
  gst_company_name: string;
}

interface DeliveryInputs {
  express_delivery_charges: number | null;
  express_delivery_hour: number | null;
  normal_delivery_charges: number | null;
}

const OrderForm: React.FC = () => {
  const { prices, loading: loadingPrices } = useGetPrice();
  const { categories, loading: fetchingCategories } = useGetCategories();
  const { fetchProductsOnId, loading: fetchingProducs } = useGetProductsOnId();
  const { fetchServicesOnId, loading: fetchingServices } = useGetServicesOnId();

  const [userSearch, setUserSearch] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(true);
  const { id } = useParams<{ id: string }>();

  const { updateOrder, loading: updating } = useUpdateOrder();
  const { addOrder, loading: adding } = useAddOrder();
  const order_id = Number(id);
  const perPage = 1000;
  const pageNumber = 1;

  const { companies, loading: loadingCompanies } = useGetCompanies(
    pageNumber,
    perPage
  );
  const [haveGstIn, setHaveGstIn] = useState<boolean>(false);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [userModalIsOpen, setUserModalIsOpen] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const { users, fetchUsersByRole } = useGetUsersByRole();
  const { validCoupons, fetchValidCoupons } = useGetValidCoupon();

  const { branches, loading: loadingBranches } = useGetBranches(
    pageNumber,
    perPage
  );
  const { order, loading: loadingOrder, fetchOrder } = useGetOrder();
  const { address, fetchAddress } = useGetAddress();
  const { applyCoupon } = useApplyCoupon();
  const { userData, fetchUser } = useGetUser();
  const { generatePaymentLink, loading: sendingLink } =
    useGeneratePaymentLink();
  const { settings, loading: loadingSetting } = useFetchSettings();
  const user = userData?.user;
  const location = useLocation();
  const prevUrl = location?.state?.prevUrl || "/orders";
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [productCache, setProductCache] = useState<Record<number, any[]>>({});
  const [serviceCache, setServiceCache] = useState<Record<number, any[]>>({});
  const dropdownRef = useRef<HTMLUListElement>(null);
  const [focusOn, setFocusOn] = useState<boolean>(false);
  const [remainingAmount, setRemainingAmount] = useState<number | null>(null);
  const [deliveryDate, setDeliveryDate] = useState<string | null>(null);

  const currentUserData = useSelector((store) => store?.user);

  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    coupon_code: "",
    coupon_discount: null,
    express_delivery_charges: null,
    express_delivery_hour: null,
    normal_delivery_charges: null,
    delivery_by: 2,
    payment_type: 1,
    payment_status: null,
    sub_total: 0,
    paid_amount: null,
    kasar_amount: null,
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
    company_id: null,
    gstin: "",
    gst_company_name: "",
  });

  const [retrivedData, setRetrivedData] = useState<FormData>({
    coupon_code: "",
    coupon_discount: null,
    express_delivery_charges: null,
    express_delivery_hour: null,
    normal_delivery_charges: null,
    delivery_by: null,
    payment_type: null,
    payment_status: null,
    sub_total: 0,
    paid_amount: null,
    kasar_amount: null,
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
    company_id: null,
    gstin: "",
    gst_company_name: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsSearchMode(false);
        setFocusOn(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchOrder(order_id);
    };
    fetchData();
  }, [order_id]);

  useEffect(() => {
    if (address?.length) {
      const defaultAddress =
        address.find((add) => add.is_default) || address[0];

      setFormData((prev) => ({
        ...prev,
        address_id: defaultAddress ? defaultAddress.address_id : null,
      }));
    }
  }, [address]);

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
    if (!order_id) {
      setFormData((prev) => ({
        ...prev,
        payment_status: formData.payment_type === 1 ? 1 : null,
      }));
    }
  }, [formData.payment_type]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (focusOn && (!userSearch || userSearch.trim() === "")) {
        setIsSearchMode(true);
        await fetchUsersByRole(5);
      } else if (userSearch && isSearchMode) {
        await fetchUsersByRole(5, userSearch);
      }
    };
    fetchUserData();
  }, [focusOn, userSearch, isSearchMode]);

  useEffect(() => {
    if (order) {
      const fullName = `${order.user.first_name} ${order.user.last_name}`;
      setUserSearch(fullName);
      setIsSearchMode(false);

      const initialFormData: FormData = {
        coupon_code: order.coupon_code || "",
        coupon_discount: order.coupon_discount || null,
        express_delivery_charges: order.express_delivery_charges || null,
        express_delivery_hour: order.express_delivery_hour || null,
        normal_delivery_charges: order.normal_delivery_charges || null,
        payment_type: order.payment_type || null,
        payment_status: order.payment_status || null,
        sub_total: order.sub_total || 0,
        paid_amount: order.paid_amount || null,
        kasar_amount: order.kasar_amount || null,
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
          (order.normal_delivery_charges || 0),
        branch_id: order.branch_id,
        order_status: order.order_status,
        delivery_by: order.delivery_by,
        company_id: order.company_id,
        gstin: order.gstin,
        gst_company_name: order.gst_company_name,
      };

      setFormData(initialFormData);
      setRetrivedData(initialFormData);
      if (order.gst_company_name && order.gstin) {
        setHaveGstIn(true);
      }
    }
  }, [order]);

  useEffect(() => {
    const totalPaid =
      (formData.paid_amount || 0) + (formData.kasar_amount || 0);
    const remaining = formData.total - totalPaid;

    let newPaymentStatus = formData.payment_status;

    if (formData.total > 0 && totalPaid === formData.total) {
      newPaymentStatus = 2;
      setRemainingAmount(0);
    } else if (totalPaid > 0 && totalPaid < formData.total) {
      newPaymentStatus = 3;
      setRemainingAmount(remaining);
    } else if (totalPaid === 0 && formData.total > 0) {
      newPaymentStatus = 1;
      setRemainingAmount(remaining);
    }

    setFormData((prev) => ({
      ...prev,
      payment_status: newPaymentStatus,
    }));
  }, [formData.paid_amount, formData.kasar_amount, formData.total]);

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
        normal_delivery_charges: Number(formData.normal_delivery_charges),
        kasar_amount: Number(formData.kasar_amount),
        paid_amount: Number(formData.paid_amount),
        express_delivery_charges: Number(formData.express_delivery_charges),
        payment_type: Number(formData.payment_type),
        payment_status: Number(formData.payment_status),
        order_status: !!order_id ? formData.order_status : 4,
        items: formattedItems,
        company_id: formData.company_id,
        gstin: formData.gstin,
        gst_company_name: formData.gst_company_name,
      };

      const total = formData.total;

      await orderSchema.validate(dataToValidate, {
        abortEarly: false,
        context: { total },
      });
      setErrors({});

      const isDataChanged = () => {
        return (Object.keys(formData) as (keyof typeof formData)[]).some(
          (key) => {
            return formData[key] !== retrivedData[key];
          }
        );
      };

      if (!isDataChanged()) {
        navigate(`${prevUrl}`);
        return;
      }

      let success;
      const dataToSend = { ...dataToValidate };
      if (!dataToSend.company_id) {
        delete dataToSend.company_id;
      }
      if (order) {
        success = await updateOrder(order_id, dataToSend);
      } else {
        success = await addOrder(dataToValidate);
      }

      if (success) {
        navigate(`${prevUrl}`);
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
    if (e.target.value === "") {
      setFormData((prev) => ({ ...prev, address_id: null, user_id: null }));
    }
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
    navigate(`${prevUrl}`);
  };

  const handleAddItem = () => {
    // setFormData((prev) => ({
    //   ...prev,
    //   items: [
    //     ...prev.items,
    //     {
    //       category_id: null,
    //       product_id: null,
    //       product_name: "",
    //       service_id: null,
    //       service_name: "",
    //       description: null,
    //       price: null,
    //       quantity: 1,
    //       item_Total: null,
    //       showDescription: false,
    //     },
    //   ],
    // }));

    setFormData((prev) => {
      const lastItem = prev.items[prev.items.length - 1];

      return {
        ...prev,
        items: [
          ...prev.items,
          {
            ...lastItem,
            showDescription: false,
          },
        ],
      };
    });
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
        Number(formData.normal_delivery_charges || 0);

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
        Number(prev.normal_delivery_charges || 0);

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

    if (!newSubTotal) {
      toast.error("Please add items first to apply the coupon code.");
      return;
    }

    const couponData = await applyCoupon(formData.user_id, newSubTotal, code);

    const newTotal =
      Number(couponData.finalTotal || 0) +
      Number(formData.express_delivery_charges || 0) +
      Number(formData.normal_delivery_charges || 0);

    if (!couponData) {
      return;
    }

    if (couponData) {
      setFormData((prev) => ({
        ...prev,
        coupon_code: code,
        coupon_discount: couponData.discountAmount,
        sub_total: couponData.finalTotal,
        total: newTotal,
      }));
    }

    if (formData.express_delivery_hour) {
      const deliveryKey = `express_delivery_${formData.express_delivery_hour}hrs`;
      const percentageString = settings[deliveryKey];
      const percentage = Number(percentageString) / 100;

      if (isNaN(percentage)) {
        toast.error("Invalid delivery charge percentage!");
        return;
      }

      setFormData((prev) => {
        const expressDeliveryCharges = Math.floor(prev.sub_total * percentage);

        return {
          ...prev,
          express_delivery_charges: expressDeliveryCharges,
          total: prev.sub_total + expressDeliveryCharges,
        };
      });
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
        Number(updatedFormData.normal_delivery_charges || 0);

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
    const missingFields = [];

    if (!formData.total) missingFields.push("item total");
    if (!formData.username) missingFields.push("customer name");

    if (missingFields.length > 0) {
      toast.error(`Please add required fields: ${missingFields.join(", ")}`);
      return;
    }

    const customerInfo = {
      amount: formData.total,
      currency: "INR",
      user_id: formData.user_id,
      customer: {
        name: formData.username,
        contact: user?.mobile_number,
        email: user?.email,
      },
    };

    await generatePaymentLink(customerInfo);
  };

  const handleCustomerSelect = (customer: any, address: any) => {
    if (customer) {
      const fullName = `${customer.first_name} ${customer.last_name}`;
      setUserSearch(fullName);
      setIsSearchMode(false);

      setFormData({
        ...formData,
        username: fullName,
        user_id: customer.user_id,
      });
    }

    if (address) {
      setFormData((prev) => ({
        ...prev,
        address_id: address.address_id,
      }));
    }
  };

  const handleAddressSelect = (address: any) => {
    if (address) {
      setFormData((prev) => ({
        ...prev,
        address_id: address.address_id,
      }));
    }
  };

  const countItems = () => {
    const firstItemTotal = formData?.items?.[0]?.item_Total;
    return typeof firstItemTotal === "number" && firstItemTotal > 0
      ? formData.items.length
      : 0;
  };

  const countQty = () => {
    const firstItemTotal = Number(formData?.items?.[0]?.item_Total);

    return firstItemTotal > 0
      ? formData?.items?.reduce(
          (acc, item) => acc + Number(item.quantity || 0),
          0
        )
      : 0;
  };

  const handleDeliveryTimeChange = (value: number) => {
    if (!formData.sub_total) {
      toast.error("Please add items first");
      return;
    }

    if (settings && !loadingSetting) {
      if (formData.normal_delivery_charges) {
        setFormData((prev) => ({
          ...prev,
          normal_delivery_charges: null,
        }));
      }

      if (!value) {
        setFormData((prev) => ({
          ...prev,
          total: prev.total - prev.express_delivery_charges,
          express_delivery_hour: null,
          express_delivery_charges: null,
          normal_delivery_charges: null,
        }));
        return;
      }

      const deliveryKey = `express_delivery_${value}hrs`;
      const percentageString = settings[deliveryKey];
      const percentage = Number(percentageString) / 100;

      if (isNaN(percentage)) {
        toast.error("Invalid delivery charge percentage!");
        return;
      }

      const expressDeliveryCharges = Math.floor(
        formData.sub_total * percentage
      );
      setFormData((prev) => ({
        ...prev,
        express_delivery_hour: value,
        express_delivery_charges: expressDeliveryCharges,
        total: prev.sub_total + expressDeliveryCharges,
      }));
    } else {
      toast("Settings data not found!");
    }
  };

  useEffect(() => {
    if (
      formData.express_delivery_hour &&
      settings &&
      !loadingSetting &&
      formData.sub_total > 0
    ) {
      const deliveryKey = `express_delivery_${formData.express_delivery_hour}hrs`;
      const percentageString = settings[deliveryKey];
      const percentage = Number(percentageString) / 100;

      if (!isNaN(percentage)) {
        const expressDeliveryCharges = Math.floor(
          formData.sub_total * percentage
        );

        setFormData((prev) => ({
          ...prev,
          express_delivery_charges: expressDeliveryCharges,
          total: prev.sub_total + expressDeliveryCharges,
        }));
      }
    }
  }, [formData.sub_total]);

  useEffect(() => {
    if (!id && branches?.length && currentUserData && !loadingBranches) {
      const userBranchIds = currentUserData.user_branch || [];

      if (userBranchIds.length) {
        const branchDetail = branches.find(
          (branch) => branch.branch_id === userBranchIds[0]
        );

        if (branchDetail) {
          setFormData((prev) => ({
            ...prev,
            branch_id: branchDetail.branch_id,
          }));
        } else {
          toast("This branch manager has no valid branch");
        }
      } else {
        setFormData((prev) => ({
          ...prev,
          branch_id: branches[0].branch_id,
        }));
      }
    }
  }, [id, branches, currentUserData, loadingBranches]);

  useEffect(() => {
    if (!loadingCompanies && companies.length > 0 && !id) {
      const defaultOption = companies.find(
        (company) => company.gst_percentage === 6
      );

      if (defaultOption) {
        setFormData({
          ...formData,
          company_id: defaultOption.company_id,
        });
      }
    }
  }, [companies]);

  const initializeDefaultCombination = async () => {
    const priorityOrder = ["men", "women", "kids", "household"];

    const defaultCategory = [...categories].sort((a, b) => {
      const aIndex = priorityOrder.indexOf(a.name.toLowerCase());
      const bIndex = priorityOrder.indexOf(b.name.toLowerCase());
      return (
        (aIndex === -1 ? Infinity : aIndex) -
        (bIndex === -1 ? Infinity : bIndex)
      );
    })[0];

    if (!defaultCategory) return;

    const categoryId = defaultCategory.category_id;

    setFormData((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[0] = {
        ...updatedItems[0],
        category_id: categoryId,
      };

      return {
        ...prev,
        items: updatedItems,
      };
    });

    let products = productCache[categoryId];
    if (!products) {
      products = await fetchProductsOnId(categoryId);
      setProductCache((prev) => ({ ...prev, [categoryId]: products }));
    }
  };

  useEffect(() => {
    if (
      location.pathname === "/order/add" &&
      categories?.length &&
      !fetchingCategories
    ) {
      initializeDefaultCombination();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  // useEffect(() => {
  //   console.log("FormData : ", formData);
  // }, [formData]);

  const getDeliveryDate = ({
    express_delivery_charges,
    express_delivery_hour,
    normal_delivery_charges,
  }: DeliveryInputs): string | null => {
    if (express_delivery_charges && express_delivery_hour) {
      return dayjs().add(express_delivery_hour, "hour").format("DD/MM/YYYY");
    } else if (normal_delivery_charges) {
      const day = Number(settings?.estimate_delivery_normal_day || 4);
      return dayjs().add(day, "day").format("DD/MM/YYYY");
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (
      formData?.express_delivery_charges ||
      formData?.express_delivery_hour ||
      formData?.normal_delivery_charges
    ) {
      const date = getDeliveryDate({
        express_delivery_charges: formData?.express_delivery_charges,
        express_delivery_hour: formData?.express_delivery_hour,
        normal_delivery_charges: formData?.normal_delivery_charges,
      });
      setDeliveryDate(date);
    } else {
      setDeliveryDate(null);
    }
  }, [
    formData?.express_delivery_charges,
    formData?.express_delivery_hour,
    formData?.normal_delivery_charges,
  ]);

  if (loadingOrder && id) {
    return <Loading />;
  }

  if (loadingPrices) {
    return <Loading />;
  }

  return (
    <div className="container-fixed">
      <div className="card max-w-5xl mx-auto bg-white shadow-md lg:!p-4 xl:!p-6 sm:!p-5 p-3.5">
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
          <div className="grid md:grid-cols-2 cs1:gap-x-6 gap-x-4  gap-y-5 mt-4 grid-cols-1">
            <div className="md:!col-span-2 grid md:!grid-cols-3 cs1:gap-x-6 gap-x-4 items-start grid-cols-1">
              <div className="flex flex-col">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="company_id"
                >
                  Company
                </label>
                <select
                  id="company_id"
                  className="select border border-gray-300 rounded-md p-2 w-full text-sm"
                  value={formData.company_id || ""}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      company_id: e.target.value
                        ? Number(e.target.value)
                        : null,
                    });
                  }}
                >
                  <option value="" disabled>
                    Select Company
                  </option>
                  {loadingCompanies ? (
                    <option>loading...</option>
                  ) : companies.length > 0 ? (
                    companies.map((company) => (
                      <option
                        key={company.company_id}
                        value={company.company_id}
                      >
                        {`${company.company_name} (${company.gst_percentage}%)`}
                      </option>
                    ))
                  ) : (
                    <option>No Data available</option>
                  )}
                </select>
                <p className="text-red-500 text-sm">
                  {errors.company_id || "\u00A0"}
                </p>
              </div>

              <div>
                <label
                  htmlFor="branch"
                  className="!block text-gray-700 text-sm font-bold mb-2"
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

              <div className="flex flex-col">
                <label
                  htmlFor="delivery_by"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Delivery By
                </label>
                <select
                  className="select border border-gray-300 rounded-md p-2 w-full text-sm"
                  id="delivery_by"
                  value={formData.delivery_by || ""}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      delivery_by: Number(e.target.value),
                    });
                  }}
                >
                  <option value="" disabled>
                    Select Delivery By
                  </option>
                  <option value={1}>Home</option>
                  <option value={2}>Shop</option>
                </select>
                {/* <p className="w-full text-red-500 text-sm">{error.message || "\u00A0"}</p> */}
              </div>
            </div>

            <div className="relative col-span-1">
              <span className="flex justify-between items-center">
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Customer name
                </label>

                <button
                  type="button"
                  className="btn btn-sm btn-primary -mt-6 sm:btn-lg"
                  onClick={handleAddUser}
                >
                  Add Customer
                </button>
              </span>
              <input
                type="text"
                id="username"
                ref={inputRef}
                autoComplete="off"
                value={userSearch || ""}
                onChange={handleSearchChange}
                className="input border border-gray-300 rounded-md p-2 w-full mb-2"
                placeholder="Search customer..."
                onFocus={() => {
                  setFocusOn(true);
                  setIsSearchMode(true);
                }}
              />

              {users && isSearchMode && (
                <ul
                  ref={dropdownRef}
                  className="absolute -mt-2 bg-white border z-10 border-gray-300 rounded-md p-2 w-full text-sm max-h-[400px] overflow-y-auto"
                >
                  {users.length > 0 ? (
                    users.map((user: any) => (
                      <li
                        key={user.user_id}
                        className="p-2 hover:bg-gray-200 cursor-pointer rounded"
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
                  type="button"
                  className="btn btn-sm btn-primary -mt-6"
                  onClick={handleAddAddress}
                >
                  Add address
                </button>
              </span>

              <select
                id="address"
                value={formData.address_id ?? ""}
                onChange={handleAddressChange}
                className="select border border-gray-300 rounded-md w-full text-sm"
              >
                <option value="" disabled>
                  Select Address
                </option>
                {address.length > 0 && userSearch ? (
                  address.map((addr) => {
                    const {
                      building_number,
                      area,
                      landmark,
                      city,
                      state,
                      country,
                      pincode,
                    } = addr;
                    const parts = [
                      building_number,
                      area,
                      landmark,
                      city,
                      state,
                      country,
                      pincode,
                    ].filter(Boolean);
                    const str = parts.join(", ");

                    return (
                      <option key={addr.address_id} value={addr.address_id}>
                        {str}
                      </option>
                    );
                  })
                ) : (
                  <option disabled>No Address Available</option>
                )}
              </select>
              <p className="w-full text-red-500 text-sm">
                {errors.address_id || "\u00A0"}
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
              <React.Fragment key={index}>
                <div className="border border-gray-200 rounded-xl mt-4 xl:!p-4 space-y-2 p-3.5 max-w-full overflow-hidden">
                  <div>
                    <div className="grid res-item-container">
                      <div>
                        <label
                          htmlFor={`category${index}`}
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Category
                        </label>
                        <select
                          id={`category${index}`}
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
                          {fetchingCategories ? (
                            <>
                              <option>Loading...</option>
                            </>
                          ) : categories.length > 0 ? (
                            categories
                              .sort((a, b) => {
                                const priorityOrder = [
                                  "men",
                                  "women",
                                  "kids",
                                  "household",
                                ];

                                const normalize = (name: string) =>
                                  name.trim().toLowerCase();

                                const aIndex = priorityOrder.indexOf(
                                  normalize(a.name)
                                );
                                const bIndex = priorityOrder.indexOf(
                                  normalize(b.name)
                                );

                                if (aIndex === -1 && bIndex === -1) {
                                  return a.name.localeCompare(b.name);
                                }

                                return (
                                  (aIndex === -1 ? Infinity : aIndex) -
                                  (bIndex === -1 ? Infinity : bIndex)
                                );
                              })
                              .map((cat) => {
                                return (
                                  <option
                                    key={cat.category_id}
                                    value={cat.category_id}
                                  >
                                    {cat.name}
                                  </option>
                                );
                              })
                          ) : (
                            <option>No Category Available</option>
                          )}
                        </select>
                        <p className="w-full text-red-500 text-sm">
                          {errors[`items[${index}].category_id`]}
                        </p>
                      </div>

                      <div>
                        <label
                          htmlFor={`product${index}`}
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Product
                        </label>
                        <select
                          id={`product${index}`}
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
                          {!item.category_id ? (
                            <option disabled>Please select a category</option>
                          ) : fetchingProducs ? (
                            <option>Loading...</option>
                          ) : productCache[item.category_id]?.length > 0 ? (
                            productCache[item.category_id].map((prod) => (
                              <option
                                key={prod.product_product_id}
                                value={prod.product_product_id}
                              >
                                {prod.product_name}
                              </option>
                            ))
                          ) : item.product_id ? (
                            <option
                              key={item.product_id}
                              value={item.product_id}
                            >
                              {item.product_name}
                            </option>
                          ) : (
                            <option>No Product Available</option>
                          )}
                        </select>

                        <p className="w-full text-red-500 text-sm">
                          {errors[`items[${index}].product_id`]}
                        </p>
                      </div>

                      <div>
                        <label
                          htmlFor={`service${index}`}
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Service
                        </label>
                        <select
                          id={`service${index}`}
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
                          {!item.product_id ? (
                            <option disabled>Please select a product</option>
                          ) : fetchingServices ? (
                            <option>Loading...</option>
                          ) : serviceCache[
                              `${item.category_id}_${item.product_id}`
                            ]?.length > 0 ? (
                            serviceCache[
                              `${item.category_id}_${item.product_id}`
                            ].map((serv: any) => (
                              <option
                                key={serv.service_service_id}
                                value={serv.service_service_id}
                              >
                                {serv.service_name}
                              </option>
                            ))
                          ) : item.service_id ? (
                            <option
                              key={item.service_id}
                              value={item.service_id}
                            >
                              {item.service_name}
                            </option>
                          ) : (
                            <option>No service available</option>
                          )}
                        </select>
                        <p className="w-full text-red-500 text-sm">
                          {errors[`items[${index}].service_id`]}
                        </p>
                      </div>

                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor={`price${index}`}
                        >
                          Price
                        </label>
                        <input
                          type="text"
                          id={`price${index}`}
                          value={item.price || ""}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "price",
                              Number(e.target.value)
                            )
                          }
                          className={`input border rounded-md p-2 w-full border-gray-300 bg-gray-100 text-sm text-gray-600`}
                        />
                        <p className="w-full text-red-500 text-sm">
                          {errors[`items[${index}].price`]}
                        </p>
                      </div>

                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor={`quantity${index}`}
                        >
                          Quantity
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id={`quantity${index}`}
                            autoComplete="off"
                            value={item.quantity ?? 1}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "quantity",
                                Number(e.target.value)
                              )
                            }
                            className="w-full p-2 text-sm focus:outline-none input text-center"
                          />
                          <button
                            type="button"
                            className="absolute top-1/2 left-1.5 -translate-y-1/2 p-1 rounded hover:bg-gray-200 transition"
                            onClick={() =>
                              handleItemChange(
                                index,
                                "quantity",
                                Math.max(1, (item.quantity ?? 1) - 1)
                              )
                            }
                          >
                            <i className="ki-filled ki-minus text-gray-600 text-base" />
                          </button>

                          <button
                            type="button"
                            className="absolute top-1/2 right-1.5 -translate-y-1/2 p-1 rounded hover:bg-gray-200 transition"
                            onClick={() =>
                              handleItemChange(
                                index,
                                "quantity",
                                (item.quantity ?? 1) + 1
                              )
                            }
                          >
                            <i className="ki-filled ki-plus text-gray-500 text-base" />
                          </button>
                        </div>
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
                          className="input w-full border border-gray-300 bg-gray-100 text-sm text-gray-600 rounded-md p-2 cursor-not-allowed focus:!border-gray-300"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor={`description_checkbox${index}`}
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Remarks
                        </label>
                        <div className="h-full w-full flex items-center cs2:justify-center justify-start cs2:ml-0 lgmobile:!ml-4 ml-[9px]">
                          <input
                            className="checkbox checkbox-lg"
                            id={`description_checkbox${index}`}
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
                        </div>
                      </div>
                      <div className="flex flex-col items-center max-w-[40px]">
                        <label className="text-gray-700 text-sm font-bold mb-2 lgmobile:block hidden">
                          &nbsp;
                        </label>
                        <div className="grow flex justify-center items-center">
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

                  <div className="flex justify-between sm:items-center smmobile:flex-col gap-y-2 smmobile:w-full">
                    <div>
                      {item.showDescription && (
                        <div>
                          <div className="flex mt-2 smmobile:w-[100%] smmobile:justify-self-start flex-col md:w-[350px] lg:w-[420px] sm:w-[300px] h-[80px] mb-2">
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
                  </div>
                </div>
              </React.Fragment>
            );
          })}

          <div className="flex bndesktop:!items-center justify-start cs2:gap-12 sm:!gap-8 flex-wrap bndesktop:!gap-4 gap-2 bndesktop:!flex-row flex-col items-start mb-4">
            <button
              type="button"
              onClick={handleAddItem}
              className="btn btn-primary bndesktop:!mb-6 mt-4"
            >
              Add Item
            </button>
            <p className="block text-gray-900 text-sm font-bold">
              Total Items : {countItems()}
            </p>
            <p className="block text-gray-900 text-sm font-bold">
              Total Quantity : {countQty()}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 cs1:!gap-6 gap-4">
            <div className="flex flex-col">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="coupon_code"
              >
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
                  validCoupons.map((coupon) => {
                    return (
                      <option key={coupon.coupon_id} value={coupon.code}>
                        {coupon.code}{" "}
                        {formData.coupon_code === coupon.code
                          ? ""
                          : `(min: ${coupon.min_cart_value || 0})`}
                      </option>
                    );
                  })
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
              <label
                htmlFor="kasar_amount"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Kasar amount
              </label>
              <input
                type="text"
                id="kasar_amount"
                autoComplete="off"
                value={formData.kasar_amount || ""}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    kasar_amount: Number(e.target.value),
                  });
                }}
                className="input border border-gray-300 rounded-md p-2"
                min="0"
                step="0.01"
              />
            </div>

            <div className="flex flex-col md:!col-span-2">
              <div className="md:!col-span-2 grid sm:!grid-cols-3 cs1:!gap-6 gap-4 grid-cols-1">
                <div className="flex flex-col">
                  <label
                    htmlFor="exp_delivery_time"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Express Delivery Time
                  </label>
                  <select
                    className="select border border-gray-300 rounded-md p-2 w-full text-sm"
                    id="exp_delivery_time"
                    value={formData.express_delivery_hour || ""}
                    onChange={(e) => {
                      handleDeliveryTimeChange(Number(e.target.value));
                    }}
                  >
                    <option value="">Select Express Delivery Time</option>
                    <option value={24}>24 Hrs</option>
                    <option value={48}>48 Hrs</option>
                    <option value={72}>72 Hrs</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="express_delivery_charges"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Express Delivery Charge
                  </label>
                  <input
                    type="text"
                    id="express_delivery_charges"
                    autoComplete="off"
                    min="0"
                    value={formData.express_delivery_charges || ""}
                    onChange={(e) =>
                      handleChargeChange(
                        "express_delivery_charges",
                        e.target.value
                      )
                    }
                    className={`${
                      formData.normal_delivery_charges > 0
                        ? "input border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed focus:outline-none"
                        : "input border border-gray-300 rounded-md p-2"
                    }`}
                    readOnly={formData.normal_delivery_charges > 0}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="normal_delivery_charges"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Normal Delivery Charge
                  </label>
                  <input
                    type="text"
                    id="normal_delivery_charges"
                    min="0"
                    autoComplete="off"
                    value={formData.normal_delivery_charges || ""}
                    onChange={(e) =>
                      handleChargeChange(
                        "normal_delivery_charges",
                        e.target.value
                      )
                    }
                    className={`${
                      formData.express_delivery_charges > 0
                        ? "input border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed focus:outline-none"
                        : "input border border-gray-300 rounded-md p-2"
                    }`}
                    readOnly={formData.express_delivery_charges > 0}
                  />
                </div>
              </div>
              {deliveryDate && !order_id && (
                <p className="w-full text-green-500 text-sm font-medium mt-1">
                  {`Your order will be delivered on ${
                    deliveryDate ? deliveryDate : "\u00A0"
                  }`}
                </p>
              )}
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
                    type="button"
                    className="relative min-w-[160px] min-h-[40px] flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-500 rounded-lg hover:bg-blue-100 transition disabled:opacity-50"
                    onClick={handleSendCustomerData}
                    disabled={sendingLink}
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      {sendingLink ? (
                        <LoadingSpinner />
                      ) : (
                        <RiShareForwardFill className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <span>Send Payment Link</span>
                  </button>
                </div>
              )}
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
                autoComplete="off"
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
                {errors.payment_status}
              </p>
              {formData.payment_status === 2 && remainingAmount > 0 && (
                <p className="w-full text-red-500 text-sm">
                  {`Remaining amount Rs ${remainingAmount}`}
                </p>
              )}
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
                autoComplete="off"
                value={formData.transaction_id ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    transaction_id: e.target.value,
                  })
                }
                className="input border border-gray-300 text-sm text-gray-600 rounded-md p-2 focus:outline-none"
              />
            </div>

            <div className="flex flex-col justify-center items-start">
              <label
                htmlFor="have_gst_cb"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Do you have GSTIN ?
              </label>
              <input
                className="checkbox"
                id="have_gst_cb"
                name="check"
                type="checkbox"
                checked={haveGstIn}
                onChange={(e) => {
                  setHaveGstIn(e.target.checked);
                }}
              />
            </div>

            {haveGstIn && (
              <>
                <div className="flex flex-col">
                  <label
                    htmlFor="gstin"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    GSTIN
                  </label>
                  <input
                    type="text"
                    id="gstin"
                    autoComplete="off"
                    value={formData.gstin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gstin: e.target.value,
                      })
                    }
                    className="uppercase input border border-gray-300 text-sm text-gray-600 rounded-md p-2 focus:outline-none"
                  />
                  <p className="w-full text-red-500 text-sm">
                    {errors.gstin || "\u00A0"}
                  </p>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="gst_company_name"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="gst_company_name"
                    autoComplete="off"
                    value={formData.gst_company_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gst_company_name: e.target.value,
                      })
                    }
                    className="input border border-gray-300 text-sm text-gray-600 rounded-md p-2 focus:outline-none"
                  />
                  <p className="w-full text-red-500 text-sm">
                    {errors.gst_company_name || "\u00A0"}
                  </p>
                </div>
              </>
            )}

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
          onAddressAdded={handleAddressSelect}
          isOpen={modalIsOpen}
          setIsSubmit={setIsSubmit}
          onClose={() => setModalIsOpen(false)}
          userId={formData.user_id}
          fullname={formData.username}
        />
        <CustomerModal
          onCustomerCreated={handleCustomerSelect}
          isOpen={userModalIsOpen}
          setIsSubmit={setIsSubmit}
          onClose={() => setUserModalIsOpen(false)}
        />
      </div>
    </div>
  );
};

export default OrderForm;
