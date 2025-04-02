import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

const useChangeOrderStatus = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem("authToken");

  const changeOrderStatus = async (orderIds: number[], orderStatus: number) => {
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/admin/orders/update-status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_ids: orderIds, order_status: orderStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to update order status", {
          position: "top-center",
        });
        return false;
      }

      toast.success(data.message || "Order status updated successfully", {
        position: "top-center",
      });

      return true;
    } catch (error) {
      toast.error(error?.message || "Error updating order status", {
        position: "top-center",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { changeOrderStatus, loading };
};

export default useChangeOrderStatus;
