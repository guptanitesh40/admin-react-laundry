import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetBranch } from "../../hooks";
import ProfileShimmer01 from "../shimmer/ProfileShimmer";

interface Branch {
  branch_id: number;
  branch_name: string;
  branch_address: string;
  branch_manager: string;
  branch_phone_number: string;
  branch_email: string;
  branch_registration_number: string;
  company_id: number;
}

const BranchProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { branches, loading } = useGetBranch();
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  useEffect(() => {
    if (branches.length > 0 && id) {
      const branch = branches.find(
        (bran) => bran.branch_id === parseInt(id)
      );
      setSelectedBranch(branch || null);
    }
  }, [branches, id]);

  if (loading) {
    return <ProfileShimmer01 />;
  }

  if (!selectedBranch) {
    return <p className="text-gray-600">No Branch data available</p>;
  }

  return (
    <div className="container-fixed">    
    <div className="card w-[50%]">
      <div className="card-header">
        <h3 className="card-title">{selectedBranch.branch_name}</h3>
      </div>
      <div className="card-body pt-3.5 pb-3.5">
        <table className="table-auto">
          <tbody>
            <tr>
              <td className="text-sm font-medium text-gray-500 pb-3 pe-4 lg:pe-10">
                Address:
              </td>
              <td className="text-sm font-medium text-gray-800 pb-3">
                {selectedBranch.branch_address}
              </td>
            </tr>
            <tr>
              <td className="text-sm font-medium text-gray-500 pb-3 pe-4 lg:pe-10">
                Manager:
              </td>
              <td className="text-sm font-medium text-gray-800 pb-3">
                {selectedBranch.branch_manager}
              </td>
            </tr>
            <tr>
              <td className="text-sm font-medium text-gray-500 pb-3 pe-4 lg:pe-10">
                Phone:
              </td>
              <td className="text-sm font-medium text-gray-800 pb-3">
                {selectedBranch.branch_phone_number}
              </td>
            </tr>
            <tr>
              <td className="text-sm font-medium text-gray-500 pb-3 pe-4 lg:pe-10">
                Email:
              </td>
              <td className="text-sm font-medium text-gray-800 pb-3">
                {selectedBranch.branch_email}
              </td>
            </tr>
            <tr>
              <td className="text-sm font-medium text-gray-500 pb-3 pe-4 lg:pe-10">
                Registration Number:
              </td>
              <td className="text-sm font-medium text-gray-800 pb-3">
                {selectedBranch.branch_registration_number}
              </td>
            </tr>
            <tr>
              <td className="text-sm font-medium text-gray-500 pb-3 pe-4 lg:pe-10">
                Company ID:
              </td>
              <td className="text-sm font-medium text-gray-800 pb-3">
                {selectedBranch.company_id}
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
