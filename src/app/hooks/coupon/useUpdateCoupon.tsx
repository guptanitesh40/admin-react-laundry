import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateCoupon = (refetchCoupons: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateCoupon = async (couponId: number, formData: FormData): Promise<boolean> => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('No authentication token found.', { position: 'top-center' });
      return false;
    }

    const UPDATE_COUPON_URL = `${import.meta.env.VITE_BASE_URL}/admin/coupon/${couponId}`;

    setLoading(true);

    try {
      const response = await fetch(UPDATE_COUPON_URL, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, { position: 'top-center' });
        return false;
      }

      const result = await response.json();
      toast.success(result.message, { position: 'top-center' });
      refetchCoupons();
      return true;

    } catch (error: any) {
      toast.error('An unexpected error occurred.', { position: 'top-center' });
      return false;

    } finally {
      setLoading(false);
    }
  };

  return { updateCoupon, loading };
};

export default useUpdateCoupon;
