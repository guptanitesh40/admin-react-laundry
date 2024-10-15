import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateOrder = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const updateOrder = async (order_id: number, formData: any): Promise<boolean> => {
        const token = localStorage.getItem("authToken");

        const UPDATE_ORDER_URL = `${import.meta.env.VITE_BASE_URL}/admin/orders/${order_id}`;
        setLoading(true);

        try {
            const response = await fetch(UPDATE_ORDER_URL, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                toast.success(result.message, { position: "top-center" });
                return true;
            }

            const errorData = await response.json();
            toast.error(errorData.message , { position: "top-center" });
            return false;

        } catch (error: any) {
            toast.error(error?.message || 'Network error: Failed to fetch.', {
              position: "top-center",
            });
            return false;
          } finally {
            setLoading(false);
        }
    };

    return { updateOrder, loading };
};

export default useUpdateOrder;
