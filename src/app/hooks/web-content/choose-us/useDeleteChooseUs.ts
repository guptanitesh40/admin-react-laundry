import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../utils/constant";

const useDeleteChooseUs = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteChooseUs = async (
    id: number
  ): Promise<{ success: boolean; message: string }> => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/why-choose-us/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      const message = data.message || "Choose Us Card deleted successfully";

      if (!response.ok) {
        toast.error(message, { position: "top-center" });
        return { success: false, message };
      }

      return { success: true, message };
    } catch (error: any) {
      const message = error?.message || "Network error";
      toast.error(message, { position: "top-center" });
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  return { deleteChooseUs, loading };
};

export default useDeleteChooseUs;
