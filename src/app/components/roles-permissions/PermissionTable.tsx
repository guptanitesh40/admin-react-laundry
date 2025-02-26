import React, { useState, useEffect } from "react";
import TableShimmer from "../shimmer/TableShimmer";
import {
  useAssignRolePermission,
  useGetModulesData,
  useGetRolesPermissions,
} from "../../hooks";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

interface Permission {
  role_id: number;
  module_id: number;
  create: boolean;
  update: boolean;
  read: boolean;
  delete: boolean;
}

interface PermissionTableProps {
  isSave: boolean;
  setIsSave: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
}

const PermissionTable: React.FC<PermissionTableProps> = ({
  isSave,
  setIsSave,
  setIsLoading,
}) => {
  const { modulesData } = useGetModulesData();
  const { assignRolePermission, loading: assigning } = useAssignRolePermission();
  const { permissionsData, loading } = useGetRolesPermissions();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [initialPermissions, setInitialPermissions] = useState<Permission[]>([]);
  const location = useLocation();
  const roleId = location?.state?.role_id;

  useEffect(() => {
    setIsLoading(assigning);
  }, [assigning]);

  useEffect(() => {
    if (modulesData && permissionsData) {
      const mergedPermissions = permissionsData.map((perm: Permission) => ({
        ...perm,
      }));

      modulesData.forEach((module: any) => {
        const existingPermission = mergedPermissions.find(
          (p) => p.role_id === roleId && p.module_id === module.module_id
        );

        if (!existingPermission) {
          mergedPermissions.push({
            role_id: roleId,
            module_id: module.module_id,
            create: false,
            update: false,
            read: false,
            delete: false,
          });
        }
      });

      setPermissions(mergedPermissions);
      setInitialPermissions(JSON.parse(JSON.stringify(mergedPermissions))); 
    }
  }, [modulesData, permissionsData]);

  useEffect(() => {
    if (isSave) {
      const hasChanges = JSON.stringify(permissions) !== JSON.stringify(initialPermissions);
      if (!hasChanges) {
        setIsSave(false);
        return;
      }

      const savePermissions = async () => {
        try {
          const success = assignRolePermission(permissions);
          
          if (success) {
            setInitialPermissions(JSON.parse(JSON.stringify(permissions))); 
            setIsSave(false);
          }
        } catch (error) {
          toast.error("Failed to assign role permissions. Please try again.");
        }
      };
      savePermissions();
    }
  }, [isSave]);

  const handleCheckboxChange = (module_id: number, field: keyof Permission) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((perm) =>
        perm.role_id === roleId && perm.module_id === module_id
          ? {
              ...perm,
              [field]: !perm[field], 
              read:
                field === "read"
                  ? !perm.read 
                  : (field === "create" || field === "update" || field === "delete") &&
                    (!perm.read || (perm.create && perm.update && perm.delete))
                    ? true
                    : perm.read,
            }
          : perm
      )
    );
  };
  
  return (
    <div className="card-body">
      <div data-datatable="true" data-datatable-page-size="10">
        <div className="scrollable-x-auto">
          <table className="table table-auto table-border" data-datatable-table="true">
            <thead>
              <tr>
                <th className="min-w-[200px]">Modules</th>
                <th>Create</th>
                <th>Read</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            {loading ? (
              <TableShimmer />
            ) : modulesData && permissions.length > 0 ? (
              <tbody>
                {modulesData.map((module: any) => {
                  const permission = permissions.find(
                    (p) => p.role_id === roleId && p.module_id === module.module_id
                  );

                  return (
                    <tr key={module.module_id}>
                      <td>{module.module_name}</td>
                      {["create", "read", "update", "delete"].map((field) => (
                        <td key={field}>
                          <input
                            className="w-4 h-4"
                            type="checkbox"
                            checked={permission ? permission[field as keyof Permission] : false}
                            onChange={() =>
                              handleCheckboxChange(module.module_id, field as keyof Permission)
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={5} className="text-center">
                    No Modules Data Available
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default PermissionTable;