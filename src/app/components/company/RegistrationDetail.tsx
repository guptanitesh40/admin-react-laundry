import React from "react";
import dayjs from "dayjs";

interface RegistrationDetailProps {
  company: any;
}

const RegistrationDetail: React.FC<RegistrationDetailProps> = ({ company }) => {
  const formattedRegistrationDate = dayjs(company.registration_date).format("MM-DD-YYYY");

  return (
    <div className="col-span-1">
      <div className="card min-w-full">
        <div className="card-header">
          <h3 className="card-title">Registration Info</h3>
        </div>

        <div className="card-table scrollable-x-auto pb-3">
          <table className="table align-middle text-sm text-gray-500">
            <tbody>
              <tr>
                <td className="py-2">Registration Number</td>
                <td className="py-2 text-gray-700">{company.registration_number}</td>
              </tr>
              <tr>
                <td className="py-2">Registration Date</td>
                <td className="py-2 text-gray-700">
                  {formattedRegistrationDate}
                </td>
              </tr>
              <tr>
                <td className="py-2">GSTIN</td>
                <td className="py-2 text-gray-700">{company.gstin}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDetail;
