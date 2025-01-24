import { useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";
const token = localStorage.getItem("authToken");

interface CustomerRatingData {
  rating: number;
  month: any;
  count: number;
}

const useGetCustomerRatingData = () => {
  const [customerRatingData, setCustomerRatingData] =
    useState<CustomerRatingData | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCustomerRatingData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/report/customers-feedback`, {
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

      setCustomerRatingData(data);
    } catch {
      toast.error("Network error: Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return { customerRatingData, loading, fetchCustomerRatingData };
};

export default useGetCustomerRatingData;
