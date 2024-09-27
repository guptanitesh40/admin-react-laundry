import { useCallback, useEffect, useState } from "react";
import toast, { Toast } from "react-hot-toast";

const GET_BANNER_URL = `${import.meta.env.VITE_BASE_URL}/admin/banners`;
const token = localStorage.getItem("authToken");

interface Banner {
  banner_id: number;
  title: string;
  description: string;
  image: string;
}

const useGetBanner = (
  pageNumber: number = 1,
  perPage: number = 10,
  search: string = "",
  sortColumn?: string,
  sortOrder?: string
) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [totalBanners, setTotalBanners] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBanners = useCallback(async () => {
    setLoading(true);

    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append("page_number", pageNumber.toString());
    if (perPage) queryParams.append("per_page", perPage.toString());
    if (search) queryParams.append("search", search);
    if (sortColumn) queryParams.append("sort_by", sortColumn);
    if (sortOrder) queryParams.append("order", sortOrder);

    try {
      const response = await fetch(`${GET_BANNER_URL}?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, { position: "top-center" });
        return;
      }

      const data = await response.json();
      const allBanners = data?.data?.banner || [];
      const totalCount = data?.data?.count || 0;

      setBanners(allBanners);
      setTotalBanners(totalCount);
    } catch (error: any) {
      toast.error(error?.message || "Network error: Failed to fetch.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }, [pageNumber, perPage, sortOrder, sortColumn, search]);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  return { banners, totalBanners, loading, fetchBanners };
};

export default useGetBanner;
