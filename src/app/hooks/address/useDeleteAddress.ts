// src/hooks/useDeleteAddress.ts
import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

export const useDeleteAddress = () => {
  const [loading, setLoading] = useState(false);

  const deleteAddress = async (id: number) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("User not authenticated");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/address/admin/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete address");
      }

      return { success: true, message: data.message };
    } catch (error: any) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { deleteAddress, loading };
};
