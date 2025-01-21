import { useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";

const token = localStorage.getItem("authToken");

interface CustomerActivityData {
  month: string;
  loginCount: number;
}

const useGetCustomerActivityData = () => {
  const [customerActivityData, setCustomerActivityData] =
    useState<CustomerActivityData | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCustomerActivityData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/report/customer-activity`, {
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
      toast.error("Network error: Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return { customerActivityData, loading, fetchCustomerActivityData}
};

export default useGetCustomerActivityData;
