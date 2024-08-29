import { useState } from "react"
import toast from "react-hot-toast";

const ADD_SERVICE_URL = `${import.meta.env.VITE_BASE_URL}/admin/services`;

const useAddService = () =>{
    const [loading,setLoading] = useState<boolean>(false);

    const addService = async(formData:FormData) => {
        const token = localStorage.getItem('authToken');
        setLoading(true);

        try {
            const response = await fetch(ADD_SERVICE_URL,{
                method: 'POST',
                headers: {
                  'Authorization': token ? `Bearer ${token}` : '',
                },
                body: formData,
              });

              if (!response.ok) {
                const errorData = await response.json();
                const message = errorData.message;
                toast.error(message, { position: 'top-center' });
                return false; 
              }

                const data = await response.json();
                toast.success(data.message, { position: 'top-center' });
                return true; 

        } catch (err: any) {
                if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
                toast.error('Network error: Failed to fetch.', { position: 'top-center' });
            } else {
                toast.error('An unexpected error occurred.', { position: 'top-center' });
            }
            return false;

          } finally {
                setLoading(false);
          }
    };
    return {addService,loading}
};
export default useAddService