import { useState } from "react"
import toast from "react-hot-toast";

const useDeleteService = () => {
  const [loading,setLoading] = useState<Boolean>(false);
  const token = localStorage.getItem("authToken");

  const deleteService = async (serviceId:number):Promise<{ success: boolean; message: string }> => 
  {      
    setLoading(true);

    const DELETE_SERVICE_URL = `${import.meta.env.VITE_BASE_URL}/admin/services/${serviceId}`;

      try {
        const token = localStorage.getItem("authToken");

        const response = await fetch(DELETE_SERVICE_URL, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            },
          });

          const result = await response.json();

          if (!token) {
            toast.error(result.message, { position: "top-center" });
            setLoading(false);
            return { success: false, message : result.message};
          }

          if (!response.ok) {
            toast.error(result.message, { position: "top-center" });
            return { success: false, message: result.message };
          }
        
          return { success: true, message: result.message };
      }
      catch (error: any) {
        return { success: false, message: error.message };
      } finally{ 
        setLoading(false);
      }
  }   
    return { deleteService, loading };
};

export default useDeleteService;