import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteWorkshop = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteWorkshop = async (workshop_id: number): Promise<{ success: boolean; message: string }> => {
    setLoading(true);

    const DELETE_WORKSHOP_URL = `${import.meta.env.VITE_BASE_URL}/workshops/${workshop_id}`;
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(DELETE_WORKSHOP_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message, { position: "top-center" });
        return { success: false, message: result.message };
      }

      return { success: true, message: result.message };
    } catch (error: any) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { deleteWorkshop, loading };
};

export default useDeleteWorkshop;
