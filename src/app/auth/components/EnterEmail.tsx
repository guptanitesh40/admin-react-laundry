import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css"; // Include your CSS file if needed

const EnterEmail = () => {

  return (
    <div className="grid lg:grid-cols-2 grow">
      <div className="flex justify-center items-center p-8 lg:p-10 order-2 lg:order-1">
        <div className="card max-w-[370px] w-full">
          <form
            action="#"
            className="card-body flex flex-col gap-5 p-10"
            id="reset_password_enter_email_form"
            method="post"
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Your Email
              </h3>
              <span className="text-2sm text-gray-600 font-medium">
                Enter your email to reset password
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="form-label text-gray-900">Email</label>
              <input
                className="input"
                placeholder="email@email.com"
                type="text"
              />
            </div>
            <Link
              to="/reset-password/check-email"
              className="btn btn-primary flex justify-center grow"
            >
              Continue
              <i className="ki-filled ki-black-right"></i>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnterEmail;
