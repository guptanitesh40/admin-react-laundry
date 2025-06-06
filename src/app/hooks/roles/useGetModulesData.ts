import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";

interface ModuleData {
  module_id: number;
  module_name: string;
}

const useGetModulesData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [modulesData, setModulesData] = useState<ModuleData[]>();

  const fetchModulesData = async () => {
    const token = localStorage.getItem("authToken");

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/modules`, {
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
