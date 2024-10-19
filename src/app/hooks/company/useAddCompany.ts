import { useState } from 'react';
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ADD_COMPANY_URL = `${BASE_URL}/companies`;

const useAddCompany = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const addCompany = async (formData: any) => {
    const token = localStorage.getItem('authToken');
    setLoading(true);

    try {
      const formToSubmit = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          if (value instanceof FileList) {
            formToSubmit.append(key, value[0]);
          } else {
            formToSubmit.append(key, value as string);
          }
        }
      });

      const response = await fetch(ADD_COMPANY_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formToSubmit,
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, { position: 'top-center' });

        return false;
      }

      const data = await response.json();
      toast.success(data.message, { position: 'top-center' });
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

  return { addCompany, loading };
};

export default useAddCompany;
