import { useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";


interface CustomerActivityData {
  month: string;
  login_count: number;
}

const useGetCustomerActivityData = () => {
  const [customerActivityData, setCustomerActivityData] =
    useState<CustomerActivityData | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCustomerActivityData = async (start_date?: string, end_date?: string) => {
    const token = localStorage.getItem("authToken");
    const queryParams = new URLSearchParams();

    if (start_date) queryParams.append("startDate", start_date);
    if (end_date) queryParams.append("endDate", end_date);

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/report/customer-activity?${queryParams}`, {
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

      setCustomerActivityData(data);
    } catch {
      toast.error("Network error: Failed to fetch customer activity data.");
    } finally {
      setLoading(false);
    }
  };

  return { customerActivityData, loading, fetchCustomerActivityData}
};

export default useGetCustomerActivityData;
