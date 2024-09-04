import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';

const GET_CATEGORY_URL = `${import.meta.env.VITE_BASE_URL}/admin/categories`;

interface Category {
  category_id: number;
  name: string;
}

const useGetCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCategories = useCallback(async () => {
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      toast.error('No authentication token found.', { position: 'top-center' });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(GET_CATEGORY_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, { position: 'top-center' });
        return;
      }

      const data = await response.json();
      const categoryData = data?.data?.result || [];
      setCategories(categoryData);

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
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, refetch: fetchCategories };
};

export default useGetCategories;
