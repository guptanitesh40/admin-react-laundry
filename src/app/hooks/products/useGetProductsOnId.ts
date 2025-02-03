import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";
const token = localStorage.getItem("authToken");


const useGetProductsOnId = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProductsOnId = async (category_id: number) => {


    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/category/${category_id}/product`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        setLoading(false);
        return;
      }

      const productsData = data?.data || [];
      return productsData;
    } catch (error: any) {
      toast.error(error?.message || "Network error: Failed to fetch.", {
        position: "top-center",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchProductsOnId };
};

export default useGetProductsOnId;
