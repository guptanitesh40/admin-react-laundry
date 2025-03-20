import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

interface Workshop {
  workshop_id: number;
  workshop_managers: any [];
  workshop_name: string;
  email: string;
  address: string;
  mobile_number: string;
}

const useGetWorkshops = (
  pageNumber: number = 1,
  perPage: number = 10,
  search: string = "",
  sortColumn?: string,
  sortOrder?: string,
  workshop_manager_ids?: number[],
) => {
  const [workshops, setWorkshops] = useState<Workshop[]>();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWorkshops = async () => {
    const token = localStorage.getItem("authToken");
    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append("page_number", pageNumber.toString());
    if (perPage) queryParams.append("per_page", perPage.toString());
    if (search) queryParams.append("search", search);
    if (sortColumn) queryParams.append("sort_by", sortColumn);
    if (sortOrder) queryParams.append("order", sortOrder);
    if (workshop_manager_ids) {
      workshop_manager_ids.forEach((m) => queryParams.append("workshop_manager_ids", m.toString()));
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/workshops?${queryParams}`, {
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

      setWorkshops(data?.data?.workshops || []);
      setCount(data?.data?.count);
    } catch {
      toast.error("Network error: Failed to fetch workshops.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, [pageNumber, perPage, search, sortColumn, sortOrder, workshop_manager_ids]);

  return { workshops, count, loading, fetchWorkshops };
};

export default useGetWorkshops;
