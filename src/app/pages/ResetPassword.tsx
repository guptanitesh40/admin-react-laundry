import { useState } from "react";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }


  return (
    <div className="grid lg:grid-cols-2 grow">
      <div className="flex justify-center items-center p-8 lg:p-10 order-2 lg:order-1">
        <div className="card max-w-[370px] w-full">
          <form className="card-body flex flex-col gap-5 p-10" onSubmit={handleSubmit}>
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
                <div
                  className="btn btn-icon"
                  data-toggle-password-trigger="true"
                >
                  <i className="ki-filled ki-eye text-gray-500 toggle-password-active:hidden"></i>
                  <i className="ki-filled ki-eye-slash text-gray-500 hidden toggle-password-active:block"></i>
                </div>
              </label>
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
