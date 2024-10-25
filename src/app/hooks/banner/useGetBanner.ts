import { useState } from "react";
import toast from "react-hot-toast";

interface Banner {
  banner_id: number;
  title: string;
  description: string;
  image: string;
  banner_type: number;
}

const useGetBanner = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [banner, setBanner] = useState<Banner | null>(null);

    const fetchBanner = async (banner_id: number) => {
      if (!banner_id) {
        setBanner(null);
        return;
      }

      const token = localStorage.getItem("authToken");
      const GET_BANNER_URL = `${import.meta.env.VITE_BASE_URL}/admin/banners/${banner_id}`;

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
          setLoading(false);
          return;
        }

        const data = await response.json();
        setBanner(data?.data?.banner);
      } catch (error) {
        toast.error("Network error: Failed to fetch.");
      } finally {
        setLoading(false);
      }
    };

  return { banner, loading, fetchBanner };
};

export default useGetBanner;
