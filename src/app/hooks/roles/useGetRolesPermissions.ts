import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";

interface PermissionData {
  role_id: number;
  module_id: number;
  create: boolean;
  update: boolean;
  read: boolean;
  delete: boolean;
}

const useGetRolesPermissions = () => {
  const [loading, setLoading] = useState<boolean>();
  const [permissionsData, setPermissionsData] = useState<PermissionData[]>();

  const fetchRolesPermissions = async () => {
    const token = localStorage.getItem("authToken");

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/role-permission`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        setLoading(false);
        return;
      }

      setPermissionsData(data?.data);
    } catch {
      toast.error("Network Error : Fail to fetch Role Permissions Data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRolesPermissions();
  }, []);

  return { permissionsData, fetchRolesPermissions, loading };
};

export default useGetRolesPermissions;
