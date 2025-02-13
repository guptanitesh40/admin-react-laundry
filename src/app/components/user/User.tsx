import React, { useState } from "react";
import UserTable from "./UserTable";
import { useNavigate } from "react-router-dom";
import { RiFilterFill, RiFilterOffFill } from "react-icons/ri";
import UserFilter from "./UserFilter";

const User: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<boolean>(false);

  const [filters, setFilters] = useState({
      genderFilter: [] as number[],
      roleFilter: [] as number[],
      companyFilter: [] as number[],
      branchFilter: [] as number[],
    });

  const handleAddUser = () => {
    navigate("/user/add");
  };

  const updateFilters = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <>
      <div className="container-fixed">
        <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-xl font-semibold leading-none text-gray-900">
              Internal User
            </h1>
          </div>
          <div className="flex items-center gap-2.5">
            <button onClick={handleAddUser} className="btn btn-primary">
              <i className="ki-filled ki-plus-squared"></i>Add User
            </button>
          </div>
        </div>
        
        <div className="flex flex-auto items-center gap-2.5 mb-4 shadow-none">
          <button
            className="btn btn-sm btn-primary shadow-none"
            onClick={() => setFilter(!filter)}
          >
            Filters
            {filter ? (
              <RiFilterFill size={23} />
            ) : (
              <RiFilterOffFill color="skyblue" size={23} />
            )}
          </button>
        </div>
      </div>

      <div className="container-fixed">
        <div className="grid gap-5 lg:gap-7.5">
          <div className="card card-grid min-w-full">
            {filter && (
              <UserFilter
                filters={filters}
                updateFilters={updateFilters}
              />
            )}{" "}
            <UserTable filters={filters} />
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
