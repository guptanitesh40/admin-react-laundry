import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteBanner = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteBanner = async (banner_id: number): Promise<{ success: boolean; message: string }> => {
    setLoading(true);

    const DELETE_BANNER_URL = `${import.meta.env.VITE_BASE_URL}/admin/banners/${banner_id}`;

    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(DELETE_BANNER_URL, {
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
  return { deleteBanner, loading };
};

export default useDeleteBanner;
