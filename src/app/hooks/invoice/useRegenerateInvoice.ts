import { useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";

const useReGenerateInvoice = () => {
  const [loading, setLoading] = useState<boolean>();
  const token = localStorage.getItem("authToken");
  const reGenerateInvoice = async (order_id: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/pdf/invoice/${order_id}?regenerate=true`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Invoice updated successfully");
      } else {
        toast.error(data?.message || `Failed to updated invoice`);
      }
    } catch {
      toast.error("An error occurred while updateding the invoice!");
    } finally {
      setLoading(false);
    }
  };
  return { reGenerateInvoice, loading };
};

export default useReGenerateInvoice;
