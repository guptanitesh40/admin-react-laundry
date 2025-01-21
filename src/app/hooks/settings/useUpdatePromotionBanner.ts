import { useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";
const token = localStorage.getItem("authToken");

const useUpdatePromotionBanner = () => {
  const [loading, setLoading] = useState<boolean>();

  const updatePromotionBanner = async (formData: FormData) => {
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/admin/settings/image`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        return false;
      }

      toast.success(data.message, { position: "top-center" });
      return true;
    } catch (error: any) {
      toast.error(error || "Network Error : Fail to update banner", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return { updatePromotionBanner, loading };
};

export default useUpdatePromotionBanner;
