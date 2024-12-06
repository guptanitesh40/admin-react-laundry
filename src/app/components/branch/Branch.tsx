import React from "react";
import { useNavigate } from "react-router-dom";
import BranchTable from "./BranchTable";

const Branch: React.FC = () => {
  const navigate = useNavigate();

  const handleAddBranch = () => {
    navigate("/branch/add");
  };

  return (
    <>
      <div className="container-fixed">
        <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-xl font-semibold leading-none text-gray-900">
              Branch
            </h1>
          </div>
          <div className="flex items-center gap-2.5">
            <button onClick={handleAddBranch} className="btn btn-primary">
              <i className="ki-filled ki-plus-squared"></i>Add Branch
            </button>
          </div>
        </div>
      </div>

      <div className="container-fixed">
        <div className="grid gap-5 lg:gap-7.5">
          <div className="card card-grid min-w-full">
            <BranchTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Branch;
