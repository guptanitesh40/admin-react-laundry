import React, { useEffect } from "react";
import { useGetBranchesOnId } from "../../hooks";
import { useNavigate } from "react-router-dom";

interface BranchesProps {
  company_id: number;
}

const Branches: React.FC<BranchesProps> = ({ company_id }) => {

  const { branches, fetchBranchesOnId } = useGetBranchesOnId();

  const navigate = useNavigate();
  
  useEffect(() => {
    fetchBranchesOnId(company_id);
  }, [company_id]);

  if(!branches) return;

  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
        <div className="col-span-2">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            <div className="card min-w-full">
              <div className="card-header">
                <h3 className="card-title">Branches</h3>
              </div>

              <div className="card-table scrollable-x-auto pb-3">
                <table
                  className="table align-middle text-sm text-gray-500"
                  id="general_info_table"
                >
                  <thead>
                    <tr>
                      <th className="min-w-56">Branch Name</th>
                      <th className="min-w-48 w-full text-gray-700">Branch Address</th>
                      <th className="min-w-16 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branches.length > 0 ? (
                      branches.map((branch: any) => (
                        <tr key={branch.branch_id}> 
                          <td className="min-w-56">{branch.branch_name}</td>
                          <td className="min-w-48 w-full text-gray-700">{branch.branch_address}</td>
                          <td className="min-w-16 text-center">
                            <span 
                            className="btn btn-sm"
                            onClick={() =>
                                navigate(`/branch-profile/${branch.branch_id}`)
                              }
                            >
                              <i className="ki-filled ki-search-list"></i>
                              View
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="text-center text-gray-700">No Branches Available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branches;
