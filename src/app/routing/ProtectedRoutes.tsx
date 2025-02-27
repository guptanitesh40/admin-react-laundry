import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  moduleId: number;
  action: "read" | "create" | "update" | "delete";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  moduleId,
  action,
}) => {
  const permissions = useSelector((state: any) => state.auth.permissions || []);
  const roleId = useSelector((state: any) => state.auth.role_id);

  if (roleId === 1) {
    return <Outlet />;
  }

  const modulePermission = permissions.find(
    (perm: any) => perm.module_id === moduleId
  );

  if (!modulePermission || !modulePermission[action]) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
