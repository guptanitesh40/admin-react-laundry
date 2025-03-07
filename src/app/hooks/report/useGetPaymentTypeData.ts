import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

interface PaymentTypeData {
  payment_type: string;
  count: number;
}

const useGetPaymentTypeData = () => {
  const [paymentTypeData, setPaymentTypeData] = useState<PaymentTypeData | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPaymentTypeData = async (start_date?: string, end_date?: string) => {
    const token = localStorage.getItem("authToken");
    const queryParams = new URLSearchParams();

    if (start_date) queryParams.append("startDate", start_date);
    if (end_date) queryParams.append("endDate", end_date);

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/report/payment-type-report?${queryParams}`, {
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

      setPaymentTypeData(data);
    } catch {
      toast.error("Network error: Failed to fetch payment type data.");
    } finally {
      setLoading(false);
    }
  };

  return { paymentTypeData, loading, fetchPaymentTypeData };
};

export default useGetPaymentTypeData;
