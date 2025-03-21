import { useState } from "react";
import { useResetPassword } from "../hooks";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { resetPassword, loading } = useResetPassword();
  const location = useLocation();
  const mobile_number = location.state.mobileNumber;
  const otp = location.state.otpValue;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await validationSchema.validate(
        { newPassword, confirmPassword },
        { abortEarly: false }
      );

      const success = await resetPassword(mobile_number, otp, newPassword);
      if (success) {
        navigate("/login");
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
          className="card-body flex flex-col gap-3 p-6 sm:p-10"
          onSubmit={handleSubmit}
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Reset Password
            </h3>
            <span className="text-sm font-medium text-gray-600">
              Enter your new password
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <label className="form-label text-gray-900">New Password</label>
            <div className="relative">
              <input
                name="new_password"
                placeholder="Enter a new password"
                type={showPassword ? "text" : "password"}
                value={newPassword || ""}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input pr-10 w-full"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <i className="ki-filled ki-eye-slash text-gray-500"></i>
                ) : (
                  <i className="ki-filled ki-eye text-gray-500"></i>
                )}
              </span>
            </div>
            <p className="text-red-500 text-sm">
              {errors.newPassword || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="form-label text-gray-900">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                name="confirm_password"
                placeholder="Re-enter new password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword || ""}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input pr-10 w-full"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <i className="ki-filled ki-eye-slash text-gray-500"></i>
                ) : (
                  <i className="ki-filled ki-eye text-gray-500"></i>
                )}
              </span>
            </div>
            <p className="text-red-500 text-sm">
              {errors.confirmPassword || "\u00A0"}
            </p>
          </div>

          <button
            className="btn btn-primary flex justify-center w-full"
            type="button"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? <>Resetting password..</> : <>Reset password</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
