import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

const useAssignWorkshop = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const assignWorkshop = async (order_ids: number[], workshop_id: number) => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/admin/orders/assign-workshop`, {
        method: "PATCH",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_ids, workshop_id }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        return false;
      }

      toast.success(data.message, { position: "top-center" });
      return true;
    } catch (error: any) {
      toast.error("Failed to assign workshop");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { assignWorkshop, loading };
};

export default useAssignWorkshop;
