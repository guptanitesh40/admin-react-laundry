import { useState } from "react";
import toast from "react-hot-toast";

const SEND_OTP_URL = `${import.meta.env.VITE_BASE_URL}/auth/forgot-password`;

const useSendOtp = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const sendOtp = async (mobile_number: any) => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(SEND_OTP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ mobile_number }),
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
      toast.error("Error sending otp try again later", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };
  return { sendOtp, loading };
};

export default useSendOtp;
