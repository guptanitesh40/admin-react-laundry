import { useState } from "react";
import toast from "react-hot-toast";

interface EditCategoryFormData {
  name: string;
  name_gujarati: string;
  name_hindi: string;
}
const useUpdateCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateCategory = async (
    category_id: number,
    formdata: EditCategoryFormData
  ): Promise<boolean> => {
    setLoading(true);

    const UPDATE_CATEGORY_URL = `${
      import.meta.env.VITE_BASE_URL
    }/admin/categories/${category_id}`;

    try {
      const response = await fetch(UPDATE_CATEGORY_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(formdata),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message, { position: "top-center" });
        return true;
      } else {
        const errorData = await response.json();
        toast.error(errorData.message, { position: "top-center" });
        return false;
      }
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateCategory, loading };
};

export default useUpdateCategory;
