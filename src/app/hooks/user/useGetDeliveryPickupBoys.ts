import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetDeliveryPickupBoys = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<any | null>(null);

  const fetchDeliveryPickupBoys = async (search: string = "") => {
    const role_id = 4;
    const token = localStorage.getItem("authToken");

    const GET_USER_URL = `${
      import.meta.env.VITE_BASE_URL
    }/user/by-role?role_id=${role_id}`;

    const queryParams = new URLSearchParams();
    if (search) queryParams.append("search", search);

    try {
      setLoading(true);
      const response = await fetch(`${GET_USER_URL}&${queryParams}`, {
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
      setUsers(data?.data);
    } catch (error: any) {
      toast.error(error?.message || "Network error: Failed to fetch.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveryPickupBoys();
  }, []);

  return { users, loading, fetchDeliveryPickupBoys };
};

export default useGetDeliveryPickupBoys;
