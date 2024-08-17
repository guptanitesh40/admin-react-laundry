import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { LOGIN_URL } from "../utils/constant";

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const Login = useCallback(
    async (username: string, password: string, roleId: number, device_type: string, device_token: string): Promise<boolean> => {
      setLoading(true);

      try {
        const response = await fetch(LOGIN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, role_id: roleId, device_type, device_token }),
        });

        const result = await response.json();
        const { statusCode, message } = result;

        if (!response.ok) {
          const errorMessage = message;
          toast.error(errorMessage, { position: "top-center" });
          return false;
        }

        const token = result.data?.user?.token;

        if (statusCode === 200) {
          toast.success(message, { position: "top-center" });
          localStorage.setItem("authToken", token);
          return true;
        }
        toast.error(message, { position: "top-center" });
        return false;
      } catch (error) {
        toast.error("An error occurred during login. Please try again.", {
          position: "top-center",
        });
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, Login };
};

export default useLogin;
