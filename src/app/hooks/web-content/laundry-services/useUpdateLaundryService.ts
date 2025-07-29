import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../utils/constant";

const useUpdateLaundryService = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateLaundryService = async (id: number, formData: FormData) => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/laundry-services/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to update laundry service", {
          position: "top-center",
        });
        return false;
      }

      toast.success(data.message || "Laundry service updated successfully", {
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

  return { updateLaundryService, loading };
};

export default useUpdateLaundryService;
