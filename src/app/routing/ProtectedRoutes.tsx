import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  moduleId?: number; 
  moduleIds?: number[]; 
  action: "read" | "create" | "update" | "delete";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ moduleId, moduleIds, action }) => {
  const permissions = useSelector((state: any) => state.auth.permissions || []);
  const roleId = useSelector((state: any) => state.auth.role_id);

  if (roleId === 1) {
    return <Outlet />;
  }

  let hasPermission = false;

  if (moduleId) {
    const modulePermission = permissions.find((perm: any) => perm.module_id === moduleId);
    hasPermission = modulePermission && modulePermission[action];
  } else if (moduleIds) {
    hasPermission = moduleIds.some((id) => {
      const modulePermission = permissions.find((perm: any) => perm.module_id === id);
      return modulePermission && modulePermission[action];
    });
  }

  if (!hasPermission) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
