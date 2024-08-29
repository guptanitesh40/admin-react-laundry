import { useState } from 'react';
import { toast } from 'react-hot-toast';

const SET_CATEGORY_URL = `${import.meta.env.VITE_BASE_URL}/admin/categories`;

const useAddCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const addCategory = async (name: string): Promise<{ success: boolean }> => {
    const token = localStorage.getItem('authToken');
    setLoading(true);

    try {
      const response = await fetch(SET_CATEGORY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const message = errorData.message || 'Failed to add category.';
        toast.error(message, { position: 'top-center' });

        return { success: false };
      }

      const data = await response.json();
      toast.success(data.message || 'Category added successfully!', { position: 'top-center' });
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

  return { addCategory, loading };
};

export default useAddCategory;
