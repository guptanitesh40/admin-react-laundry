import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteCoupon = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteOrder = async (order_id: number): Promise<{ success: boolean; message: string }> => {
    const token = localStorage.getItem('authToken');

    const DELETE_ORDER_URL = `${import.meta.env.VITE_BASE_URL}/admin/order/${order_id}`;

    setLoading(true);

    try {
      const response = await fetch(DELETE_ORDER_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message, { position: 'top-center' });
        return { success: false, message: result.message };
      }
      return { success: true, message: result.message };

    } catch (error: any) {
      toast.error('An unexpected error occurred.', { position: 'top-center' });
      return { success: false, message: error.message };

    } finally {
      setLoading(false);
    }
  };

  return { deleteOrder, loading };
};

export default useDeleteCoupon;
