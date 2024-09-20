import { useCallback, useEffect, useState } from "react";
import toast, { Toast } from "react-hot-toast";

const GET_BANNER_URL = `${import.meta.env.VITE_BASE_URL}/admin/banners`;

interface Banner {
  banner_id:number;
  title: string;
  description: string; 
  image: string;
}

const useGetBanner = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [banners, setBanners] = useState<Banner[]>([]);

  const fetchBanner = useCallback(async () => {
    const token = localStorage.getItem("authToken");

    setLoading(true);

    try {
      const response = await fetch(GET_BANNER_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, { position: "top-center" });
        return;
      }

      const data = await response.json();
      setBanners(data?.data?.banner);

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
    fetchBanner();
  }, [fetchBanner]);

  return { banners,loading, refetch:fetchBanner };
};

export default useGetBanner;
