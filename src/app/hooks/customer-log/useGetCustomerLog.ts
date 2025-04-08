import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";

interface CustomerLogData {
  created_at: string;
  login_id: number;
  user: any;
  type: string;
}

const useGetCustomerLog = (
  pageNumber: number = 1,
  perPage: number = 10,
  search: string = "",
  sortColumn?: string,
  sortOrder?: string
) => {
  const [customerLogData, setcustomerLogData] = useState<CustomerLogData[]>();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCustomerLog = async () => {
    const token = localStorage.getItem("authToken");

    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append("page_number", pageNumber.toString());
    if (perPage) queryParams.append("per_page", perPage.toString());
    if (search) queryParams.append("search", search);
    if (sortColumn) queryParams.append("sort_by", sortColumn);
    if (sortOrder) queryParams.append("order", sortOrder);

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/user/login-logs?${queryParams}`,
        {
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        setLoading(false);
      }

      setcustomerLogData(data?.data?.userLogs || []);
      setCount(data?.data?.count);
    } catch {
      toast.error("Network Error: Failed to fetch customer log data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerLog();
  }, [pageNumber, perPage, search, sortColumn, sortOrder]);

  return { customerLogData, count, fetchCustomerLog, loading };
};

export default useGetCustomerLog;
