import { useState } from "react";
import toast from "react-hot-toast";

const SEND_OTP_URL = `${import.meta.env.VITE_BASE_URL}/auth/forgot-password`;

const useSendOtp = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const sendOtp = async (formData: any) => {
    setLoading(true);

    const mobile_number = formData.mobile_number;
    const role_id = formData.role_id;

    try {
      const response = await fetch(SEND_OTP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile_number, role_id }),
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
      toast.error("Error sending otp try again later", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };
  return { sendOtp, loading };
};

export default useSendOtp;
