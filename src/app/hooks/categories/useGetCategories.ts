import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";

const GET_CATEGORIES_URL = `${import.meta.env.VITE_BASE_URL}/admin/categories`;

interface Category {
  category_id: number;
  name: string;
  totalCategories: number;
}

const useGetCategories = (
  pageNumber: number = 1,
  perPage: number = 10,
  search: string = "",
  sortColumn?: string,
  sortOrder?: string
) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalCategories, setTotalCategories] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCategories = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append("page_number", pageNumber.toString());
    if (perPage) queryParams.append("per_page", perPage.toString());
    if (search) queryParams.append("search", search);
    if (sortColumn) queryParams.append("sortBy", sortColumn);
    if (sortOrder) queryParams.append("order", sortOrder);

    setLoading(true);
    try {
      const response = await fetch(`${GET_CATEGORIES_URL}?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to fetch categories.", {
          position: "top-center",
        });
        return;
      }

      const data = await response.json();
      const categoriesData = data?.data?.result || [];
      const totalCategories = data?.data?.count || 0;

      setCategories(categoriesData);
      setTotalCategories(totalCategories);
    } catch (error: any) {
      toast.error(error?.message || "Network error: Failed to fetch categories.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }, [pageNumber, perPage, sortOrder, sortColumn, search]);

  return { categories, totalCategories, loading, fetchCategories };
};

export default useGetCategories;
