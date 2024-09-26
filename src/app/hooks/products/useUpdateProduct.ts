import { useState } from 'react';
import toast from 'react-hot-toast';

const useUpdateProduct = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateProduct = async (product_id: number,formData: FormData): Promise<boolean> => {
    setLoading(true);

    const UPDATE_URL = `${import.meta.env.VITE_BASE_URL}/admin/products/${product_id}`;

    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        toast.error("No authentication token found", { position: 'top-center' });
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

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message, { position: 'top-center' });
        return true;
      } else {
        const errorData = await response.json();
        const message = errorData.message;

        toast.error(message, { position: 'top-center' });
        return false;
      }
    } catch (error) {
      toast.error(error.message, { position: 'top-center' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateProduct, loading };
};

export default useUpdateProduct;
