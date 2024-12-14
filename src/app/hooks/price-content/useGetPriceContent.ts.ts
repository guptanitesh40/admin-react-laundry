import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

interface PriceContent {
  category_name: string;
  service_names: any[];
  price: number;
}

const useGetPriceContent = () => {
  const [priceContent, setPriceContent] = useState<PriceContent | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPriceContent = async (price_content_id: number) => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/price-content/${price_content_id}`, {
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

      setPriceContent(data?.data);
    } catch (error: any) {
      toast.error("Network Error : Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return { priceContent, loading, fetchPriceContent };
};

export default useGetPriceContent;
