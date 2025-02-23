import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";
const token = localStorage.getItem("authToken");

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
        toast.error(data.message, { position: "top-center" });
        setLoading(false);
        return;
      }

      setPermissionsData(data?.data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRolesPermissions();
  }, [])

  return { permissionsData, fetchRolesPermissions, loading };
};

export default useGetRolesPermissions;
