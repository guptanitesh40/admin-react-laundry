import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../utils/constant";

const useDeleteLaundryBenefit = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteLaundryBenefit = async (id: number) => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/benefits/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message || "Delete failed" };
      }

      return { success: true, message: data.message || "Deleted successfully" };
    } catch (error: any) {
      return { success: false, message: error?.message || "Network error" };
    } finally {
      setLoading(false);
    }
  };

  return { deleteLaundryBenefit, loading };
};

export default useDeleteLaundryBenefit;
