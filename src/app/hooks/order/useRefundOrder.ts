import { useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";

const useRefundOrder = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem("authToken");

  const refundOrder = async (formData: any) => {

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/refund`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        return false;
      }

      toast.success(data.message, { position: "top-center" });
      return true;
    } catch (error) {
      toast.error(error?.message || "Network Error : Fail to refund order", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return { refundOrder, loading };
};

export default useRefundOrder;
