import { useState } from "react";
import toast from "react-hot-toast";

const ADD_WORKSHOP_URL = `${import.meta.env.VITE_BASE_URL}/workshops`;

const useAddWorkshop = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const addWorkshop = async (formData: any) => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(ADD_WORKSHOP_URL, {
        method: "POST",
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
      toast.error("Error adding workshop", {position: "top-center",});
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addWorkshop, loading }
};

export default useAddWorkshop;
