import { useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";

interface RolePermission {
  role_id: number;
  module_id: number;
  update: boolean;
  read: boolean;
  delete: boolean;
  role_permission_id: number;
}

const useAssignRolePermission = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const assignRolePermission = async (rolePermission: any) => {
    const token = localStorage.getItem("authToken");

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/role-permission/assign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify( {rolePermission} ),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return false;
      }

      toast.success(data.message);
      return true;
    } catch {
      toast.error("Fail to add assign permissions try again later");
    } finally {
      setLoading(false);
    }
  };

  return { assignRolePermission , loading };
};

export default useAssignRolePermission;
