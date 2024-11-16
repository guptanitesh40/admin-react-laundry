import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";

const GET_PRICE_URL = `${import.meta.env.VITE_BASE_URL}/prices`;

interface Price {
  [key: string]: any;
}

const useGetPrice = () => {
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPrices = async () => {
    const token = localStorage.getItem("authToken");

    setLoading(true);
    try {
      const response = await fetch(GET_PRICE_URL, {
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
      setPrices(data?.data || []);
    } catch (error) {
      toast.error("Network error: Failed to fetch.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return { prices, loading, fetchPrices };
};

export default useGetPrice;
