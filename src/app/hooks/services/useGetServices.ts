import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const GET_SERVICE_URL = `${import.meta.env.VITE_BASE_URL}/admin/services`;

interface Service {
  service_id: number;
  name: string;
  image: string;
}

const useGetServices = (
  pageNumber: number = 1,
  perPage: number = 5,
  search: string = "",
  sortColumn?: string,
  sortOrder?: string) => {

  const [services, setServices] = useState<Service[]>([]);
  const [totalServices, setTotalServices] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchServices = useCallback(async () => {
    const token = localStorage.getItem("authToken");

    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append("page_number", pageNumber.toString());
    if (perPage) queryParams.append("per_page", perPage.toString());
    if (search) queryParams.append("search", search);
    if (sortColumn) queryParams.append("sort_by", sortColumn);
    if (sortOrder) queryParams.append("order", sortOrder);

    const url = `${GET_SERVICE_URL}?${queryParams}`;

    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, { position: 'top-center' });
        return;
      }

      const data = await response.json();
      const allServices = data?.data?.services || [];
      const totalServices = data?.data?.count || 0;
      setServices(allServices);
      setTotalServices(totalServices);
    } catch (error: any) {
      toast.error(error?.message || "Network error: Failed to fetch.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }, [pageNumber, perPage, sortOrder, sortColumn, search]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return { services, totalServices, fetchServices, loading };
};

export default useGetServices;
