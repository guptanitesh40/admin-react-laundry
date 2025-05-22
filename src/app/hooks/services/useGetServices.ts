/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

interface Service {
  service_id: number;
  name: string;
  name_gujarati: string;
  name_hindi: string;
  image: string;
}

const useGetServices = (
  pageNumber: number = 1,
  perPage: number = 10,
  search: string = "",
  sortColumn?: string,
  sortOrder?: string) => {

  const [services, setServices] = useState<Service[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchServices = async () => {
    const token = localStorage.getItem("authToken");
    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append("page_number", pageNumber.toString());
    if (perPage) queryParams.append("per_page", perPage.toString());
    if (search) queryParams.append("search", search);
    if (sortColumn) queryParams.append("sort_by", sortColumn);
    if (sortOrder) queryParams.append("order", sortOrder);

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/admin/services?${queryParams}`, {
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

      setServices(data?.data?.services || []);
      setCount(data?.data?.count || 0);
    } catch (error: any) {
      toast.error(error?.message || "Network error: Failed to fetch services.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [pageNumber, perPage, search, sortColumn, sortOrder]);

  return { services, count, fetchServices, loading };
};

export default useGetServices;
