import { useEffect, useState } from "react";
import toast, { Toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

const useGetBanners = (
  pageNumber: number = 1,
  perPage: number = 10,
  search: string = "",
  sortColumn?: string,
  sortOrder?: string,
  banner_types?: number
) => {
  const [banners, setBanners] = useState([]);
  const [totalBanners, setTotalBanners] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBanners = async () => {
    const token = localStorage.getItem("authToken");
    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append("page_number", pageNumber.toString());
    if (perPage) queryParams.append("per_page", perPage.toString());
    if (search) queryParams.append("search", search);
    if (sortColumn) queryParams.append("sort_by", sortColumn);
    if (sortOrder) queryParams.append("order", sortOrder);
    if (banner_types) queryParams.append("banner_types", banner_types.toString());


    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/admin/banners?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        return;
      }

      setBanners(data?.data?.banner || []);
      setTotalBanners(data?.data?.count || 0);
    } catch (error: any) {
      toast.error(error?.message || "Network error: Failed to fetch.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBanners();
  }, [pageNumber, perPage, search, sortColumn, sortOrder, banner_types]);

  return { banners, totalBanners, loading, fetchBanners };
};

export default useGetBanners;
