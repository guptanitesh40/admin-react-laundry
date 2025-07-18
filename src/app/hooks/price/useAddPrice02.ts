import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

interface PriceItem {
  category_id: number;
  product_id: number;
  service_id: number;
  price: number;
}

const useAddPrice02 = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const addPrice = async (priceList: PriceItem[]) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("Auth token not found", { position: "top-center" });
      return false;
    }

    if (priceList.length === 0) {
      toast.error("No price data provided", { position: "top-center" });
      return false;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/prices`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prices: priceList }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to add prices", {
          position: "top-center",
        });
        return false;
      }

      toast.success(result.message || "Prices added successfully", {
        position: "top-center",
      });

      return true;
    } catch (error: any) {
      if (
        error.name === "TypeError" &&
        error.message.includes("Failed to fetch")
      ) {
        toast.error("Network error: Failed to fetch.", {
          position: "top-center",
        });
      } else {
        toast.error("An unexpected error occurred.", {
          position: "top-center",
        });
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addPrice, loading };
};

export default useAddPrice02;
