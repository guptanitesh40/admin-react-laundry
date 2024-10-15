import React, { useState } from "react";
import OrderTable from "./OrderTable";
import { useNavigate } from "react-router-dom";

const Order: React.FC = () => {

  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const navigate = useNavigate();


  const handleAddOrder = () => {
    navigate("/order/add");
  };

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(searchInput);
};

  return (
    <div className="container-fixed relative">

      <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-5">
        <h1 className="text-xl font-semibold leading-none text-gray-900">
          Orders
        </h1>
        <button className="btn btn-primary"
        onClick={handleAddOrder}
        >
          <i className="ki-filled ki-plus-squared"></i>Add Order
        </button>
      </div>

      <div className="absolute top-11 right-[2.5rem] mt-2">
      <form onSubmit={onSearchSubmit} className="w-64 relative flex">
        <input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] text-gray-700 outline-none focus:border-primary focus:bg-white border-primary"
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

      <OrderTable search={search}/>
      
    </div>
  );
};

export default Order;
