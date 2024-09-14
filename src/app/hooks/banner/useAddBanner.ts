import { useState } from "react";
import toast from "react-hot-toast";

const ADD_BANNER_URL = `${import.meta.env.VITE_BASE_URL}/admin/banners`;

const useAddBanner = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const addBanner = async (formData: FormData) => {
    const token = localStorage.getItem("authToken");
    setLoading(true);
  
    try {
      const response = await fetch(ADD_BANNER_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,  
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, { position: "top-center" });
        return false;
      }
  
      const data = await response.json();
      toast.success(data.message, { position: "top-center" });
      return true;
    } catch (error: any) {
      toast.error(error?.message || "Error adding banner", { position: "top-center" });
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  return { addBanner, loading };
};

export default useAddBanner;
