import { useState } from 'react';
import toast from 'react-hot-toast';


const useEditCategory = (refetchCategories: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);

  const editCategory = async (categoryId: number, newName: string): Promise<boolean> => {
    setLoading(true);

    const EDIT_URL = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_CATEGORY_URL}/${categoryId}`;

    try {
      const response = await fetch( EDIT_URL, {
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
        const message = errorData.message;
      
        toast.error(message, { position: 'top-center' });  
        
        return false;
      }
    } catch (err) {
      console.error('Edit failed:', err);
      toast.error('An unexpected error occurred while editing the category.', { position: 'top-center' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { editCategory, loading };
};

export default useEditCategory;
