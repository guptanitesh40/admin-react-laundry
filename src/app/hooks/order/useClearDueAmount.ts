import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";
import { useState } from "react";

const useClearDueAmount = () => {
  const [loading, setLoading] = useState(false);

  const clearDueAmount = async (userId: number, orders: any) => {

    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/orders/payments/clear-due`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId, orders }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        return false;
      }

      toast.success(data.message, { position: "top-center" });
      return true;
    } catch (error) {
      toast.error("Error clearing due amount", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return { clearDueAmount, loading };
};

export default useClearDueAmount;
