import React from "react";
import TableShimmer from "../shimmer/TableShimmer";
import { useGetModulesData } from "../../hooks";

const PermissionTable: React.FC = () => {
  const { modulesData, loading } = useGetModulesData();

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
            ) : modulesData ? (
              <tbody>
                {modulesData.map((module: any) => (
                  <tr key={module.module_id}>
                    <td>{module.module_name}</td>
                    <td>
                    <input className="order-2 w-4 h-4" name="check" type="checkbox" value="1"/>                    
                    </td>
                    <td>
                      <input className="order-2 w-4 h-4" name="check" type="checkbox" value="1"/>
                    </td>
                    <td>
                      <input className="order-2 w-4 h-4" name="check" type="checkbox" value="1"/>
                    </td>
                    <td>
                      <input className="order-2 w-4 h-4" name="check" type="checkbox" value="1"/>
                    </td>                    
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={6} className="text-center">
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
