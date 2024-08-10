import React from 'react';
import './style.css'; // Include your CSS file if needed
import { Link } from 'react-router-dom';


const CheckEmail = () => {
  return (
    <>
      <div className="grid lg:grid-cols-2 grow">
        <div className="flex justify-center items-center p-8 lg:p-10 order-2 lg:order-1">
          <div className="card max-w-[440px] w-full">
            <div className="card-body p-10">
              <div className="flex justify-center py-10">
                {/* <img
                  alt="image"
                  className="dark:hidden max-h-[130px]"
                  src={}
                />
                <img
                  alt="image"
                  className="light:hidden max-h-[130px]"
                  src={}
                /> */}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-3">
                Check your email
              </h3>
              <div className="text-2sm font-medium text-center text-gray-600 mb-7.5">
                Please click the link sent to your email
                <a
                  className="text-2sm text-gray-800 font-medium hover:text-primary-active"
                  href="#"
                >
                  bob@reui.io
                </a>
                <br />
                to reset your password. Thank you
              </div>
              <div className="flex justify-center mb-5">
                <Link
                  className="btn btn-primary flex justify-center"
                  to="/reset-password/change-password"
                >
                  Skip for now
                </Link>
              </div>
              <div className="flex items-center justify-center gap-1">
                <span className="text-xs font-medium text-gray-600">
                  Didn’t receive an email?
                </span>
                <a
                  className="text-xs font-medium link"
                  href="html/demo1/authentication/branded/reset-password/enter-email.html"
                >
                  Resend
                </a>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      {/* Scripts included here */}
      <script src="assets/js/core.bundle.js"></script>
      <script src="assets/vendors/apexcharts/apexcharts.min.js"></script>
    </>
  );
};

export default CheckEmail;
