import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSignin from "../hooks/useSignin";
import "../../style.css";
import { login } from "../utils/authSlice";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roleId] = useState(1);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const { Signin, loading, error } = useSignin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await Signin(username, password, roleId);
    if (success) {
      dispatch(login(true));
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex h-full dark:bg-coal-500">
      <div className="grid lg:grid-cols-2 grow">
        <div className="flex justify-center items-center p-8 lg:p-10 order-2 lg:order-1">
          <div className="card max-w-[370px] w-full">
            <form
              onSubmit={handleSubmit}
              className="card-body flex flex-col gap-5 p-10"
              id="sign_in_form"
            >
              <div className="text-center mb-2.5">
                <h3 className="text-lg font-semibold text-gray-900 leading-none mb-2.5">
                  Sign in
                </h3>
                <div className="flex items-center justify-center font-medium">
                  <span className="text-2sm text-gray-600 me-1.5">
                    Need an account?
                  </span>
                  <Link to="/signup" className="text-2sm link">
                    Sign up
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="border-t border-gray-200 w-full"></span>
                <span className="text-2xs text-gray-500 font-medium uppercase">
                  Or
                </span>
                <span className="border-t border-gray-200 w-full"></span>
              </div>
              <div className="flex flex-col gap-1">
                <label className="form-label text-gray-900">Email</label>
                <input
                  className="input border border-gray-300 rounded-md p-2"
                  placeholder="email@email.com"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-1">
                  <label className="form-label text-gray-900">Password</label>
                  <Link
                    className="text-2sm link shrink-0"
                    to="/reset-password/enter-email"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    className="input border border-gray-300 rounded-md p-2"
                    name="user_password"
                    placeholder="Enter Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    className="btn btn-icon absolute right-2 top-1/2 transform -translate-y-1/2"
                    type="button"
                    onClick={() => {
                    }}
                  >
                    <i className="ki-filled ki-eye text-gray-500 toggle-password-active:hidden"></i>
                    <i className="ki-filled ki-eye-slash text-gray-500 hidden toggle-password-active:block"></i>
                  </button>
                </div>
              </div>
              <label className="checkbox-group">
                <input
                  className="checkbox checkbox-sm"
                  name="check"
                  type="checkbox"
                  value="1"
                />
                <span className="checkbox-label">Remember me</span>
              </label>
              <button
                type="submit"
                className="btn btn-primary flex justify-center grow"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
