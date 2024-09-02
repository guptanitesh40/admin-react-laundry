import { useState } from "react";
import toast from "react-hot-toast";

const ADD_COUPON_URL = `${import.meta.env.VITE_BASE_URL}/admin/coupon`;

const useAddCoupon = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const addCoupon = async (formData: any): Promise<boolean> => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('No authentication token found.', { position: 'top-center' });
      return false;
    }

    setLoading(true);

    try {
      const response = await fetch(ADD_COUPON_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(formData),
      });
        
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, { position: 'top-center' });
        return false;
      }
     
      const data = await response.json();
      toast.success(data.message, { position: 'top-center' });
      return true;
    
    } catch (err: any) {
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        toast.error('Network error: Failed to fetch.', { position: 'top-center' });
      } else {
        toast.error('An unexpected error occurred.', { position: 'top-center' });
      }
      return false;

    } finally {
      setLoading(false);
    }
  };

  return { addCoupon, loading };
};

export default useAddCoupon;
