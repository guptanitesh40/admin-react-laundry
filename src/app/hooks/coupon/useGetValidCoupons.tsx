import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constant";
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
}

const useGetValidCoupons = () => {
  const [validCoupons, setValidCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchValidCoupons = async (user_id?: number) => {
    const token = localStorage.getItem("authToken");

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/admin/valid-coupons?${user_id}`,{
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        setLoading(false);
        return;
      }

      setValidCoupons(data?.data);
    } catch {
      toast.error("Network error: Failed to fetch coupons.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchValidCoupons();
  },[])

  return { validCoupons, fetchValidCoupons, loading}

};

export default useGetValidCoupons;
