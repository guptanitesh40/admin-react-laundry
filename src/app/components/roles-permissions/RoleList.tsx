import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetRolesData } from "../../hooks";
import TableShimmer from "../shimmer/TableShimmer";

const RoleList: React.FC = () => {
  const { rolesData, loading } = useGetRolesData();

  const navigate = useNavigate();

  const handleEditPermissions = (role: string) => {
    navigate("/user-permissions", { state: { role } });
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
                <th className="min-w-[600px]">Roles</th>
                <th>Actions</th>
              </tr>
            </thead>
            {loading ? (
              <TableShimmer />
            ) : rolesData ? (
              <tbody>
                {rolesData.map((role) => (
                  <tr key={role.role_id}>
                    <td>{role.name}</td>
                    <td>
                      <div className="flex justify-self-center gap-2.5">
                        <button
                          className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                          aria-label="Edit"
                          onClick={() => handleEditPermissions(role.name)}
                        >
                          <FaPencilAlt className="text-yellow-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={6} className="text-center">
                    No Roles data available
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

export default RoleList;
