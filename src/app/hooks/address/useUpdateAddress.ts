import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

export const useUpdateAddress = () => {
  const [loading, setLoading] = useState(false);

  const updateAddress = async (id: number, payload: any) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("User not authenticated");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/address/admin/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update address");
      }

      toast.success("Address updated successfully");
      return data;
    } catch (error: any) {
      toast.error(error.message || "Failed to update address");
    } finally {
      setLoading(false);
    }
  };

  return { updateAddress, loading };
};
