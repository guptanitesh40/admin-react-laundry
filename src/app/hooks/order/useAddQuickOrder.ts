import { useState } from "react";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ADD_QUICK_ORDER_URL = `${BASE_URL}/admin/orders?quick_order_by_admin=true`;

const useAddQuickOrder = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const addQuickOrder = async (formData: any) => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(ADD_QUICK_ORDER_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData?.message || "Failed to place quick order", {
          position: "top-center",
        });
        return false;
      }

      const data = await response.json();
      toast.success(data?.message || "Quick order placed successfully", {
        position: "top-center",
      });
      return true;
    } catch (error: any) {
      toast.error(error?.message || "Network error: Failed to fetch.", {
        position: "top-center",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addQuickOrder, loading };
};

export default useAddQuickOrder;
