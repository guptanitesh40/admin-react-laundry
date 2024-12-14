import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

const useAssignBranch = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const assignBranch = async (order_id: number, branch_id: number) => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/admin/orders/assign-branch`, {
        method: "PATCH",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_id, branch_id }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        return false;
      }

      toast.success(data.message, { position: "top-center" });
      return true;
    } catch (error: any) {
      toast.error("Failed to assign branch");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { assignBranch, loading };
};

export default useAssignBranch;
