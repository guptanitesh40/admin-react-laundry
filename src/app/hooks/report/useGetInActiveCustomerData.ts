import { useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";
const token = localStorage.getItem("authToken");

interface CustomerData {
  month: string;
  not_active_count: number;
}

const useGetInActiveCustomerData = () => {
  const [customerData, setCustomerData] = useState<CustomerData[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchInActiveCustomerData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/report/inactive-customer-report`,
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
