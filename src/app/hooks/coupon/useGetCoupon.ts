import { useState } from "react";
import toast from "react-hot-toast";

interface Coupon {
  coupon_id: number;
  code: string;
  discount_value: number;
  discount_type: number;
  start_time: string;
  end_time: string;
  title: string;
  description: string;
  coupon_type: number;
  maximum_usage_count_per_user: number;
  total_usage_count: number;
  min_cart_value: number | null;
}

const useGetCoupon = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  const fetchCoupon = async (coupon_id: number) => {
    if (!coupon_id) {
      setCoupon(null);
      return;
    }

    const token = localStorage.getItem("authToken");
    const GET_COUPON_URL = `${
      import.meta.env.VITE_BASE_URL
    }/admin/coupon/${coupon_id}`;

    setLoading(true);

    try {
      const response = await fetch(GET_COUPON_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, { position: "top-center" });
        setLoading(false);
        return;
      }

      const data = await response.json();
      setCoupon(data?.data);
    } catch (error) {
      toast.error("Network error: Failed to fetch.");
    } finally {
      setLoading(false);
    }
  };

  return { coupon, loading, fetchCoupon };
};

export default useGetCoupon;
