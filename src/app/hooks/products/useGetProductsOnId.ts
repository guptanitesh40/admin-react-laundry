import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Product {
  product_product_id: number;
  product_name: string;
  image: string;
}

const useGetProductsOnId = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProductsOnId = async (category_id: number) => {
    const token = localStorage.getItem("authToken");

    const GET_PRODUCT_URL = `${import.meta.env.VITE_BASE_URL}/category/${category_id}/product`;

    setLoading(true);
    try {
      const response = await fetch(GET_PRODUCT_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, { position: "top-center" });
        return;
      }

      const data = await response.json();
      const productsData = data?.data || [];
      setProducts(productsData);
    } catch (error: any) {
      toast.error(error?.message || "Network error: Failed to fetch.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, fetchProductsOnId };
};

export default useGetProductsOnId;
