import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateBanner = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateBanner = async (banner_id: number,formData: any): Promise<boolean> => {
    const token = localStorage.getItem("authToken");

    const UPDATE_BANNER_URL = `${import.meta.env.VITE_BASE_URL}/admin/banners/${banner_id}`;
  
    setLoading(true);

    try {
      const response = await fetch(UPDATE_BANNER_URL, {
        method: "PUT",
        headers: {
         'Authorization': `Bearer ${token}`, 
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message, { position: "top-center" });
        return true;
      } else {
        const errorData = await response.json();
        toast.error(errorData.message, { position: "top-center" });
        return false;
      }

    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
      return false;
    } finally {
      setLoading(false);
    }
  };
  return {updateBanner, loading}
  
};

export default useUpdateBanner
