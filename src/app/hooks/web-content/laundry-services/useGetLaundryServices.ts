import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../utils/constant";

const useGetLaundryServices = () => {
  const [laundryServices, setLaundryServices] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchLaundryServices = async () => {
    const token = localStorage.getItem("authToken");
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/laundry-services`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to fetch laundry services", {
          position: "top-center",
        });
        return;
      }

      setLaundryServices(data?.data || []);
    } catch (error: any) {
      toast.error(error?.message || "Network error: Failed to fetch.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaundryServices();
  }, []);

  return { laundryServices, loading, fetchLaundryServices };
};

export default useGetLaundryServices;
