import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Category {
  category_id: number;
  name: string;
}

const useGetCategory = (category_id: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      
      if (!category_id) {
        setCategory(null);
        return;
      }

      const token = localStorage.getItem("authToken");
      const GET_CATEGORY_URL = `${import.meta.env.VITE_BASE_URL}/admin/categories/${category_id}`;

      setLoading(true);

      try {
        const response = await fetch(GET_CATEGORY_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.message, { position: "top-center" });
          setLoading(false);
          return;
        }

        const data = await response.json();
        setCategory(data?.data?.result);
      } catch (error: any) {
        toast.error(error?.message || "Network error: Failed to fetch.", {
          position: "top-center",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [category_id]);

  return { category, loading };
};

export default useGetCategory;
