import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateUser = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateUser = async (user_id: number, formData: any): Promise<boolean> => {
    const token = localStorage.getItem("authToken");
    const UPDATE_USER_URL = `${import.meta.env.VITE_BASE_URL}/user/${user_id}`;

    setLoading(true);
   
    try {
      const response = await fetch(UPDATE_USER_URL, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
      toast.error(error.message, { position: "top-center" });
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  return { updateUser, loading };
};

export default useUpdateUser;
