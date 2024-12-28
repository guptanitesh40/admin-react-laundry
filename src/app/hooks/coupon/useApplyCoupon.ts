import { useState } from "react";
import toast from "react-hot-toast";

const APPLY_COUPON_URL = `${import.meta.env.VITE_BASE_URL}/admin/coupon/apply`;

const useApplyCoupon = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const applyCoupon = async (user_id: number, order_Total: number, coupon_code: string) => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(APPLY_COUPON_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id, order_Total, coupon_code }),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        return false;
      }
      return data.data;

    } catch {
      toast.error("Unable to apply coupon code!");
    } finally {
      setLoading(false);
    }
  };

  return { applyCoupon, loading };
};

export default useApplyCoupon;