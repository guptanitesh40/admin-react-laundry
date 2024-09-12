import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteBranch = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteBranch = async (branchId: number): Promise<{ success: boolean; message: string }> => {
    setLoading(true);

    const DELETE_BRANCH_URL = `${ import.meta.env.VITE_BASE_URL}/branches/${branchId}`;
    
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(DELETE_BRANCH_URL, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message, { position: "top-center" });
        return { success: false, message: result.message };
      }

      return { success: true, message: result.message };
      
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { deleteBranch, loading };

};

export default useDeleteBranch;
