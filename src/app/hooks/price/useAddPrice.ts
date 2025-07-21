import { useState } from "react";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

interface PriceRecord {
  category_id: number;
  product_id: number;
  service_id: number;
  price: number;
}

const useAddPrice = () => {
  const [loading, setLoading] = useState(false);

  const addPrices = async (records: PriceRecord[]) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Auth token not found");
      return;
    }

    if (records.length === 0) {
      toast("No prices to update");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/prices`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prices: records }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add prices");
      }

      toast.success("Prices added successfully");
      return data;
    } catch (error: any) {
      toast.error(error.message || "Failed to added prices");
    } finally {
      setLoading(false);
    }
  };

  return { addPrices, loading };
};

export default useAddPrice;
