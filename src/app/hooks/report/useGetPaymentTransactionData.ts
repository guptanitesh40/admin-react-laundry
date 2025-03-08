import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

interface PaymentTransactionData {
  month: string;
  total_amount: number;
  total_transaction_amount: number;
}

const useGetPaymentTransactionData = () => {
  const [paymentTransactionData, setPaymentTransactionData] = useState<PaymentTransactionData | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPaymentTransactionData = async (start_date?: string, end_date?: string) => {
    const token = localStorage.getItem("authToken");
    const queryParams = new URLSearchParams();

    if (start_date) queryParams.append("startDate", start_date);
    if (end_date) queryParams.append("endDate", end_date);

    setLoading(false);
    
    try {
      const response = await fetch(`${BASE_URL}/report/payment-transaction?${queryParams}`, {
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

      setPaymentTransactionData(data);
    } catch {
      toast.error("Network error: Failed to fetch Payment Transaction data.");
    } finally {
      setLoading(false);
    }
  };

  return { paymentTransactionData, loading, fetchPaymentTransactionData};
};

export default useGetPaymentTransactionData;
