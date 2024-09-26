import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CompanyTable from "./CompanyTable";
import { useGetCompany } from "../../hooks";

interface Company {
  company_id: number;
  company_name: string;
  address: string;
  logo: string;
}

const Company: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const navigate = useNavigate();
  
  const handleAddCompany = () => {
    navigate("/company/add");
  };

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  return (
    <div className="container-fixed relative"> 
          <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-semibold leading-none text-gray-900 py-3">
                Company List
              </h1>
            </div>
            <button onClick={handleAddCompany} className="btn btn-primary">
              Add Company
            </button>
          </div>

          <div className="absolute top-11 right-[2.5rem] mt-2">
        <form onSubmit={onSearchSubmit} className="w-64 relative flex">
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] text-gray-700 outline-none focus:border-gray-500 focus:bg-white border-gray-500"
            placeholder="Search"
          />
          <button
            type="submit"
            className="relative z-[2] -ml-0.5 flex items-center rounded-e bg-gray-500 px-5 text-xs font-medium uppercase leading-normal text-white"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </form>
          </div>
     
          <CompanyTable search={search}/>
    </div>
  );
};

export default Company;
