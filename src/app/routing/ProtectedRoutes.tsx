import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  moduleId: number; 
  action: "read" | "create" | "update" | "delete";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ moduleId, action }) => {
  const permissions = useSelector((state: any) => state.auth.permissions|| []);

  const modulePermission = permissions.find((perm: any) => perm.module_id === moduleId);

  console.log("modulePermission", modulePermission);
  console.log("modulePermission[action]", modulePermission[action]);


  if (!modulePermission || !modulePermission[action]) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
