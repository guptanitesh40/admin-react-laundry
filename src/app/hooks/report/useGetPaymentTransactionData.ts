import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";
const token = localStorage.getItem("authToken");

interface PaymentTransactionData {
  month: string;
  total_amount: number;
  total_transaction_amount: number;
}

const useGetPaymentTransactionData = () => {
  const [paymentTransactionData, setPaymentTransactionData] = useState<PaymentTransactionData | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPaymentTransactionData = async () => {
    setLoading(false);
    try {
      const response = await fetch(`${BASE_URL}/report/payment-transaction`, {
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
