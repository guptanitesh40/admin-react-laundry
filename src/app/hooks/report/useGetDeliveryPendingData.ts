import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";
const token = localStorage.getItem("authToken");

interface DeliveryPendingData {
    count: number,
    month: string,
}

const useGetDeliveryPendingData = () => {
  const [deliveryPendingData, setDeliveryPendingData] =
    useState<DeliveryPendingData | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDeliveryPendingData = async (
    start_date?: string,
    end_date?: string
  ) => {
    const queryParams = new URLSearchParams();

    if (start_date) queryParams.append("startDate", start_date);
    if (end_date) queryParams.append("endDate", end_date);

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/report/delivery-pending-report?${queryParams}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        setLoading(false);
        return;
      }

      setDeliveryPendingData(data);
    } catch {
      toast.error("Network error: Failed to fetch.");
    } finally {
      setLoading(false);
    }
  };

  return { deliveryPendingData, loading, fetchDeliveryPendingData};
};

export default useGetDeliveryPendingData;
