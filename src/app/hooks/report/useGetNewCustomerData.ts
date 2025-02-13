import { useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";
const token = localStorage.getItem("authToken");

interface CustomerData {
  month: string;
  customer_count: number;
}

const useGetNewCustomerData = () => {
  const [customerData, setCustomerData] = useState<CustomerData[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNewCustomerData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/report/new-customer-acquisition-report`,
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
      toast.error("Network error: Failed to fetch customer data.");
    } finally {
      setLoading(false);
    }
  };

  return { customerData, loading, fetchNewCustomerData };
};

export default useGetNewCustomerData;
