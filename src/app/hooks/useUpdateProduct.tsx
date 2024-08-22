import { useState } from 'react';
import toast from 'react-hot-toast';

const useUpdateProduct = () => {
  const [loading, setLoading] = useState(false);

  const updateProduct = async (productId: number, formData: FormData) => {
    setLoading(true);

    const UPDATE_URL = `${import.meta.env.VITE_BASE_URL}/admin/products/${productId}`;

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        toast.error('No authentication token found.', { position: 'top-center' });
        setLoading(false);
        return false;
      }
      const response = await fetch(UPDATE_URL, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const result = await response.json();
        toast.error(result.message , { position: 'top-center' });
        return false;
      }

      const data = await response.json();
      toast.success(data.message, { position: 'top-center' });
      return true;
    } catch (error) {
      toast.error('An error occurred while updating the product.', { position: 'top-center' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateProduct, loading };
};

export default useUpdateProduct;
