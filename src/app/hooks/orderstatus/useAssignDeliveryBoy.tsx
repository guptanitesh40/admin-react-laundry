import { useState } from "react";
import toast from "react-hot-toast";

const ASSIGN_DELIVERYBOY_URL = `${
  import.meta.env.VITE_BASE_URL
}/admin/orders/assign-delivery`;

const useAssignDeliveryBoy = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const assignDeliveryBoy = async (formData: any) => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(ASSIGN_DELIVERYBOY_URL, {
        method: "PATCH",
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
      toast.error(error?.message || "Error assigning delivery boy", {
        position: "top-center",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { assignDeliveryBoy, loading };
};

export default useAssignDeliveryBoy;
