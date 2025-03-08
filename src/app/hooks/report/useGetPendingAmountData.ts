import { useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";

interface PendingAmount {
  count: number;
  month: string;
  pendingAmount: number;
}

const useGetPendingAmountData = () => {
  const [pendingAmountData, setPendingAmountData] =
    useState<PendingAmount | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPendingAmountData = async (
    start_date?: string,
    end_date?: string
  ) => {
    const token = localStorage.getItem("authToken");
    const queryParams = new URLSearchParams();

    if (start_date) queryParams.append("startDate", start_date);
    if (end_date) queryParams.append("endDate", end_date);

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/report/pending-amount-report?${queryParams}`, {
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

      setPendingAmountData(data);
    } catch {
      toast.error("Network error: Failed to fetch.");
    } finally {
        setLoading(false);
    }
  };

  return { pendingAmountData, loading, fetchPendingAmountData};
};

export default useGetPendingAmountData;
