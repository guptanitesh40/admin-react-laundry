import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteProduct = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteProduct = async (productId: number): Promise<boolean> => {
    setLoading(true);

    const DELETE_URL = `${import.meta.env.VITE_BASE_URL}/admin/products/${productId}`;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("No authentication token found.", {
          position: "top-center",
        });
        setLoading(false);
        return false;
      }

      const response = await fetch(DELETE_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const result = await response.json();
        toast.error(result.message ,{
          position: "top-center",
        });
        return false;
      }

      return true;
    } catch (error) {
      toast.error("An error occurred while deleting the product.", {
        position: "top-center",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteProduct, loading };
};

export default useDeleteProduct;
