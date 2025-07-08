import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../utils/constant";

const useGetOurServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchOurServices = async () => {
    const token = localStorage.getItem("authToken");
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/services-list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        return;
      }

      //   setBanners(data?.data?.banner || []);
      setServices(data?.data || []);
    } catch (error: any) {
      toast.error(error?.message || "Network error: Failed to fetch.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOurServices();
  }, []);

  return { services, loading, fetchOurServices };
};

export default useGetOurServices;
