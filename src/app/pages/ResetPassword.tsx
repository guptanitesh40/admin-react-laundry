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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { resetPassword } = useResetPassword();
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
    <div className="grid lg:grid-cols-2 grow">
      <div className="flex justify-center items-center p-8 lg:p-10 order-2 lg:order-1">
        <div className="card max-w-[370px] w-full">
          <form
            className="card-body flex flex-col gap-1 p-10"
            onSubmit={handleSubmit}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Reset Password
              </h3>
              <span className="text-2sm font-medium text-gray-600">
                Enter your new password
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="form-label text-gray-900">New Password</label>
              <label className="input" data-toggle-password="true">
                <input
                  name="new_password"
                  placeholder="Enter a new password"
                  type="password"
                  value={newPassword || ""}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <div className="btn btn-icon" data-toggle-password-trigger="true">
                  <i className="ki-filled ki-eye text-gray-500 toggle-password-active:hidden"></i>
                  <i className="ki-filled ki-eye-slash text-gray-500 hidden toggle-password-active:block"></i>
                </div>
              </label>
              <p className="text-red-500 text-sm">
                {errors.newPassword || "\u00A0"}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label className="form-label text-gray-900">
                Confirm New Password
              </label>
              <label className="input" data-toggle-password="true">
                <input
                  name="confirm_password"
                  placeholder="Re-enter a new Password"
                  type="password"
                  value={confirmPassword || ""}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div
                  className="btn btn-icon"
                  data-toggle-password-trigger="true"
                >
                  <i className="ki-filled ki-eye text-gray-500 toggle-password-active:hidden"></i>
                  <i className="ki-filled ki-eye-slash text-gray-500 hidden toggle-password-active:block"></i>
                </div>
              </label>
              <p className="right-[0.2rem] text-red-500 text-sm w-80">
                {errors.confirmPassword || "\u00A0"}
              </p>
            </div>
            <button className="btn btn-primary flex justify-center grow">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
