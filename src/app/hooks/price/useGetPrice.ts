import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';

const GET_PRICE_URL = `${import.meta.env.VITE_BASE_URL}/prices`;

interface Price {
  [key: string]: any;
}

const useGetPrice = () => {
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPrices = useCallback(async () => {
    const token = localStorage.getItem('authToken');

    try {
      const response = await fetch(GET_PRICE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message , { position: 'top-center' });
        return;
      }

      const data = await response.json();
      setPrices(data?.data || []);
    } catch (err: any) {
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        toast.error('Network error: Failed to fetch.', { position: 'top-center' });
      } else {
        toast.error('An unexpected error occurred.', { position: 'top-center' });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);
  
  return { prices, loading, fetchPrices };
};

export default useGetPrice;
