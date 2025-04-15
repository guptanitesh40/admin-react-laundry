import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

interface Order {
  order_id: number;
  paid_amount: number;
  payment_status: number;
  kasar_amount: number;
  order_status: number;
  user_id: number;
}

const usePayDue = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const payDue = async (orders: Order[]) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("Authentication token is missing!", {
        position: "top-center",
      });
      return { success: false };
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/orders/payments/pay-due`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orders }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to process payment.");
      }

      toast.success("Order status updated successfully", {
        position: "top-center",
      });
      return { success: true, data };
    } catch (err: any) {
      toast.error(err.message, { position: "top-center" });
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { payDue, loading };
};

export default usePayDue;
