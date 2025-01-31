import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";
const token = localStorage.getItem("authToken");

interface DeliveryData {
  month: string;
  completed: number;
  pending: number;
}

const useGetDeliveryData = () => {
  const [deliveryData, setDeliveryData] = useState<DeliveryData | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDeliveryData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/report/delivery-report`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        setLoading(false);
        return;
      }

      setDeliveryData(data);
    } catch {
      toast.error("Network error: Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return { deliveryData, fetchDeliveryData, loading };
};

export default useGetDeliveryData;
