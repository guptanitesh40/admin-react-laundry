import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface OrderData {
  day: string;
  count: number;
}

const useGetOrdersData = () => {
  const [orderData, setOrderData] = useState<OrderData | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchOrdersData = async () => {
    const token = localStorage.getItem("authToken");
    const GET_ORDERDATA_URL = `${import.meta.env.VITE_BASE_URL}/report/total-orders`;

    setLoading(true);
    try {
      const response = await fetch(GET_ORDERDATA_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
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
      toast.error("Network error: Failed to fetch.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdersData()
  },[]);

  return { orderData, loading, fetchOrdersData };
};

export default useGetOrdersData;
