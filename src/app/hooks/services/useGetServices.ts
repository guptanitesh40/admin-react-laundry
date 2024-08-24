import { useCallback, useEffect, useState } from "react";
import toast, { Toast } from "react-hot-toast";

const GET_SERVICE_URL = `${import.meta.env.VITE_BASE_URL}/admin/services`;

interface Service {
  id: number;
  name: string;
  image: string;
}

const useGetServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchServices = useCallback( async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        toast.error('No authentication token found.', { position: 'top-center' });
        setLoading(false);
        return;
      }

    try {
      const response = await fetch(GET_SERVICE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, { position: 'top-center' });
        return;
      }

      const data = await response.json();

      const serviceData =
        data?.data?.service?.map(
          (service: { service_id: number; name: string; image: string }) => ({
            id: service.service_id,
            name: service.name,
            image: service.image,
          })
        ) || [];

      setServices(serviceData);

    } catch (err: any) {
      if (err.name === "TypeError" && err.message.includes("Failed to fetch")) {
        toast.error("Network error: Failed to fetch.", {
          position: "top-center",
        });
      } else {
        toast.error("An unexpected error occured", { position: "top-center" });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return { services, refetch:fetchServices,loading };
};

export default useGetServices;
