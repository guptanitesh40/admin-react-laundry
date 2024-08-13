import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { LOGIN_URL } from "../utils/constant";

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const Login = useCallback(async (username, password, roleId) => {
    setLoading(true);

    try {
      const response = await fetch(LOGIN_URL , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role_id: roleId }),
      });

      if (!response.ok) {
        let errorMessage = "Login failed. Please check your credentials.";
        switch (response.status) {
          case 400:
            errorMessage = "Bad Request. Please check the input fields.";
            break;
          case 401:
            errorMessage = "Unauthorized. Incorrect username or password.";
            break;
          case 404:
            errorMessage = "Endpoint not found.";
            break;
          default:
            errorMessage = "Login failed. Please try again later.";
            break;
        }
        toast.error(errorMessage, { position: "top-center" });
        return false;
      }

      const data = await response.json();
      const token = data.data?.token;

      if (!token) {
        toast.error("Invalid credentials. Please try again.", { position: "top-center" });
        return false;
      }

      localStorage.setItem("authToken", token);
      toast.success("Login successful!", { position: "top-center" });
      return true;
    } catch (error) {
      toast.error("An error occurred during login. Please try again.", { position: "top-center" });
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, Login };
};

export default useLogin;
