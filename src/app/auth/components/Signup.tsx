import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Signup = () => {

  useEffect(() => {
    const defaultThemeMode = "light";
    let themeMode;

    if (document.documentElement) {
      if (localStorage.getItem("theme")) {
        themeMode = localStorage.getItem("theme");
      } else if (document.documentElement.hasAttribute("data-theme-mode")) {
        themeMode = document.documentElement.getAttribute("data-theme-mode");
      } else {
        themeMode = defaultThemeMode;
      }

      if (themeMode === "system") {
        themeMode = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }

      document.documentElement.classList.add(themeMode);
    }
  }, []);

  return (
    <div className="flex h-full dark:bg-coal-500">
      <div className="grid lg:grid-cols-2 grow ">
        <div className="flex justify-center items-center p-8 lg:p-10 order-2 lg:order-1 mx-[200px]">
          <div className="card max-w-[370px] w-full p-6">
            <form
              action="#"
              className="card-body flex flex-col gap-5"
              id="sign_up_form"
              method="post"
            >
              <div className="text-center mb-2.5">
                <h3 className="text-lg font-semibold text-gray-900 leading-none mb-2.5">
                  Sign up
                </h3>
                <div className="flex items-center justify-center font-medium">
                  <span className="text-2sm text-gray-600 me-1.5">
                    Already have an Account?
                  </span>
                  <Link to="/signin" className="text-2sm link">
                    Sign In
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="border-t border-gray-200 w-full"></span>
                <span className="text-2xs text-gray-500 font-medium uppercase">
                  or
                </span>
                <span className="border-t border-gray-200 w-full"></span>
              </div>
              <div className="flex flex-col gap-1">
                <label className="form-label text-gray-900">Email</label>
                <input
                  className="input border border-gray-300 rounded-md p-2"
                  name="user_email"
                  placeholder="email@email.com"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="form-label text-gray-900">Password</label>
                <label
                  className="input border border-gray-300 rounded-md p-2"
                  data-toggle-password="true"
                >
                  <input
                    name="user_password"
                    placeholder="Enter Password"
                    type="password"
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
                  Confirm Password
                </label>
                <label
                  className="input border border-gray-300 rounded-md p-2"
                  data-toggle-password="true"
                >
                  <input
                    name="user_password"
                    placeholder="Re-enter Password"
                    type="password"
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
              <label className="checkbox-group">
                <input
                  className="checkbox checkbox-sm"
                  name="check"
                  type="checkbox"
                  value="1"
                />
                <span className="checkbox-label ml-2 cursor-pointer">
                  I accept
                  <a
                    className="text-2sm font-semibold link text-sky-600 ml-2"
                    href="#"
                  >
                    Terms & Conditions
                  </a>
                </span>
              </label>
              <button className="btn btn-primary flex justify-center grow">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
      <script src="assets/js/core.bundle.js"></script>
      <script src="assets/vendors/apexcharts/apexcharts.min.js"></script>
    </div>
  );
};

export default Signup;
