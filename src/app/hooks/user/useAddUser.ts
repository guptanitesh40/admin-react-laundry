import { useState } from "react";
import toast from "react-hot-toast";

const ADD_USER_URL = `${import.meta.env.VITE_BASE_URL}/user`;

const useAddUser = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const addUser = async (formData: any) => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(ADD_USER_URL, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, { position: "top-center" });
        return false;
      }

      const data = await response.json();
      if(formData.role_id === 5)
      {
      toast.success("Customer added successfully", { position: "top-center" });
      }else{
        toast.success(data.message, { position: "top-center" });
      }
      return true;
    } catch (error: any) {
      toast.error(error?.message || "Error adding banner", {
        position: "top-center",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { addUser, loading };
};

export default useAddUser;
