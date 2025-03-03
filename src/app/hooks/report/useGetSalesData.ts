import { useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";

interface SalesData {
  month: string;
  total_sales: number;
  total_collection: number;
  unpaid_amount: number;
}

const useGetSalesData = () => {
  const [salesData, setSalesData] = useState<SalesData | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSalesData = async (start_date?: string, end_date?: string) => {
    const token = localStorage.getItem("authToken");
    const queryParams = new URLSearchParams();

    if (start_date) queryParams.append("startDate", start_date);
    if (end_date) queryParams.append("endDate", end_date);

    setLoading(false);
    try {
      const response = await fetch(
        `${BASE_URL}/report/sales-booking?${queryParams}`,
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

      setSalesData(data);
    } catch {
      toast.error("Network error: Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return { salesData, loading, fetchSalesData };
};

export default useGetSalesData;
