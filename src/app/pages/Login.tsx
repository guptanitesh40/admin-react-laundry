import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../style.css";
import { login as loginAction } from "../utils/authSlice";
import toast from "react-hot-toast";
import useLogin from "../hooks/login/useLogin";
import * as Yup from "yup";
import { useGetUserPermissions } from "../hooks";

const device_type = "sasas";
const device_token = "sdlknoin";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Email is required")
    .email("Enter a valid email")
    .test("required", "Email is required", (value) => !!value),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("password is required"),

  userId: Yup.number().required("Please select the user"),
});

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>();

  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  const { login, loading } = useLogin();
  const { fetchUserPermissions } = useGetUserPermissions();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await validationSchema.validate(
        { username, password, userId },
        { abortEarly: false }
      );

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
        userId,
        device_type,
        device_token
      );

      if (success) {
        const token = localStorage.getItem("authToken");

        if (token) {
          dispatch(
            loginAction({
              isAuthenticated: true,
              token,
              permissions: [],
            })
          );
          navigate("/dashboard");
        } else {
          toast.error("Login failed: Unable to retrieve authentication token.");
        }
      } else {
        dispatch(
          loginAction({ isAuthenticated: false, token: null, permissions: [] })
        );
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
    <div className="flex justify-center items-center p-8 lg:p-10 order-2 lg:order-1 w-full">
      <div className="card max-w-[450px]">
        <form
          onSubmit={handleSubmit}
          className="card-body flex flex-col gap-3 p-10 w-[370px]"
          id="log_in_form"
        >
          <div className="flex justify-center">
            <img
              className="default-logo min-h-[22px] max-w-none"
              src="/media/app/Group 34972.png"
            />
          </div>
          <div className="text-center mt-3">
            <h3 className="text-lg font-semibold text-gray-900 leading-none mb-2.5">
              Log in to your account
            </h3>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="payment_status"
              className="form-label text-gray-900 mb-1"
            >
              Login As
            </label>
            <select
              className="select select-lg w-full text-sm"
              value={userId}
              onChange={(e) => {
                setUserId(Number(e.target.value));
              }}
            >
              <option value="" selected>
                Select User
              </option>
              <option value={1}>Super Admin</option>
              <option value={2}>Sub Admin</option>
              <option value={3}>Branch Manager</option>
              <option value={6}>Workshop Manager</option>
            </select>
            <p className="right-[0.2rem] text-red-500 text-sm w-80">
              {errors.userId || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="form-label text-gray-900" htmlFor="username">
              Email
            </label>
            <input
              id="username"
              className="input border border-gray-300 rounded-md p-2"
              placeholder="email@example.com"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="right-[0.2rem] text-red-500 text-sm w-80">
              {errors.username || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-1">
              <label className="form-label text-gray-900" htmlFor="password">
                Password
              </label>
              <Link className="text-2sm link shrink-0" to="/forgot-password">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <label className="input" data-toggle-password="true">
                <input
                  name="password"
                  placeholder="Enter Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="btn btn-icon cursor-pointer ml-2"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <i className="ki-filled ki-eye-slash text-gray-500"></i>
                  ) : (
                    <i className="ki-filled ki-eye text-gray-500"></i>
                  )}
                </span>
              </label>
            </div>
            <p className="right-[0.2rem] text-red-500 text-sm w-80">
              {errors.password || "\u00A0"}
            </p>
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
  );
};

export default Login;
