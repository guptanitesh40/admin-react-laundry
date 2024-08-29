import React, { useEffect } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { Controller, useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { couponSchema } from "../../validation/couponShema";

Modal.setAppElement("#root");

interface CouponModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  editMode: boolean;
  currentCoupon?: {
    code: string;
    description: string;
    title: string;
    start_time: string;
    end_time: string;
    total_usage_count: number;
    maximum_usage_count_per_user: number;
    discount_type: number;
    discount_value: number;
    coupon_type: number;
  } | null;
  addCoupon: (formData: FormData) => Promise<boolean>;
  updateCoupon: (code: string, data: FormData) => Promise<boolean>;
  refetch: () => void;
  loading: boolean;
  handleCancelClick: () => void;
}

interface FormValues {
  code: string;
  description: string;
  title: string;
  start_time: string;
  end_time: string;
  total_usage_count: number;
  maximum_usage_count_per_user: number;
  discount_type: number;
  discount_value: number;
  coupon_type: number;
}

const CouponModal: React.FC<CouponModalProps> = ({
  isOpen,
  editMode,
  currentCoupon,
  addCoupon,
  updateCoupon,
  refetch,
  loading,
  handleCancelClick,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: !editMode ? yupResolver(couponSchema) : undefined,
    mode: "onBlur",
  });

  useEffect(() => {
    if (isOpen) {
      if (editMode && currentCoupon) {
        reset({
          code: currentCoupon.code || "",
          description: currentCoupon.description || "",
          title: currentCoupon.title || "",
          start_time: currentCoupon.start_time || "",
          end_time: currentCoupon.end_time || "",
          total_usage_count: currentCoupon.total_usage_count || 1,
          maximum_usage_count_per_user: currentCoupon.maximum_usage_count_per_user || 1,
          discount_type: currentCoupon.discount_type || 1,
          discount_value: currentCoupon.discount_value || 0,
          coupon_type: currentCoupon.coupon_type || 1,
        });
      } else {
        reset({
          code: "",
          description: "",
          title: "",
          start_time: "",
          end_time: "",
          total_usage_count: 1,
          maximum_usage_count_per_user: 1,
          discount_type: 1,
          discount_value: 0,
          coupon_type: 1,
        });
      }
    }
  }, [isOpen, editMode, currentCoupon, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key as keyof FormValues].toString());
      console.log("Form Data: ", data);

    });

    try {
      if (editMode && currentCoupon) {
        await updateCoupon(currentCoupon.code, formData);
      } else {
        await addCoupon(formData);
      }
      refetch();
      handleCancelClick();
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCancelClick}
      contentLabel="Coupon Modal"
      className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
      overlayClassName="fixed inset-0 bg-black bg-opacity-70 z-40 transition-opacity"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 sm:p-12 space-y-6">
        <button
          type="button"
          onClick={handleCancelClick}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-4xl font-semibold text-gray-800 text-center">
          {editMode ? "Edit Coupon" : "Add Coupon"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {[
            { label: "Code", type: "text", name: "code" },
            { label: "Description", type: "textarea", name: "description" },
            { label: "Title", type: "text", name: "title" },
            { label: "Start Time", type: "datetime-local", name: "start_time" },
            { label: "End Time", type: "datetime-local", name: "end_time" },
            { label: "Total Usage Count", type: "number", name: "total_usage_count" },
            { label: "Max Usage Count Per User", type: "number", name: "maximum_usage_count_per_user" },
            { label: "Discount Value", type: "number", name: "discount_value" },
          ].map(({ label, type, name }) => (
            <div key={name} className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {label}
              </label>
              <Controller
                name={name as keyof FormValues}
                control={control}
                render={({ field }) =>
                  type === "textarea" ? (
                    <textarea
                      {...field}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                      placeholder={`Enter ${label}`}
                      rows={4}
                    />
                  ) : (
                    <input
                      type={type}
                      {...field}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                      placeholder={`Enter ${label}`}
                    />
                  )
                }
              />
              <p className="text-red-500 text-sm">
                {(errors as Record<string, { message?: string }>)?.[name]?.message}
              </p>
            </div>
          ))}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Discount Type
            </label>
            <Controller
              name="discount_type"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                >
                  <option value={1}>Percentage</option>
                  <option value={2}>Flat</option>
                </select>
              )}
            />
            <p className="text-red-500 text-sm">{errors.discount_type?.message}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Coupon Type
            </label>
            <Controller
              name="coupon_type"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                >
                  <option value={1}>One-Time</option>
                  <option value={2}>Recurring</option>
                </select>
              )}
            />
            <p className="text-red-500 text-sm">{errors.coupon_type?.message}</p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={handleCancelClick}
              className="py-2 px-6 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`py-2 px-6 rounded-lg text-white ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-600 transition-colors duration-300"
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : editMode ? "Update Coupon" : "Add Coupon"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CouponModal;
