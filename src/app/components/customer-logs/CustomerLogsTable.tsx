import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetContactRequestData } from "../../hooks";
import { searchSchema } from "../../validation/searchSchema";
import * as Yup from "yup";
import dayjs from "dayjs";
import Pagination from "../pagination/Pagination";
import TableShimmerEd2 from "../shimmer/TableShimmerEd2";
import toast from "react-hot-toast";
import useGetCustomerLog from "../../hooks/customer-log/useGetCustomerLog";

const CustomerLogsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | null>(null);
  const pageParams = searchParams.get("page");
  const perPageParams = searchParams.get("perPage");

  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { customerLogData, count, loading } = useGetCustomerLog(
    currentPage,
    perPage,
    search,
    sortColumn,
    sortOrder
  );

  const totalPages = Math.ceil(count / perPage);

  //   useEffect(() => {
  //     if (pageParams) {
  //       setCurrentPage(Number(pageParams));
  //     }
  //     if (perPageParams) {
  //       setPerPage(Number(perPageParams));
  //     }
  //   }, [pageParams, perPageParams]);

  const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast(searchInput);
    try {
      await searchSchema.validate(
        { search: searchInput },
        { abortEarly: false }
      );
      setSearch(searchInput);
      setErrorMessage("");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrorMessage(error.errors[0]);
      }
    }
  };

  //   useEffect(() => {
  //     setCurrentPage(1);
  //     if (search !== "") {
  //       setSearchParams({ search, page: "1", perPage: perPage.toString() });
  //     } else {
  //       setSearchParams({});
  //     }
  //   }, [search]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setSearchParams({
        page: newPage.toString(),
        perPage: perPage.toString(),
      });
    }
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = Number(e.target.value);
    console.log(newPerPage);
    setPerPage(newPerPage);
    setCurrentPage(1);
    setSearchParams({ page: "1", perPage: newPerPage.toString() });
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortColumn(column);
      setSortOrder("ASC");
    }
  };

  //   if (loading) {
  //     return (
  //       <TableShimmerEd2
  //         isFilters={true}
  //         columns={6}
  //         records={10}
  //         isPagination={true}
  //       />
  //     );
  //   }

  if (loading) {
    return (
      <TableShimmerEd2
        isFilters={true}
        isPagination={true}
        columns={4}
        records={10}
      />
    );
  }

  return (
    <>
      <div className="card-header card-header-space flex-wrap">
        <div className="flex items-center gap-2 mb-4">
          <span>Show</span>
          <select
            className="select select-sm w-16"
            data-datatable-size="true"
            name="perpage"
            value={perPage}
            onChange={handlePerPageChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>per page</span>
        </div>

        <div className="flex flex-wrap gap-2 lg:gap-5 mb-3">
          <div className="flex flex-col">
            <form
              onSubmit={onSearchSubmit}
              className="flex items-center gap-2 self-end"
            >
              <label className="input input-sm h-10 flex items-center gap-2">
                <input
                  type="search"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    if (e.target.value === "") {
                      setSearch("");
                    }
                  }}
                  placeholder="Search..."
                  className="min-w-[185px] flex-grow"
                />
                <button type="submit" className="btn btn-sm btn-icon">
                  <i className="ki-filled ki-magnifier"></i>
                </button>
              </label>
            </form>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">
                {errorMessage || "\u00A0"}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="card-body">
        <div data-datatable="true" data-datatable-page-size="10">
          <div className="scrollable-x-auto">
            <table className="table table-auto table-border">
              <thead>
                <tr>
                  <th className="w-[100px] min-w-[75px]">
                    <span
                      className={`sort ${
                        sortColumn === "login_id"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("login_id")}
                    >
                      <span className="sort-label">Id</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>
                  <th className="min-w-[200px] max-w-[300px] flex-grow">
                    <span
                      className={`sort ${
                        sortColumn === "first_name"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("first_name")}
                    >
                      <span className="sort-label">User name</span>
                      <span className="sort-icon"></span>
                    </span>
                    <span className="inline-block h-[22.5px] w-[22.5px] bg-transparent rounded-sm text-right"></span>
                  </th>
                  <th className="min-w-[200px] max-w-[300px] flex-grow">
                    <span
                      className={`sort ${
                        sortColumn === "created_at"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("created_at")}
                    >
                      <span className="sort-label">Last login time</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>
                  <th className="min-w-[200px] max-w-[300px] flex-grow">
                    <span className="sort-label">Device</span>
                  </th>
                </tr>
              </thead>
              {customerLogData?.length > 0 ? (
                <tbody>
                  {customerLogData?.map((customerLog: any) => {
                    const { login_id, user, created_at, type } = customerLog;
                    const { first_name, last_name } = user;
                    return (
                      <tr key={login_id}>
                        <td>{login_id}</td>
                        <td>
                          {first_name + " " + last_name}
                          <span className="inline-block h-[22.5px] w-[22.5px] bg-transparent rounded-sm text-right"></span>
                        </td>
                        <td>
                          <div className="flex items-center gap-2.5">
                            {dayjs(created_at).format("DD-MM-YYYY, hh:mm A")}
                          </div>
                        </td>
                        {/* <td>{login_id % 2 === 0 ? "Mobile" : "WebSite"}</td> */}
                        <td>{!type ? "WebSite" : "Mobile"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={4} className="text-center">
                      No data available
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>

          <Pagination
            count={count}
            currentPage={currentPage}
            totalRecords={customerLogData?.length}
            perPage={perPage}
            onPageChange={handlePageChange}
            label="records"
          />
        </div>
      </div>
    </>
  );
};

export default CustomerLogsTable;
