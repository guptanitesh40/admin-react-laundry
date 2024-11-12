import { useState } from "react";
import toast from "react-hot-toast";

interface PaymentData {
  paymentType: string;
  count: number;
}

const useGetPaymentData = () => {
  const [paymentData, setPaymentData] = useState<PaymentData | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPaymentData = async () => {
    const token = localStorage.getItem("authToken");
    const GET_PAYMENTDATA_URL = `${import.meta.env.VITE_BASE_URL}/report/payment-type-report`;

    setLoading(true);
    try {
      const response = await fetch(GET_PAYMENTDATA_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        setLoading(false);
        return;
      }

      setPaymentData(data);
    } catch {
      toast.error("Network error: Failed to fetch.");
    } finally {
      setLoading(false);
    }
  };

  return { paymentData, loading, fetchPaymentData }
};

export default useGetPaymentData;
