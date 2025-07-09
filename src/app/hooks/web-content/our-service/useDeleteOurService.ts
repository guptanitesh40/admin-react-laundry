import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../utils/constant";

const useDeleteOurService = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteOurService = async (id: number) => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/services-list/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to delete service", {
          position: "top-center",
        });
        return { success: false, message: data.message || "Delete failed" };
      }

      return { success: true, message: data.message || "Deleted successfully" };
    } catch (error: any) {
      toast.error(error?.message || "Network error", {
        position: "top-center",
      });
      return { success: false, message: error?.message || "Network error" };
    } finally {
      setLoading(false);
    }
  };

  return { deleteOurService, loading };
};

export default useDeleteOurService;
