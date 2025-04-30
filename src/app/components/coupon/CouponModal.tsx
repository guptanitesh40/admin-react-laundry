import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAddCoupon, useGetCoupon, useUpdateCoupon } from "../../hooks";
import toast from "react-hot-toast";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import * as Yup from "yup";
import { couponSchema } from "../../validation/couponSchema";
import Loading from "../shimmer/Loading";

const CouponModal: React.FC = () => {
  const { addCoupon, loading: addingCoupon } = useAddCoupon();
  const { updateCoupon, loading: updatingCoupon } = useUpdateCoupon();
  const { coupon, fetchCoupon, loading: loadingCoupon } = useGetCoupon();

  const { id } = useParams<{ id: string }>();
  const coupon_id = Number(id);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    code: null,
    title: "",
    description: "",
    discount_value: null,
    discount_type: null,
    start_time: dayjs(),
    end_time: dayjs(),
    maximum_usage_count_per_user: null,
    total_usage_count: null,
    coupon_type: null,
    min_cart_value: null,
  });

  const [initialFormData, setInitialFormData] = useState({
    code: null,
    title: "",
    description: "",
    discount_value: null,
    discount_type: null,
    start_time: dayjs(),
    end_time: dayjs(),
    maximum_usage_count_per_user: null,
    total_usage_count: null,
    coupon_type: null,
    min_cart_value: null,
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    const fetchCouponData = async () => {
      await fetchCoupon(coupon_id);
    };
    fetchCouponData();
  }, [coupon_id]);

  useEffect(() => {
    if (coupon) {
      const fetchedData = {
        code: coupon.code,
        title: coupon.title,
        description: coupon.description,
        discount_value: coupon.discount_value,
        discount_type: coupon.discount_type,
        start_time: dayjs(coupon.start_time),
        end_time: dayjs(coupon.end_time),
        maximum_usage_count_per_user:
          coupon.maximum_usage_count_per_user.toString(),
        total_usage_count: coupon.total_usage_count.toString(),
        coupon_type: coupon.coupon_type.toString(),
        min_cart_value: coupon.min_cart_value.toString(),
      };

      setFormData(fetchedData);
      setInitialFormData(fetchedData);
    }
  }, [coupon]);

  const handelCancel = () => {
    navigate("/coupon");
  };

  const handleStartTimeChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setFormData((prev) => ({ ...prev, start_time: newValue }));
    }
  };

  const handleEndTimeChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setFormData((prev) => ({ ...prev, end_time: newValue }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToValidate = {
      ...formData,
      code: formData?.code?.toUpperCase(),
      discount_type: Number(formData.discount_type),
      coupon_type: Number(formData.coupon_type),
      discount_value: Number(formData.discount_value),
      maximum_usage_count_per_user: Number(
        formData.maximum_usage_count_per_user
      ),
      total_usage_count: Number(formData.total_usage_count),
      start_time: formData.start_time.toISOString(),
      end_time: formData.end_time.toISOString(),
      min_cart_value: Number(formData.min_cart_value),
    };

    try {
      const isDataChanged = () => {
        return (Object.keys(formData) as (keyof typeof formData)[]).some(
          (key) => {
            return formData[key] !== initialFormData[key];
          }
        );
      };

      if (!isDataChanged()) {
        navigate("/coupon");
        return;
      }

      let success;
      await couponSchema.validate(dataToValidate, { abortEarly: false });

      if (coupon?.coupon_id) {
        success = await updateCoupon(coupon.coupon_id, dataToValidate);
      } else {
        success = await addCoupon(dataToValidate);
      }
      if (success) {
        navigate("/coupon");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const formErrors: any = {};
        error.inner.forEach((err) => {
          formErrors[err.path] = err.message;
        });
        setErrors(formErrors);
      } else {
        toast.error("Failed to submit the form. Please try again.");
      }
    }
  };

  const isLoading = addingCoupon || updatingCoupon;

  if (loadingCoupon && id) {
    return <Loading />;
  }

  return (
    <div className="card max-w-4xl mx-auto p-6 bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-6">
        {coupon ? "Edit Coupon" : "Add Coupon"}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          <div className="flex flex-col">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="coupon_code"
            >
              Code
            </label>
            <input
              type="text"
              id="coupon_code"
              autoComplete="off"
              value={formData.code ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="w-full text-red-500 text-sm">
              {errors.code || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              autoComplete="off"
              value={formData.title ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="input border border-gray-300 rounded-md p-2 w-full"
            />
            <p className="text-red-500 text-sm">{errors.title || "\u00A0"}</p>
          </div>

          <div className="flex flex-col md:col-span-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="h-20 input border border-gray-300 rounded-md p-2 w-full"
            />
            <p className="text-red-500 text-sm">
              {errors.description || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="discount_type"
            >
              Discount Type
            </label>
            <select
              id="discount_type"
              className="select border border-gray-300 rounded-md p-2 w-full text-sm"
              value={formData.discount_type ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  discount_type: Number(e.target.value),
                })
              }
            >
              <option value="" disabled>
                Select Discount Type
              </option>
              <option value={1}>Flat</option>
              <option value={2}>Percentage</option>
            </select>
            <p className="text-red-500 text-sm">
              {errors.discount_type || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="discount_value"
            >
              Discount Value
            </label>
            <input
              id="discount_value"
              type="text"
              value={formData.discount_value ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, discount_value: e.target.value })
              }
              className="input border border-gray-300 rounded-md p-2 w-full"
            />
            <p className="text-red-500 text-sm">
              {errors.discount_value || "\u00A0"}
            </p>
          </div>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="mb-4 col-span-1 mini:w-[300px] lgscreen:w-[90%]">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Start Time
              </label>
              <DateTimePicker
                value={formData.start_time}
                onChange={handleStartTimeChange}
                format="DD-MM-YYYY hh:mm:ss A"
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
                disablePast
              />
            </div>

            <div className="mb-4 col-span-1 mini:w-[300px] lgscreen:w-[90%]">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                End Time
              </label>
              <DateTimePicker
                value={formData.end_time}
                onChange={handleEndTimeChange}
                format="DD-MM-YYYY hh:mm:ss A"
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
                minDateTime={formData.start_time}
              />
            </div>
          </LocalizationProvider>

          <div className="flex flex-col">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="maximum_usage_count_per_user"
            >
              Max Usage Per User
            </label>
            <input
              type="text"
              id="maximum_usage_count_per_user"
              autoComplete="off"
              value={formData.maximum_usage_count_per_user ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maximum_usage_count_per_user: e.target.value,
                })
              }
              className="input border border-gray-300 rounded-md p-2 w-full"
            />
            <p className="text-red-500 text-sm">
              {errors.maximum_usage_count_per_user || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="total_usage_count"
            >
              Total Usage Count
            </label>
            <input
              type="text"
              id="total_usage_count"
              autoComplete="off"
              value={formData.total_usage_count ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  total_usage_count: e.target.value,
                })
              }
              className="input border border-gray-300 rounded-md p-2 w-full"
            />
            <p className="text-red-500 text-sm">
              {errors.total_usage_count || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="coupon_type"
            >
              Coupon Type
            </label>
            <select
              id="coupon_type"
              className="select border border-gray-300 rounded-md p-2 w-full text-sm"
              value={formData.coupon_type ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  coupon_type: Number(e.target.value),
                })
              }
            >
              <option value="" disabled>
                Select Coupon Type
              </option>
              <option value={1}>Web</option>
              <option value={2}>App</option>
              <option value={3}>Both</option>
            </select>
            <p className="text-red-500 text-sm">
              {errors.coupon_type || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="min_cart_value"
            >
              Minimum Cart Value
            </label>
            <input
              type="text"
              id="min_cart_value"
              autoComplete="off"
              value={formData.min_cart_value ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  min_cart_value: e.target.value,
                })
              }
              className="input border border-gray-300 rounded-md p-2 w-full"
            />
            <p className="text-red-500 text-sm">
              {errors.min_cart_value || "\u00A0"}
            </p>
          </div>
        </div>

        <div className="flex justify-start mt-6 gap-4">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading
              ? "Saving..."
              : coupon_id
              ? "Update Coupon"
              : "Add Coupon"}
          </button>
          <button
            type="submit"
            className="btn  btn-light py-5 px-10 "
            disabled={isLoading}
            onClick={handelCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CouponModal;
