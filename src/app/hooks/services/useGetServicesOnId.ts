import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";


const useGetServicesOnId = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchServicesOnId = async (category_id: number, product_id: number) => {
    const token = localStorage.getItem("authToken");

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/category/${category_id}/product/${product_id}/service`, {
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

      const servicesData = data?.data || [];
      return servicesData;
    } catch (error: any) {
      toast.error(error?.message || "Network error: Failed to fetch.", {
        position: "top-center",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchServicesOnId };
};

export default useGetServicesOnId;
