import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddCoupon, useUpdateCoupon } from "../../hooks";
import toast from "react-hot-toast";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import * as Yup from "yup";
import { couponSchema } from "../../validation/couponSchema";

const CouponModal: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { coupon } = location.state || {};

  const [startDate, setStartDate] = useState<Dayjs | null>();

  const [formData, setFormData] = useState({
    code: "",
    title: "",
    description: "",
    discount_value: null,
    discount_type: null,
    start_time: dayjs(),
    end_time: dayjs(),
    maximum_usage_count_per_user: null,
    total_usage_count: null,
    coupon_type: null,
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (coupon) {
      setFormData({
        code: coupon.code,
        title: coupon.title,
        description: coupon.description,
        discount_value: coupon.discount_value.toString(),
        discount_type: coupon.discount_type.toString(),
        start_time: dayjs(coupon.start_time),
        end_time: dayjs(coupon.end_time),
        maximum_usage_count_per_user:
          coupon.maximum_usage_count_per_user.toString(),
        total_usage_count: coupon.total_usage_count.toString(),
        coupon_type: coupon.coupon_type.toString(),
      });
    }
  }, [coupon]);

  const handelCancel = () => {
    navigate("/coupon");
  };

  const handleStartTimeChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setStartDate(newValue);
      setFormData((prev) => ({ ...prev, start_time: newValue }));
    }
  };

  const handleEndTimeChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setFormData((prev) => ({ ...prev, end_time: newValue }));
    }
  };

  const { addCoupon, loading: addingCoupon } = useAddCoupon();
  const { updateCoupon, loading: updatingCoupon } = useUpdateCoupon();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToValidate = {
      ...formData,
      discount_type: parseInt(formData.discount_type, 10),
      coupon_type: parseInt(formData.coupon_type, 10),
      discount_value: parseInt(formData.discount_value, 10),
      maximum_usage_count_per_user: parseInt(
        formData.maximum_usage_count_per_user,
        10
      ),
      total_usage_count: parseInt(formData.total_usage_count, 10),
      start_time: formData.start_time.toISOString(),
      end_time: formData.end_time.toISOString(),
    };

    try {
      await couponSchema.validate(dataToValidate, { abortEarly: false });

      if (coupon?.coupon_id) {
        const success = await updateCoupon(coupon.coupon_id, dataToValidate);
      } else {
        const success = await addCoupon(dataToValidate);
      }      
      navigate("/coupon");
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

  return (
    <div className="align-center justify-center mx-16">
      <div className="card card-grid w-[790px]">
        <div className="border-0 mx-auto p-8 max-w-4xl align-middle">
          <h2 className="card-title flex flex-col items-start">
            <span className="card-label font-bold text-gray-700 text-2xl mb-5">
              {coupon ? "Edit Coupon" : "Add Coupon"}
            </span>
          </h2>

          <form
            onSubmit={handleSubmit}
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="mb-4 col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Code
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                className="input border border-gray-300 rounded-md p-2 w-full"
              />
              <p className="w-full text-red-500 text-sm">
                {errors.code || "\u00A0"}
              </p>
            </div>

            <div className="mb-4 col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="input border border-gray-300 rounded-md p-2 w-full"
              />
              <p className="text-red-500 text-sm">{errors.title || "\u00A0"}</p>
            </div>

            <div className="mb-4 col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="input border border-gray-300 rounded-md p-2 w-full"
              />
              <p className="text-red-500 text-sm">
                {errors.description || "\u00A0"}
              </p>
            </div>

            <div className="mb-4 col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Discount Type
              </label>
              <select
                className="select border border-gray-300 rounded-md p-2 w-full text-sm"
                value={formData.discount_type ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, discount_type: e.target.value })
                }
              >
                <option value="" disabled>
                  Select Discount Type
                </option>
                <option value="1">Percentage</option>
                <option value="2">Flat</option>
              </select>
              <p className="text-red-500 text-sm">
                {errors.discount_type || "\u00A0"}
              </p>
            </div>


            <div className="mb-4 col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Discount Value
              </label>
              <input
                type="text"
                value={formData.discount_value}
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
              <div className="mb-4 col-span-1 w-[320px]">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Start Time
                </label>
                <DateTimePicker
                  value={formData.start_time}
                  onChange={handleStartTimeChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                  disablePast
                />
                <p className="text-red-500 text-sm">
                  {errors.start_time || "\u00A0"}
                </p>
              </div>

              <div className="mb-4 col-span-1 w-[320px]">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  End Time
                </label>
                <DateTimePicker
                  value={formData.end_time}
                  onChange={handleEndTimeChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                  
                />
                <p className="text-red-500 text-sm">
                  {errors.end_time || "\u00A0"}
                </p>
              </div>
            </LocalizationProvider>

            <div className="mb-4 col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Max Usage Per User
              </label>
              <input
                type="text"
                value={formData.maximum_usage_count_per_user}
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

            <div className="mb-4 col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Total Usage Count
              </label>
              <input
                type="text"
                value={formData.total_usage_count}
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

            <div className="mb-4 col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Coupon Type
              </label>
              <select
                className="select border border-gray-300 rounded-md p-2 w-full text-sm"
                value={formData.coupon_type ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, coupon_type: e.target.value })
                }
              >
                <option value="" disabled>
                  Select Coupon Type
                </option>
                <option value="1">Web</option>
                <option value="2">Mobile</option>
                <option value="3">Both</option>
              </select>
              <p className="text-red-500 text-sm">
                {errors.coupon_type || "\u00A0"}
              </p>
            </div>

            <div className="flex items-center col-span-2 space-x-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading
                  ? "Saving..."
                  : coupon
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
      </div>
    </div>
  );
};

export default CouponModal;
