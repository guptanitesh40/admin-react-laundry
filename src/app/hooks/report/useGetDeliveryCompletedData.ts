import { useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";
const token = localStorage.getItem("authToken");

interface DeliveryCompletedData {
  count: number;
  month: string;
}

const useGetDeliveryCompletedData = () => {
  const [deliveryCompletedData, setDeliveryCompletedData] =
    useState<DeliveryCompletedData | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDeliveryCompletedData = async (
    start_date?: string,
    end_date?: string
  ) => {
    const queryParams = new URLSearchParams();

    if (start_date) queryParams.append("startDate", start_date);
    if (end_date) queryParams.append("endDate", end_date);

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/report/delivery-completed-report?${queryParams}`,
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

      setDeliveryCompletedData(data);
    } catch {
        toast.error("Network error: Failed to fetch.");
    } finally {
      setLoading(false);
    }
  };

  return { deliveryCompletedData, loading, fetchDeliveryCompletedData };
};

export default useGetDeliveryCompletedData;
