import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../utils/constant";

const useUpdateOurService = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateOurService = async (id: number, formData: FormData) => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/services-list/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to update service", {
          position: "top-center",
        });
        return false;
      }

      toast.success(data.message || "Service updated successfully", {
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

  return { updateOurService, loading };
};

export default useUpdateOurService;
