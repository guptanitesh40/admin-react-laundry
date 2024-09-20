import React from "react";

interface ContactDetailProps {
  company: any;
}

const ContactDetail: React.FC<ContactDetailProps> = ({ company }) => {
  return (
    <div className="col-span-1">
      <div className="card min-w-full">

        <div className="card-header">
          <h3 className="card-title">Contact Info</h3>
        </div>

        <div className="card-table scrollable-x-auto pb-3">
          <table className="table align-middle text-sm text-gray-500">
            <tbody>
            <tr>
              <td className="py-2">Phone Number</td>
              <td className="py-2 text-gray-700">{company.phone_number}</td>
            </tr>
            <tr>
              <td className="py-2">Mobile Number</td>
              <td className="py-2 text-gray-700">{company.mobile_number}</td>
            </tr>
            <tr>
              <td className="py-2">Email</td>
              <td className="py-2 text-gray-700">{company.email}</td>
            </tr>
            <tr>
              <td className="py-2">Website</td>
              <td className="py-2 text-gray-700">
                <a href={company.website} target="_blank" rel="noopener noreferrer">
                  {company.website}
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default ContactDetail;
