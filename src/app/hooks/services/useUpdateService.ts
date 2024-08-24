import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateService = (refetchServices: () => void) => {
    const [loading, setLoading] = useState(false);

    const updateService = async (serviceId: number, formData: FormData) => {
        setLoading(true);

        const UPDATE_SERVICE_URL = `${import.meta.env.VITE_BASE_URL}/admin/services/${serviceId}`;

        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                toast.error("No authentication token found", { position: 'top-center' });
                setLoading(false);
                return false;
            }

            const response = await fetch(UPDATE_SERVICE_URL, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                toast.success(result.message, { position: 'top-center' });
                refetchServices();
                return true;
              } else {
                const errorData = await response.json();
                const message = errorData.message;
              
                toast.error(message, { position: 'top-center' });  
                
                return false;
              }
        } finally {
            setLoading(false);
        }
    };

    return { updateService, loading };
};

export default useUpdateService;
