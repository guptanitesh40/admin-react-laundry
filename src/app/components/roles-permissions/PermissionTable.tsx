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
  const { assignRolePermission, loading: assigning } =
    useAssignRolePermission();
  const { permissionsData, loading } = useGetRolesPermissions();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const location = useLocation();
  const roleId = location?.state?.role_id;

  useEffect(() => {
    if (assigning) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [assigning]);

  useEffect(() => {
    if (modulesData && permissionsData) {
      const mergedPermissions = modulesData.map((module: any) => {
        const existingPermission = permissionsData.find(
          (p) => p.module_id === module.module_id
        );
        return (
          existingPermission || {
            role_id: roleId,
            module_id: module.module_id,
            create: false,
            update: false,
            read: false,
            delete: false,
          }
        );
      });
      setPermissions(mergedPermissions);
    }
  }, [modulesData, permissionsData]);

  useEffect(() => {
    if (isSave) {
      const savePermissions = async () => {
        try {
          const success = assignRolePermission(permissions);
          if (success) {
            setIsSave(false);
          }
        } catch (error) {
          toast.error("Failed to assign role permissions. Please try again.");
        }
      };
      savePermissions();
    }
  }, [isSave]);

  const handleCheckboxChange = (role_id: number, module_id: number, field: keyof Permission) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((perm) =>
        perm.module_id === module_id
          ? {
              ...perm,
              [field]: !perm[field],
              read: field !== "read" ? true : !perm.read,
            }
          : perm
      )
    );
  };

  return (
    <div className="card-body">
      <div data-datatable="true" data-datatable-page-size="10">
        <div className="scrollable-x-auto">
          <table
            className="table table-auto table-border"
            data-datatable-table="true"
          >
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
                    (p) => p.module_id === module.module_id
                  );
                  return (
                    <tr key={module.module_id}>
                      <td>{module.module_name}</td>
                      {["create", "read", "update", "delete"].map((field) => (
                        <td key={field}>
                          <input
                            className="w-4 h-4"
                            type="checkbox"
                            checked={
                              permission
                                ? permission[field as keyof Permission]
                                : false
                            }
                            onChange={() =>
                              handleCheckboxChange(
                                role_id: module.role_id,
                                module.module_id,
                                field as keyof Permission
                              )
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
