import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

interface OrderData {
  day: string;
  count: number;
}

const useGetOrdersData = () => {
  const [orderData, setOrderData] = useState<OrderData | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchOrdersData = async (start_date?: string, end_date?: string) => {
    const token = localStorage.getItem("authToken");
    const queryParams = new URLSearchParams();

    if (start_date) queryParams.append("startDate", start_date);
    if (end_date) queryParams.append("endDate", end_date);

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/report/total-orders?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        setLoading(false);
        return;
      }

      setOrderData(data);
    } catch {
      toast.error("Network error: Failed to fetch orders data.");
    } finally {
      setLoading(false);
    }
  };

  return { orderData, loading, fetchOrdersData };
};

export default useGetOrdersData;
