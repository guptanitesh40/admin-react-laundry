import { useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";

const useAddPriceContent = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const addPriceContent = async (formData: any) => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/price-content`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        return false;
      }

      toast.success(data.message, { position: "top-center" });
      return true;
    } catch (error: any) {
      toast.error("Error adding Price content", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return { addPriceContent, loading };
};

export default useAddPriceContent;
