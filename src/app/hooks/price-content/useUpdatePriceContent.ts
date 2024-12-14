import { useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";

const useUpdatePriceContent = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const updatePriceContent = async (
    price_content_id: number,
    formData: any
  ): Promise<boolean> => {
    const token = localStorage.getItem("authToken");

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/price-content/${price_content_id}`,{
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        return false;
      }

      toast.success(data.message, { position: "top-center" });
      return true;
    } catch (error: any) {
      toast.error("Error Updating price content", { position: "top-center" });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updatePriceContent, loading };
};

export default useUpdatePriceContent;
