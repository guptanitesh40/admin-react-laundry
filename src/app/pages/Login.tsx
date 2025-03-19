import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../style.css";
import { login as loginAction } from "../utils/authSlice";
import toast from "react-hot-toast";
import useLogin from "../hooks/login/useLogin";
import * as Yup from "yup";

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

  userId: Yup.number().required("Please select the user role"),
});

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    userId: undefined as number | undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "userId" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      if (formData.username.length > 50) {
        toast.error("Username must be 50 characters or fewer.", {
          position: "top-center",
        });
        return;
      }

      if (formData.password.length > 50) {
        toast.error("Password must be 50 characters or fewer.", {
          position: "top-center",
        });
        return;
      }

      const success = await login(
        formData.username,
        formData.password,
        formData.userId,
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

          setFormData({
            username: "",
            password: "",
            userId: undefined,
          });
          navigate("/dashboard");
        } else {
          toast.error("Login failed: Unable to retrieve authentication token.");
          dispatch(
            loginAction({
              isAuthenticated: false,
              token: null,
              permissions: [],
            })
          );
        }
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
    <div className="flex justify-center items-center min-h-screen p-6 smmobile:p-5 w-full">
      <div className="card w-full max-w-[400px] smobile:max-w-[350px] vsmobile:max-w-[320px]">
        <form
          onSubmit={handleSubmit}
          className="card-body flex flex-col gap-3 p-10 smobile:p-6 vsmobile:p-4"
          id="log_in_form"
        >
          <div className="flex justify-center">
            <img
              className="default-logo h-10 smobile:h-8 vsmobile:h-7"
              src="/media/app/Group 34972.png"
              alt="Logo"
            />
          </div>

          <div className="text-center mt-2">
            <h3 className="text-lg smobile:text-base vsmobile:text-sm font-semibold text-gray-900 leading-none mb-2.5">
              Log in to your account
            </h3>
          </div>  

          <div className="flex flex-col gap-1">
            <label
              htmlFor="userId"
              className="form-label text-gray-900 text-sm vsmobile:text-xs mb-1"
            >
              Login As
            </label>
            <select
              className="select select-lg w-full text-sm vsmobile:text-xs p-2 border rounded-md"
              name="userId"
              value={formData.userId || ""}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select User
              </option>
              <option value={1}>Super Admin</option>
              <option value={2}>Sub Admin</option>
              <option value={3}>Branch Manager</option>
              <option value={6}>Workshop Manager</option>
            </select>
            <p className="text-red-500 text-xs vsmobile:text-[10px]">
              {errors.userId || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label
              className="form-label text-gray-900 text-sm vsmobile:text-xs"
              htmlFor="username"
            >
              Email
            </label>
            <input
              id="username"
              autoComplete="off"
              className="input border border-gray-300 rounded-md p-2 text-sm vsmobile:text-xs"
              placeholder="email@example.com"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <p className="text-red-500 text-xs vsmobile:text-[10px]">
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
              <input
                name="password"
                autoComplete="off"
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="input border border-gray-300 rounded-md p-2 text-sm vsmobile:text-xs w-full"
              />
              <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                    <i className="ki-filled ki-eye-slash text-gray-500"></i>
                  ) : (
                    <i className="ki-filled ki-eye text-gray-500"></i>
                  )}
              </span>
            </div>
            <p className="text-red-500 text-xs vsmobile:text-[10px]">
              {errors.password || "\u00A0"}
            </p>
          </div>

          <button
            type="submit"
            className="btn btn-primary flex justify-center grow text-sm vsmobile:text-xs p-2"
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
