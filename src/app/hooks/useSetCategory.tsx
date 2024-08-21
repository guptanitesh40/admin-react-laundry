import { useState } from 'react';
import { toast } from 'react-hot-toast';

const SET_CATEGORY_URL =`${import.meta.env.VITE_BASE_URL}/admin/categories`;

const useSetCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const setCategory = async (category: string) => {
    const token = localStorage.getItem('authToken');
    setLoading(true);

    try {
      const response = await fetch(SET_CATEGORY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ name: category }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const message = errorData.message ;
       
        toast.error(message, { position: 'top-center' });

        return { success: false };
      }

      const data = await response.json();
      toast.success(data.message, { position: 'top-center' });
      return { success: true };
    } catch (err: any) {
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        toast.error('Network error: Failed to fetch.', { position: 'top-center' });
      } else {
        toast.error('An unexpected error occurred.', { position: 'top-center' });
      }
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { setCategory, loading };
};

export default useSetCategory;
