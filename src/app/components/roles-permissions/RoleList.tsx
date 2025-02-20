import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RoleList: React.FC = () => {

  const navigate = useNavigate();

  const handleEditPermissions = (role_id: number) => {
    navigate("/user-permissions", {state: { role_id }})
  }


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
            <tbody>
              <tr>
                <td>Sub Admin</td>
                <td>
                  <div className="flex justify-self-center gap-2.5">
                    <button
                      className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                      aria-label="Edit"
                      onClick={() => handleEditPermissions(2)}
                    >
                      <FaPencilAlt className="text-yellow-600" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Branch Manager</td>
                <td>
                  <div className="flex justify-self-center gap-2.5">
                    <button
                      className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                      aria-label="Edit"
                      onClick={() => handleEditPermissions(3)}
                    >
                      <FaPencilAlt className="text-yellow-600" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Workshop Manager</td>
                <td>
                  <div className="flex justify-self-center gap-2.5">
                    <button
                      className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                      aria-label="Edit"
                      onClick={() => handleEditPermissions(6)}
                    >
                      <FaPencilAlt className="text-yellow-600" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoleList;
