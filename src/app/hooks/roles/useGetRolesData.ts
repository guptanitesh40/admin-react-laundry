import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";
const token = localStorage.getItem("authToken");

interface RolesData {
  role_id: number;
  name: string;
}

const useGetRolesData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [rolesData, setRolesData] = useState<RolesData[]>();

  const fetchRolesData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/roles?flag=true`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        setLoading(false);
        return;
      }

      setRolesData(data?.data);
    } catch {
      toast.error("Network error: Failed to fetch roles data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRolesData();
  }, []);

  return { rolesData, fetchRolesData, loading };
};

export default useGetRolesData;
