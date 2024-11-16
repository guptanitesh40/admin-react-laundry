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
});

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

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

    try {

      await validationSchema.validate({ username, password }, { abortEarly: false });

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
    <div className="flex h-full dark:bg-coal-500 ">
      <div className="grid lg:grid-cols-2 grow">
        <div className="flex justify-center items-center p-8 lg:p-10 order-2 lg:order-1">
          <div className="card max-w-[450px] w-full">
            <form
              onSubmit={handleSubmit}
              className="card-body flex flex-col gap-3 p-10 w-[370px]"
              id="log_in_form"
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 leading-none mb-2.5">
                  Log in
                </h3>
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
                  <label
                    className="form-label text-gray-900"
                    htmlFor="password"
                  >
                    Password
                  </label>
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
                  />
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
      </div>
    </div>
  );
};

export default Login;
