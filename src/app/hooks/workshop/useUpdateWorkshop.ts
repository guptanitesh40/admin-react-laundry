import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateWorkshop = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateWorkshop = async (workshop_id: number,formData: any): Promise<boolean> => {
    const token = localStorage.getItem("authToken");
    const UPDATE_WORKSHOP_URL = `${import.meta.env.VITE_BASE_URL}/workshops/${workshop_id}`;

    setLoading(true);
    try {
      const response = await fetch(UPDATE_WORKSHOP_URL, {
        method: "PUT",
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
      toast.error(error.message || "Error Updating workshop", { position: "top-center" });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateWorkshop, loading };
};

export default useUpdateWorkshop;
