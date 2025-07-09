import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../utils/constant";

const useGetLaundryBenefits = () => {
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchLaundryBenefits = async () => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/benefits`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to fetch benefits", {
          position: "top-center",
        });
        return;
      }

      setBenefits(data?.data || []);
    } catch (error: any) {
      toast.error(error?.message || "Network error: Failed to fetch.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaundryBenefits();
  }, []);

  return { benefits, loading, fetchLaundryBenefits };
};

export default useGetLaundryBenefits;
