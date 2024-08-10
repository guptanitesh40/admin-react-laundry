import React from 'react';
import './style.css'; // Include your CSS file if needed

const ChangePassword = () => {
  return (
    <>
      <div className="grid lg:grid-cols-2 grow">
        <div className="flex justify-center items-center p-8 lg:p-10 order-2 lg:order-1">
          <div className="card max-w-[370px] w-full">
            <form
              action="#"
              className="card-body flex flex-col gap-5 p-10"
              id="reset_password_change_password_form"
              method="post"
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">Reset Password</h3>
                <span className="text-2sm font-medium text-gray-600">Enter your new password</span>
              </div>
              <div className="flex flex-col gap-1">
                <label className="form-label text-gray-900">New Password</label>
                <label className="input" data-toggle-password="true">
                  <input
                    name="user_new_password"
                    placeholder="Enter a new password"
                    type="password"
                    value=""
                  />
                  <div className="btn btn-icon" data-toggle-password-trigger="true">
                    <i className="ki-filled ki-eye text-gray-500 toggle-password-active:hidden"></i>
                    <i className="ki-filled ki-eye-slash text-gray-500 hidden toggle-password-active:block"></i>
                  </div>
                </label>
              </div>
              <div className="flex flex-col gap-1">
                <label className="form-label text-gray-900">Confirm New Password</label>
                <label className="input" data-toggle-password="true">
                  <input
                    name="user_confirm_password"
                    placeholder="Re-enter a new Password"
                    type="password"
                    value=""
                  />
                  <div className="btn btn-icon" data-toggle-password-trigger="true">
                    <i className="ki-filled ki-eye text-gray-500 toggle-password-active:hidden"></i>
                    <i className="ki-filled ki-eye-slash text-gray-500 hidden toggle-password-active:block"></i>
                  </div>
                </label>
              </div>
              <button className="btn btn-primary flex justify-center grow">Submit</button>
            </form>
          </div>
        </div>
        <div className="lg:rounded-xl lg:border lg:border-gray-200 lg:m-5 order-1 lg:order-2 bg-top xxl:bg-center xl:bg-cover bg-no-repeat branded-bg">
          <div className="flex flex-col p-8 lg:p-16 gap-4">
            <a href="html/demo1.html">
              <img className="h-[28px] max-w-none" src="assets/media/app/mini-logo.svg" alt="Logo" />
            </a>
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-semibold text-gray-900">Secure Access Portal</h3>
              <div className="text-base font-medium text-gray-600">
                A robust authentication gateway ensuring
                <br />
                secure
                <span className="text-gray-900 font-semibold">efficient user access</span>
                to the Metronic
                <br />
                Dashboard interface.
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="assets/js/core.bundle.js"></script>
      <script src="assets/vendors/apexcharts/apexcharts.min.js"></script>
    </>
  );
};

export default ChangePassword;
