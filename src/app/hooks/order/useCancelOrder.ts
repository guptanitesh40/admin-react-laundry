import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

const useCancelOrder = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem("authToken");

  const cancelOrder = async (formData: FormData) => {
    setLoading(true);   

    try {
      const response = await fetch(`${BASE_URL}/orders/cancel`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        return false;
      }

      toast.success(data.message, { position: "top-center" });
      return true;
    } catch (error) {
      toast.error(error?.message || "Error in cancelling order", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return { cancelOrder, loading };
};

export default useCancelOrder;
