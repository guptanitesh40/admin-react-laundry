import { useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";
const token = localStorage.getItem("authToken");

const useGeneratePaymentLink = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState();  

  const generatePaymentLink = async (formData: any) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/razorpay/generate-payment-link`,
        {
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        setLoading(false);
        return;
      }

      setTransactionId(data?.data?.razorpay?.razorpay_order_id);
    } catch {
        toast.error("Fail to generate payment link try again later");
    } finally {
      setLoading(false);
    }
  };

  return { transactionId, generatePaymentLink, loading }
};

export default useGeneratePaymentLink;
