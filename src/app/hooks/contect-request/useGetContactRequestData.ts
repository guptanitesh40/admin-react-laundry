import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";

interface ContactRequestData {
  created_at: any;
  contact_us_id: number;
  full_name: string;
  email: string;
  mobile_number: any;
  message: string;
}

const useGetContactRequestData = (
  pageNumber: number = 1,
  perPage: number = 10,
  search: string = "",
  sortColumn?: string,
  sortOrder?: string
) => {
  const [contactRequestData, setContactRequestData] =
    useState<ContactRequestData[]>();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchContactRequestData = async () => {
    const token = localStorage.getItem("authToken");

    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append("page_number", pageNumber.toString());
    if (perPage) queryParams.append("per_page", perPage.toString());
    if (search) queryParams.append("search", search);
    if (sortColumn) queryParams.append("sort_by", sortColumn);
    if (sortOrder) queryParams.append("order", sortOrder);

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/contact-us?${queryParams}`, {
        method: "GET",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        setLoading(false);
        return;
      }

      setContactRequestData(data?.data?.result);
      setCount(data?.data?.count);
    } catch {
      toast.error("Network Error: Failt to  fetch contect request data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactRequestData();
  }, [pageNumber, perPage, search, sortColumn, sortOrder]);

  return { contactRequestData, count, fetchContactRequestData, loading };
};

export default useGetContactRequestData;
