import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

const useUpdateOrderStatus = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateOrderStatus = async (order_id: number, status: number) => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/admin/orders/update-status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ order_status: status }),
        body: JSON.stringify({
          order_ids: [order_id],
          order_status: status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        return false;
      }

      toast.success(data.message, { position: "top-center" });
      return true;
    } catch (error: any) {
      toast.error("Failed to update order status");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateOrderStatus, loading };
};

export default useUpdateOrderStatus;
