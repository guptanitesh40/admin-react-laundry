import { useState } from "react";
import toast from "react-hot-toast";

interface Product {
  product_id: number;
  name: string;
  image: string;
}

const useGetProduct = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);

  const fetchProduct = async (product_id: number) => {
    if (!product_id) {
      setProduct(null);
      return;
    }

    const token = localStorage.getItem("authToken");
    const GET_PRODUCT_URL = `${ import.meta.env.VITE_BASE_URL}/admin/products/${product_id}`;

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
        setLoading(false);
        return;
      }

      const data = await response.json();
      setProduct(data?.data?.product);
    } catch (error) {
      toast.error("Network error: Failed to fetch.");
    } finally {
      setLoading(false);
    }
  };

  return { product, loading, fetchProduct };
};

export default useGetProduct;
