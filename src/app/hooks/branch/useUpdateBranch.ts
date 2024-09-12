import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateBranch = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const updateBranch = async (branch_id: string, formData: any): Promise<boolean> => {
        const token = localStorage.getItem("authToken");

        const UPDATE_BRANCH_URL = `${import.meta.env.VITE_BASE_URL}/branches/${branch_id}`;

        setLoading(true);
        try {
            const response = await fetch(UPDATE_BRANCH_URL, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    ...(formData instanceof FormData ? {} : { 'Content-Type': 'application/json' })
                },
                body: formData instanceof FormData ? formData : JSON.stringify(formData),
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
            toast.error(error.message || 'An unexpected error occurred', { position: "top-center" });
            return false;

        } finally {
            setLoading(false);
        }
    };

    return { updateBranch, loading };
};

export default useUpdateBranch;
