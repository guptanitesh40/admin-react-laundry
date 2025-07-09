import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../utils/constant";

const useGetChooseUs = () => {
  const [chooseUsItems, setChooseUsItems] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchChooseUsItems = async () => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/why-choose-us`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to fetch Choose Us data", {
          position: "top-center",
        });
        return;
      }

      setChooseUsItems(data?.data || []);
    } catch (error: any) {
      toast.error(error?.message || "Network error: Failed to fetch.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChooseUsItems();
  }, []);

  return { chooseUsItems, loading, fetchChooseUsItems };
};

export default useGetChooseUs;
