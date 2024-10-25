import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../style.css";
import { login as loginAction } from "../utils/authSlice";
import toast from "react-hot-toast";
import useLogin from "../hooks/login/useLogin";

const device_type = "sasas";
const device_token = "sdlknoin";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  const { login, loading } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username.length > 50) {
      toast.error("Username must be 50 characters or fewer.", {
        position: "top-center",
      });
      return;
    }

    if (password.length > 50) {
      toast.error("Password must be 50 characters or fewer.", {
        position: "top-center",
      });
      return;
    }

    const success = await login(
      username,
      password,
      1,
      device_type,
      device_token
    );

    if (success) {
      dispatch(
        loginAction({
          isAuthenticated: true,
          token: localStorage.getItem("authToken"),
        })
      );
      navigate("/dashboard");
    } else {
      dispatch(loginAction({ isAuthenticated: false, token: null }));
    }
  };

  return (
    <div className="flex h-full dark:bg-coal-500 ">
      <div className="grid lg:grid-cols-2 grow">
        <div className="flex justify-center items-center p-8 lg:p-10 order-2 lg:order-1">
          <div className="card max-w-[450px] w-full">
            <form
              onSubmit={handleSubmit}
              className="card-body flex flex-col gap-5 p-10 w-[370px]"
              id="log_in_form"
            >
              <div className="text-center mb-2.5">
                <h3 className="text-lg font-semibold text-gray-900 leading-none mb-2.5">
                  Log in
                </h3>
              </div>

              <div className="flex flex-col gap-1">
                <label className="form-label text-gray-900" htmlFor="username">
                  Email or Mobile no
                </label>
                <input
                  id="username"
                  className="input border border-gray-300 rounded-md p-2"
                  placeholder="Enter your email or mobile number"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}                  
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-1">
                  <label className="form-label text-gray-900" htmlFor="password">Password</label>
                  <Link
                    className="text-2sm link shrink-0"
                    to="/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    className="input border border-gray-300 rounded-md p-2"
                    name="user_password"
                    placeholder="Enter Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
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
