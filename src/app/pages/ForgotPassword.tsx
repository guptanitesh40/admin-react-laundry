import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSendOtp } from "../hooks";
import * as Yup from "yup";
import LoadingSpinner from "../components/shimmer/LoadingSpinner";

const validationSchema = Yup.object({
  mobile_number: Yup.string()
    .required("Please enter mobile number")
    .matches(/^[0-9]{10}$/, "Mobile Number must be a 10-digit number")
    .test("format", "Mobile Number must be a 10-digit number", (value) => {
      if (!value) return true;
      return /^[0-9]{10}$/.test(value);
    }),

  role_id: Yup.number().required("Please select the user role"),
});

const ForgotPassword = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    role_id: undefined as number | undefined,
    mobile_number: undefined as number | undefined,
  });

  const { sendOtp, loading } = useSendOtp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const success = await sendOtp(formData);
      if (success) {
        navigate("/forgot-password/enterotp", { state: { formData } });
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const formErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          formErrors[err.path || ""] = err.message;
        });
        setErrors(formErrors);
      }
    }
  };

  return (
    <div className="flex justify-center items-center p-5 order-2 lg:order-1 w-full">
      <div className="card max-w-[370px] w-full">
        <form
          className="card-body flex flex-col gap-y-1 p-10"
          onSubmit={handleSubmit}
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Forgot Password ?
            </h3>
            <span className="text-2sm font-medium text-gray-600">
              Enter your mobile number
            </span>
          </div>

          <div className="flex flex-col gap-1 mt-3">
            <label
              htmlFor="role_id"
              className="form-label text-gray-900 text-sm vsmobile:text-xs"
            >
              Select role
            </label>
            <select
              className="select select-lg w-full text-sm vsmobile:text-xs p-2 border rounded-md"
              name="role_id"
              value={formData.role_id || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role_id: Number(e.target.value),
                })
              }
            >
              <option value="" disabled>
                Select User
              </option>
              <option value={1}>Super Admin</option>
              <option value={2}>Sub Admin</option>
              <option value={3}>Branch Manager</option>
              <option value={6}>Workshop Manager</option>
            </select>
            <p className="text-red-500 text-sm">{errors.role_id || "\u00A0"}</p>
          </div>

          <div className="flex flex-col gap-1 mt-3 mb-2">
            <label className="form-label text-gray-900 text-sm vsmobile:text-xs">
              Mobile Number
            </label>
            <label className="input" data-toggle-password="true">
              <input
                name="mobile_number"
                autoComplete="off"
                value={formData.mobile_number || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    mobile_number: Number(e.target.value),
                  })
                }
              />
            </label>
            <p className="text-red-500 text-sm">
              {errors.mobile_number || "\u00A0"}
            </p>
          </div>
          <button
            className="btn btn-primary flex justify-center grow"
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : <>Send Otp</>}
          </button>

          <div className="text-center mt-4">
            <Link to="/login" className="text-sm text-blue-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export { ForgotPassword };
