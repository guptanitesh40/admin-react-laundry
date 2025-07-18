import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

interface Price {
  [key: string]: any;
}

interface FetchParams {
  per_page?: number;
  page_number?: number;
  search?: string;
  sort_by?: string;
  order?: "ASC" | "DESC" | "";
}

const useGetPrice02 = () => {
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);

  const fetchPrices = async ({
    per_page = 10,
    page_number = 1,
    search = "",
    sort_by = "",
    order = "",
  }: FetchParams = {}) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("Auth token not found", { position: "top-center" });
      setLoading(false);
      return;
    }

    setLoading(true);

    const queryParams = new URLSearchParams({
      per_page: String(per_page),
      page_number: String(page_number),
    });

    if (search) queryParams.append("search", search);
    if (sort_by) queryParams.append("sort_by", sort_by);
    if (order) queryParams.append("order", order);

    try {
      const response = await fetch(`${BASE_URL}/prices?${queryParams}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to fetch prices", {
          position: "top-center",
        });
        return;
      }

      const data = await response.json();
      setPrices(data?.data?.items || []);
      setCount(data?.data?.count || 0);
    } catch {
      toast.error("Network error: Failed to fetch prices", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchPrices();
  }, []);

  return { prices, loading, count, fetchPrices };
};

export default useGetPrice02;
