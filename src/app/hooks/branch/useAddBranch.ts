import { useState } from 'react';
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ADD_BRANCH_URL = `${BASE_URL}/branches`;

const useAddBranch = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const addBranch = async (formData: any) => {
    const token = localStorage.getItem('authToken');
    setLoading(true);
  
    if (formData.company_id && typeof formData.company_id !== 'number') {
      formData.company_id = Number(formData.company_id);
    }
  
    try {
      const response = await fetch(ADD_BRANCH_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(formData), 
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, { position: 'top-center' });
        return false;
      }
  
      const data = await response.json();
      toast.success(data.message , { position: 'top-center' });
      return true;
  
    } catch (error: any) {
      toast.error(error?.message || 'Network error: Failed to fetch.', {
        position: "top-center",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  return { addBranch, loading };
};

export default useAddBranch;
