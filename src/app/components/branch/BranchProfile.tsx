import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileShimmer01 from "../shimmer/ProfileShimmer";
import { useGetBranch } from "../../hooks";

interface Branch {
  branch_id: number;
  branch_name: string;
  branch_address: string;
  branch_manager_id: string;
  branch_phone_number: string;
  branch_mobile_number: string;
  branch_email: string;
  branch_registration_number: string;
  company_id: number;
}

const BranchProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const branch_id = Number(id);

  const { branch, fetchBranch, loading } = useGetBranch();

  useEffect(() => {
    fetchBranch(branch_id);
  }, [branch_id]);

  if (loading) {
    return <ProfileShimmer01 />;
  }

  if (!branch) return null;

  return (
    <div className="container-fixed">
      <div className="card w-[50%]">
        <div className="card-header">
          <h3 className="card-title">{branch.branch_name}</h3>
        </div>
        <div className="card-body pt-3.5 pb-3.5">
          <table className="table-auto">
            <tbody>
              <tr>
                <td className="text-sm font-medium text-gray-500 pb-3 pe-4 lg:pe-10">
                  Address:
                </td>
                <td className="text-sm font-medium text-gray-800 pb-3">
                  {branch.branch_address}
                </td>
              </tr>
              <tr>
                <td className="text-sm font-medium text-gray-500 pb-3 pe-4 lg:pe-10">
                  Manager:
                </td>
                <td className="text-sm font-medium text-gray-800 pb-3">
                  {branch.branchManager.first_name}{" "}
                  {branch.branchManager.last_name}
                </td>
              </tr>
              <tr>
                <td className="text-sm font-medium text-gray-500 pb-3 pe-4 lg:pe-10">
                  Phone no 1:
                </td>
                <td className="text-sm font-medium text-gray-800 pb-3">
                  {branch.branch_phone_number}
                </td>
              </tr>
              <tr>
                <td className="text-sm font-medium text-gray-500 pb-3 pe-4 lg:pe-10">
                  Phone no 2:
                </td>
                <td className="text-sm font-medium text-gray-800 pb-3">
                  {branch.branch_mobile_number}
                </td>
              </tr>
              <tr>
                <td className="text-sm font-medium text-gray-500 pb-3 pe-4 lg:pe-10">
                  Email:
                </td>
                <td className="text-sm font-medium text-gray-800 pb-3">
                  {branch.branch_email}
                </td>
              </tr>
              <tr>
                <td className="text-sm font-medium text-gray-500 pb-3 pe-4 lg:pe-10">
                  Registration Number:
                </td>
                <td className="text-sm font-medium text-gray-800 pb-3">
                  {branch.branch_registration_number}
                </td>
              </tr>
              <tr>
                <td className="text-sm font-medium text-gray-500 pb-3 pe-4 lg:pe-10">
                  Company :
                </td>
                <td className="text-sm font-medium text-gray-800 pb-3">
                  {branch.company.company_name}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BranchProfile;
