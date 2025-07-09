import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../utils/constant";

const useAddLaundryBenefit = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const addLaundryBenefit = async (formData: FormData) => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/benefits`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to add laundry benefit", {
          position: "top-center",
        });
        return false;
      }

      toast.success(data.message || "Laundry benefit added successfully", {
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

  return { addLaundryBenefit, loading };
};

export default useAddLaundryBenefit;
