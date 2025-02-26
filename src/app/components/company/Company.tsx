import React from "react";
import { useNavigate } from "react-router-dom";
import CompanyTable from "./CompanyTable";
import { usePermissions } from "../../hooks";

const Company: React.FC = () => {
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();

  const handleAddCompany = () => {
    navigate("/company/add");
  };

  return (
    <>
      <div className="container-fixed">
        <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-xl font-semibold leading-none text-gray-900">
              Company
            </h1>
          </div>

          {hasPermission(12, "create") && (
            <div className="flex items-center gap-2.5">
              <button onClick={handleAddCompany} className="btn btn-primary">
                <i className="ki-filled ki-plus-squared"></i>Add Company
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="container-fixed">
        <div className="grid gap-5 lg:gap-7.5">
          <div className="card card-grid min-w-full">
            <CompanyTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Company;
