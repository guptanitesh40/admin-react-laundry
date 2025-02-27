import { useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";

interface UserPermissions {
  role_permission_id: number;
  role_id: number;
  module_id: number;
  create: boolean;
  update: boolean;
  read: boolean;
  delete: boolean;
}

const useGetUserPermissions = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userPermissions, setUserPermissions] = useState<UserPermissions | null>(null);

  const fetchUserPermissions = async (token: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/role-permission/list`, {
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

      setUserPermissions(data?.data);
      return data?.data;      
    } catch (error) {
      toast.error("Network Error: Fail to fetch User Permissions");
    } finally {
      setLoading(false);
    }
  };

  return { userPermissions, fetchUserPermissions, loading };
};

export default useGetUserPermissions;
