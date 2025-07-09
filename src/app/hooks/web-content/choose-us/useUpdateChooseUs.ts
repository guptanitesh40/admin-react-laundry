import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../utils/constant";

interface ChooseUsPayload {
  title: string;
  description: string;
}

const useUpdateChooseUs = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateChooseUs = async (id: number, payload: ChooseUsPayload) => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/why-choose-us/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to update Choose Us Card", {
          position: "top-center",
        });
        return false;
      }

      toast.success(data.message || "Choose Us Card updated successfully", {
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

  return { updateChooseUs, loading };
};

export default useUpdateChooseUs;
