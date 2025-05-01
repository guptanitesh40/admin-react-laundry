import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

const useGetPrices02 = () => {
  const fetchPrices02 = async () => {
    const token = localStorage.getItem("authToken");

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
        return null;
      }

      const data = await response.json();
      return data?.data || [];
    } catch (error) {
      toast.error("Network error: Failed to fetch.");
      return null;
    }
  };

  return { fetchPrices02 };
};

export default useGetPrices02;
