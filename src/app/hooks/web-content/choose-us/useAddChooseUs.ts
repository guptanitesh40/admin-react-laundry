import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../utils/constant";

interface ChooseUsPayload {
  title: string;
  description: string;
}

const useAddChooseUs = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const addChooseUs = async (payload: ChooseUsPayload) => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/why-choose-us`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to add Choose Us Card", {
          position: "top-center",
        });
        return false;
      }

      toast.success(data.message || "Choose Us Card added successfully", {
        position: "top-center",
      });
      return true;
    } catch (error: any) {
      toast.error(error?.message || "Network error", {
        position: "top-center",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addChooseUs, loading };
};

export default useAddChooseUs;
