import { useState } from "react";
import toast from "react-hot-toast";

interface Workshop {
  workshopManagerMappings: any[];
  workshop_id: number;
  workshop_manager_name: string;
  workshop_name: string;
  email: string;
  address: string;
  mobile_number: string;
}

const useGetWorkShop = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [workshop, setWorkshop] = useState<Workshop | null>(null);

  const fetchWorkshop = async (workshop_id: number) => {
    if (!workshop_id) {
      setWorkshop(null);
      return;
    }

    const token = localStorage.getItem("authToken");
    const GET_WORKSHOP_URL = `${import.meta.env.VITE_BASE_URL}/workshops/${workshop_id}`;

    setLoading(true);

    try {
      const response = await fetch(GET_WORKSHOP_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        setLoading(false);
        return;
      }

      setWorkshop(data?.data?.result);
    } catch {
      toast.error("Network error: Failed to fetch workshops.");
    } finally {
      setLoading(false);
    }
  };
  return { workshop, loading, fetchWorkshop }
};

export default useGetWorkShop;