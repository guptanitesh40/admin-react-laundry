import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../style.css";
import { login } from "../utils/authSlice";
import useLogin from "../hooks/useLogin";
import toast from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [roleId] = useState<number>(1);

  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const { Login, loading } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username.length > 50) {
      toast.error("Username must be 50 characters or fewer.", { position: "top-center" });
      return;
    }

    if (password.length > 50) {
      toast.error("Password must be 50 characters or fewer.", { position: "top-center" });
      return;
    }
    
    const success = await Login(username, password, roleId);
  
    if (success) {
      dispatch(login({ isAuthenticated: true, token: localStorage.getItem('authToken') }));
      navigate("/dashboard");
    } else {
      dispatch(login({ isAuthenticated: false, token: null }));
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
              id="log_in_form"
            >
              <div className="text-center mb-2.5">
                <h3 className="text-lg font-semibold text-gray-900 leading-none mb-2.5">
                  Log in
                </h3>
              </div>

              <div className="flex flex-col gap-1">
                <label className="form-label text-gray-900">Email</label>
                <input
                  className="input border border-gray-300 rounded-md p-2"
                  placeholder="email@example.com"
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
              
              <button
                type="submit"
                className="btn btn-primary flex justify-center grow"
                disabled={loading}
              >
                {loading ? "Logging In..." : "Log In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
``
