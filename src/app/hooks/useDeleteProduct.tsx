import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteProduct = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteProduct = async (
    productId: number
  ): Promise<{ success: boolean; message: string }> => {
    setLoading(true);

    const DELETE_URL = `${
      import.meta.env.VITE_BASE_URL
    }/admin/products/${productId}`;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        const message = "No authentication token found.";
        toast.error(message, { position: "top-center" });
        setLoading(false);
        return { success: false, message };
      }

      const response = await fetch(DELETE_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message, { position: "top-center" });
        return { success: false, message: result.message };
      }

      return { success: true, message: result.message };
    } catch (error: any) {

      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { deleteProduct, loading };
};

export default useDeleteProduct;