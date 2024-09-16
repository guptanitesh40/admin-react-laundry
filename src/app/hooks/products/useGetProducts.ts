import { useCallback, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const GET_PRODUCT_URL = `${import.meta.env.VITE_BASE_URL}/admin/products`;
const token = localStorage.getItem('authToken');

interface Product {
  product_id: number;
  name: string;
  image: string; 
}

const useGetProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProduct = useCallback(async () => {
    if (!token) {
      toast.error('No authentication token found.', { position: 'top-center' });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(GET_PRODUCT_URL, {
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

      const productData = data?.data?.product || [];
      setProducts(productData);

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
    fetchProduct();
  }, [fetchProduct]);

  return { products, loading, refetch: fetchProduct };
};

export default useGetProducts;
