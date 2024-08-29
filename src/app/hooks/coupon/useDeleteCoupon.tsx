import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteCoupon = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteCoupon = async (couponId: number): Promise<{ success: boolean; message: string }> => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      const message = 'No authentication token found.';
      toast.error(message, { position: 'top-center' });
      return { success: false, message };
    }

    const DELETE_COUPON_URL = `${import.meta.env.VITE_BASE_URL}/admin/coupon/${couponId}`;

    setLoading(true);

    try {
      const response = await fetch(DELETE_COUPON_URL, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message, { position: 'top-center' });
        return { success: false, message: result.message };
      }

      toast.success(result.message, { position: 'top-center' });
      return { success: true, message: result.message };

    } catch (error: any) {
      toast.error('An unexpected error occurred.', { position: 'top-center' });
      return { success: false, message: error.message };

    } finally {
      setLoading(false);
    }
  };

  return { deleteCoupon, loading };
};

export default useDeleteCoupon;
