import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateBranch = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const updateBranch = async (branch_id: string, formData: any): Promise<boolean> => {
        const token = localStorage.getItem("authToken");

        const UPDATE_BRANCH_URL = `${import.meta.env.VITE_BASE_URL}/branches/${branch_id}`;
        setLoading(true);

        if (formData.company_id && typeof formData.company_id !== 'number') {
            formData.company_id = Number(formData.company_id);
          }
        
        try {
            const response = await fetch(UPDATE_BRANCH_URL, {
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

    return { updateBranch, loading };
};

export default useUpdateBranch;
