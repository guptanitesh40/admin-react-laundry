import React from "react";

interface CompanyDetailProps {
  company: any;
}

const CompanyDetail: React.FC<CompanyDetailProps> = ({ company }) => {
  return (
    <div className="col-span-1">
      <div className="card min-w-full">
        <div className="card-header">
          <h3 className="card-title">Company Info</h3>
        </div>

        <div className="card-table scrollable-x-auto pb-3">
          <table className="table align-middle text-sm text-gray-500">
            <tbody> 
              <tr>
                <td className="py-2">Company Name</td>
                <td className="py-2 text-gray-700">{company.company_name}</td>
              </tr>
              <tr>
                <td className="py-2">Company Owner</td>
                <td className="py-2 text-gray-700">{company.company_owner_name}</td>
              </tr>
              <tr>
                <td className="py-2">No of Owner</td>
                <td className="py-2 text-gray-700">{company.company_ownedby}</td>
              </tr>
              <tr>
                <td className="py-2">Address</td>
                <td className="py-2 text-gray-700">{company.address}</td>
              </tr>
              <tr>
                <td className="py-2">City</td>
                <td className="py-2 text-gray-700">{company.city}</td>
              </tr>
              <tr>
                <td className="py-2">State</td>
                <td className="py-2 text-gray-700">{company.state}</td>
              </tr>
              <tr>
                <td className="py-2">Zip Code</td>
                <td className="py-2 text-gray-700">{company.zip_code}</td>
              </tr>
            </tbody> 
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
