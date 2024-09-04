import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteProduct = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteProduct = async (product_id: number): Promise<{ success: boolean; message: string }> => {
    setLoading(true);

    const DELETE_URL = `${import.meta.env.VITE_BASE_URL}/admin/products/${product_id}`;

    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(DELETE_URL, {
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
        return { success: false, message: result.message };
      }

      if (!response.ok) {
        toast.error(result.message, { position: "top-center" });
        return { success: false, message: result.message };
      }

      return { success: true, message: result.message };
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { deleteProduct, loading };
};

export default useDeleteProduct;
