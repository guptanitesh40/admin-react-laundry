import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

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
      const response = await fetch(`${BASE_URL}/prices`, {
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
