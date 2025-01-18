import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";
const token = localStorage.getItem("authToken");

interface KasarData {
  month: string;
  total_kasar_amount: number;
  total_order_amount: number;
}

const useGetKasarData = () => {
  const [kasarData, setKasarData] = useState<KasarData | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchKasarData = async (start_date?: string, end_date?: string) => {
    const queryParams = new URLSearchParams();

    if (start_date) queryParams.append("startDate", start_date);
    if (end_date) queryParams.append("endDate", end_date);

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/report/kasar-report?${queryParams}`, {
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

      setKasarData(data);

    } catch {
      toast.error("Network error: Failed to fetch kasar data.");
    } finally {
        setLoading(false);
    }
  };

  return { kasarData, loading, fetchKasarData };
};

export default useGetKasarData;
