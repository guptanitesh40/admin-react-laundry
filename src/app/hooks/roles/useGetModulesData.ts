import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";
const token = localStorage.getItem("authToken");

interface moduleData {
  [x: string]: any;
  module_id: number;
  module_name: string;
}

const useGetModulesData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [modulesData, setModulesData] = useState<moduleData>();

  const fetchModulesData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/modules`, {
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

      setModulesData(data?.data);
    } catch {
        toast.error("Network error: Failed to fetch modules data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModulesData();
  }, [])
  return { modulesData, fetchModulesData, loading };
};

export default useGetModulesData;
