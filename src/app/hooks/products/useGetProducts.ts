import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

interface Product {
  product_id: number;
  name: string;
  name_gujarati: string;
  name_hindi: string;
  image: string;
  count: number;
}

const useGetProducts = (
  pageNumber: number = 1,
  perPage: number = 10,
  search: string = "",
  sortColumn?: string,
  sortOrder?: string
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProducts = async () => {
    const token = localStorage.getItem("authToken");
    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append("page_number", pageNumber.toString());
    if (perPage) queryParams.append("per_page", perPage.toString());
    if (search) queryParams.append("search", search);
    if (sortColumn) queryParams.append("sort_by", sortColumn);
    if (sortOrder) queryParams.append("order", sortOrder);

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/admin/products?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        setLoading(false);
        return;
      }

      setProducts(data?.data?.result || []);
      setCount(data?.data?.count || 0);
    } catch (error: any) {
      toast.error(
        error?.message || "Network error: Failed to fetch products.",
        {
          position: "top-center",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pageNumber, perPage, search, sortColumn, sortOrder]);

  return { products, loading, count, fetchProducts };
};

export default useGetProducts;
