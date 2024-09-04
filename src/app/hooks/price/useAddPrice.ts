import { useState } from "react";
import toast from "react-hot-toast";

const ADD_PRICE_URL = `${import.meta.env.VITE_BASE_URL}/prices`;

interface PriceData {
  category_id: number;
  product_id: number;
  service_id: number;
  price: number;
}

const useAddPrice = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const addPrice = async (priceData: PriceData) => {
    const token = localStorage.getItem('authToken');
    setLoading(true);

    try {
      const payload = { prices: [priceData] };

      const response = await fetch(ADD_PRICE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(payload), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        const message = errorData.message;
        toast.error(message, { position: 'top-center' });
        return false;
      }

      const result = await response.json();
      toast.success(result.message , { position: 'top-center' });
      return true;
    } catch (error: any) {
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        toast.error('Network error: Failed to fetch.', { position: 'top-center' });
      } else {
        toast.error('An unexpected error occurred.', { position: 'top-center' });
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addPrice, loading };
};

export default useAddPrice;
