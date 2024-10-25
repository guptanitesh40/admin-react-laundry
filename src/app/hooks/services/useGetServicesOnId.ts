import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Service {
  service_service_id: number;
  service_name: string;
  image: string;
}

const useGetServicesOnId = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchServicesOnId = async (category_id: number, product_id: number) => {
    const token = localStorage.getItem("authToken");
    const GET_SERVICE_URL = `${import.meta.env.VITE_BASE_URL}/category/${category_id}/product/${product_id}/service`;

    try {
      const response = await fetch(GET_SERVICE_URL, {
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
      const servicesData = data?.data || [];
      setServices(servicesData);
    } catch (error: any) {
      toast.error(error?.message || "Network error: Failed to fetch.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return { services, loading, fetchServicesOnId };
};

export default useGetServicesOnId;
