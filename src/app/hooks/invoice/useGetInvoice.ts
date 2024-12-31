import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

const useGenerateInvoice = () => {
  const [loading, setLoading] = useState<boolean>();
  const token = localStorage.getItem("authToken");

  const generateInvoice = async (order_id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/pdf/invoice/${order_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
  
      if (response.ok) {
        const url = data?.url;
        window.open(url, "_blank");
      } else {  
        toast.error(data?.message || `Failed to generate invoice`);
      }

    } catch {
      toast.error("An error occurred while generating the invoice!");
    } finally {
      setLoading(false);
    }
  };

  return { generateInvoice, loading };
};

export default useGenerateInvoice;
