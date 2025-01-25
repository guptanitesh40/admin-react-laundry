import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";
const token = localStorage.getItem("authToken");

interface PaymentTypeData {
  payment_type: string;
  count: number;
}

const useGetPaymentTypeData = () => {
  const [paymentTypeData, setPaymentTypeData] = useState<PaymentTypeData | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPaymentTypeData = async () => {

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/report/payment-type-report`, {
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
