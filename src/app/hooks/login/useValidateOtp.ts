import { useState } from "react";
import toast from "react-hot-toast";

const SEND_OTP_URL = `${import.meta.env.VITE_BASE_URL}/user/validate`;

const useValidateOtp = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const validateOtp = async (mobile_number: number, otp: number) => {
    setLoading(true);

    try {
      const response = await fetch(SEND_OTP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile_number, otp }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const message = errorData.message;
        toast.error(message, { position: "top-center" });
        return false;
      }

      return true;
    } catch {
      toast.error("Failed to validate otp!");
    } finally {
      setLoading(false);
    }
  };
  return { validateOtp, loading };
};

export default useValidateOtp;
