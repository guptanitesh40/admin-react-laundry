import { useState } from "react";
import toast from "react-hot-toast";

const RESET_PASSWORD_URL = `${import.meta.env.VITE_BASE_URL}/auth/reset-password`;

const useResetPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const resetPassword = async (mobile_number: number, otp: number, new_password: string) => {
    setLoading(true);

    try {
      const response = await fetch(RESET_PASSWORD_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({mobile_number, otp, new_password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const message = errorData.message;
        toast.error(message, { position: "top-center" });
        return false;
      }

      const data = await response.json();
      toast.success(data.message, { position: "top-center" });
      return true;
    } catch {
      toast.error("Error resetting password try again later", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };
  return { resetPassword, loading };
};

export default useResetPassword;
