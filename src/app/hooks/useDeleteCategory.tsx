import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteCategory = async (categoryId: number): Promise<boolean> => {
    setLoading(true);

    const DELETE_URL = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_CATEGORY_URL}/${categoryId}`;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("No authentication token found.", {
          position: "top-center",
        });
        setLoading(false);
        return false;
      }

      const response = await fetch( DELETE_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const result = await response.json();
        toast.error(result.message || "Failed to delete category.", {
          position: "top-center",
        });
        return false;
      }

      const result = await response.json();
      return true;
    } catch (error) {
      toast.error("An error occurred while deleting the category.", {
        position: "top-center",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteCategory, loading };
};

export default useDeleteCategory;
