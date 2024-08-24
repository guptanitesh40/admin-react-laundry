import { useState } from 'react';
import toast from 'react-hot-toast';

const useUpdateCategory = (refetchCategories: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateCategory = async (categoryId: number, newName: string): Promise<boolean> => {
    setLoading(true);

    const EDIT_CATEGORY_URL = `${import.meta.env.VITE_BASE_URL}/admin/categories/${categoryId}`;

    try {
      const response = await fetch(EDIT_CATEGORY_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ name: newName }), 
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message, { position: 'top-center' });
        refetchCategories();
        return true;
      } else {
        const errorData = await response.json();
        toast.error(errorData.message , { position: 'top-center' });
        return false;
      }
    } catch (error) {
      toast.error(error.message, { position: 'top-center' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateCategory, loading };
};

export default useUpdateCategory;
