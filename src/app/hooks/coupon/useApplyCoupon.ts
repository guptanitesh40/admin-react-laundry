import { useState } from "react";
import toast from "react-hot-toast";

const APPLY_COUPON_URL = `${import.meta.env.VITE_BASE_URL}/coupon/apply`;

const useApplyCoupon = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const applyCoupon = async (user_id: number, sub_total: number, couponCode: string) => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(APPLY_COUPON_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id, sub_total, couponCode }),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        return false;
      }

      toast.success(data.message, { position: "top-center" });
      return data.data.discountAmount;
    } catch {
      toast.error("Unable to apply coupon code!");
    } finally {
      setLoading(false);
    }
  };

  return { applyCoupon, loading };
};

export default useApplyCoupon;