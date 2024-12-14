import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

const useDeletePriceContent = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deletePriceContent = async (price_content_id: number): Promise<{ success: boolean; message: string }> => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch( `${BASE_URL}/price-content/${price_content_id}`, {
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
      toast.error(error.message, { position: "top-center" });
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { deletePriceContent, loading };
};

export default useDeletePriceContent;
