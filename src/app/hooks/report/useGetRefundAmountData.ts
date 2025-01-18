import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";
const token = localStorage.getItem("authToken");

interface RefundAmount {
  month: string;
  total_refund_amount: number;
  total_amount: number;
}

const useGetRefundAmountData = () => {
  const [refundAmountData, setRefundAmountData] =
    useState<RefundAmount | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRefundAmountData = async (start_date?: string, end_date?: string) => {
    const queryParams = new URLSearchParams();

    if (start_date) queryParams.append("startDate", start_date);
    if (end_date) queryParams.append("endDate", end_date);

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/report/refund-report`, {
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

      setRefundAmountData(data);
    } catch {
      toast.error("Network error: Failed to fetch.");
    } finally {
      setLoading(false);
    }
  };

  return { refundAmountData, loading, fetchRefundAmountData };
};

export default useGetRefundAmountData;
