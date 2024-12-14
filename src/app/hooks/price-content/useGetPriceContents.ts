import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

const useGetPriceContents = () => {
  const [priceContents, setPriceContents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPriceContents = async () => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/price-content`, {
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

      setPriceContents(data?.data);
    } catch (error: any) {
      toast.error("Network Error : Failed to fetch prices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPriceContents();
  }, []);

  return { priceContents, loading, fetchPriceContents };
};

export default useGetPriceContents;
