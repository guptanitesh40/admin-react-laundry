import { useState } from "react";
import toast from "react-hot-toast";

interface Service {
  service_id: number;
  name: string;
  image: string;
}

const useGetService = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [service, setService] = useState<Service | null>(null);

    const fetchService = async (service_id: number) => {
    if (!service_id) {
        setService(null);
        return;
      }

      const token = localStorage.getItem("authToken");
      const GET_SERVICE_URL = `${import.meta.env.VITE_BASE_URL}/admin/services/${service_id}`;

      setLoading(false);

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
          setLoading(false);
          return;
        }

        const data = await response.json();
        setService(data?.data?.service);
      } catch (error) {
        toast.error("Network error: Failed to fetch.");
      } finally {
        setLoading(false);
      }
    };
  
  return { service, loading, fetchService };
};

export default useGetService;
