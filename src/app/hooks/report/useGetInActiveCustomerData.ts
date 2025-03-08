import { useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";

interface CustomerData {
  month: string;
  not_active_count: number;
}

const useGetInActiveCustomerData = () => {
  const [customerData, setCustomerData] = useState<CustomerData[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchInActiveCustomerData = async (start_date?: string, end_date?: string) => {
    const token = localStorage.getItem("authToken");
    const queryParams = new URLSearchParams();

    if (start_date) queryParams.append("startDate", start_date);
    if (end_date) queryParams.append("endDate", end_date);

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/report/inactive-customer-report?${queryParams}`,
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

      setCustomerData(data);
    } catch {
      toast.error("Failed to fetch in active customer data.");
    } finally {
      setLoading(false);
    }
  };

  return { customerData, loading, fetchInActiveCustomerData };
};

export default useGetInActiveCustomerData;
