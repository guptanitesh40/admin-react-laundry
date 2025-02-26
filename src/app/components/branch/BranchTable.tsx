import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useDeleteBranch,
  useGetBranches,
  useGetCompanies,
  usePermissions,
} from "../../hooks";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import Swal from "sweetalert2";
import TableShimmer from "../shimmer/TableShimmer";
import * as Yup from "yup";
import { searchSchema } from "../../validation/searchSchema";
import useGetUsersByRole from "../../hooks/user/useGetUsersByRole";
import MultiSelect from "../MultiSelect/MultiSelect";

const BranchTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | null>(null);
  const pageParams = searchParams.get("page");
  const perPageParams = searchParams.get("perPage");
  const perPageForList = 1000;
  const pageNumberForList = 1;

  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [companyFilter, setCompanyFilter] = useState<number[]>([]);
  const [branchManagerFilter, setBranchManagerFilter] = useState<number[]>([]);

  const { branches, fetchBranches, totalBranches, loading } = useGetBranches(
    currentPage,
    perPage,
    search,
    sortColumn,
    sortOrder,
    companyFilter,
    branchManagerFilter
  );
  const { hasPermission } = usePermissions();
  const { deleteBranch } = useDeleteBranch();
  const { companies } = useGetCompanies(pageNumberForList, perPageForList);
  const { users, fetchUsersByRole } = useGetUsersByRole();

  const navigate = useNavigate();

  const totalPages = Math.ceil(totalBranches / perPage);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsersByRole(3);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (pageParams) {
      setCurrentPage(Number(pageParams));
    }
    if (perPageParams) {
      setPerPage(Number(perPageParams));
    }
  }, [pageParams, perPageParams]);

  useEffect(() => {
    if (search) {
      setCurrentPage(1);
      setSearchParams({
        search: search,
        page: "1",
        perPage: perPage.toString(),
      });
    }
  }, [search]);

  const handleUpdateBranch = (branch_id: number) => {
    navigate(`/branch/edit/${branch_id}`);
  };

  const handleDeleteBranch = async (branch_id: number) => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
      });

      if (isConfirmed) {
        const { success, message } = await deleteBranch(branch_id);
        if (success) {
          const updatedBranches = branches.filter(
            (branch) => branch.branch_id !== branch_id
          );
          if (updatedBranches.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setSearchParams({
              page: (currentPage - 1).toString(),
              perPage: perPage.toString(),
            });
          }
          await fetchBranches();
          Swal.fire(message);
        } else {
          Swal.fire(message);
        }
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      sortOrder === "ASC" ? setSortOrder("DESC") : setSortOrder("ASC");
    } else {
      setSortColumn(column);
      setSortOrder("ASC");
    }
  };

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
    setPerPage(newPerPage);
    setCurrentPage(1);
    setSearchParams({ page: "1", perPage: newPerPage.toString() });
  };

  const handleViewBranch = (branch_id: number) => {
    navigate(`/branch-profile/${branch_id}`);
  };

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
          </select>
          <span>per page</span>
        </div>

        <div className="flex flex-wrap gap-2 lg:gap-5 mb-3">
          <div className="flex flex-wrap gap-2.5">
            <MultiSelect
              options={companies?.map((company) => ({
                label: company.company_name,
                value: company.company_id,
              }))}
              displayValue="company_name"
              placeholder="Select Company"
              selectedValues={companyFilter}
              onSelect={(selectedList: any) =>
                setCompanyFilter(
                  selectedList.map((item: { value: any }) => item.value)
                )
              }
              onRemove={(selectedList: any) =>
                setCompanyFilter(
                  selectedList.map((item: { value: any }) => item.value)
                )
              }
              className="lgmobile:min-w-[235px] vsmobile:min-w-[235px]"
            />

            <MultiSelect
              options={users?.map((user: any) => ({
                label: `${user.first_name} ${user.last_name} (${user.mobile_number})`,
                value: user.user_id,
              }))}
              displayValue="user_name"
              placeholder="Select Branch Manager"
              selectedValues={branchManagerFilter}
              onSelect={(selectedList: any) =>
                setBranchManagerFilter(
                  selectedList.map((item: { value: any }) => item.value)
                )
              }
              onRemove={(selectedList: any) =>
                setBranchManagerFilter(
                  selectedList.map((item: { value: any }) => item.value)
                )
              }
              className="lgmobile:min-w-[300px] vsmobile:min-w-[235px]"
              isSearchInput={true}
            />
          </div>

          <div className="flex justify-self-end">
            <form onSubmit={onSearchSubmit} className="flex items-center gap-2">
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
                  className="flex-grow"
                />
                <button type="submit" className="btn btn-sm btn-icon">
                  <i className="ki-filled ki-magnifier"></i>
                </button>
              </label>
            </form>
            <p className="text-red-500 text-sm mt-1">
              {errorMessage || "\u00A0"}
            </p>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div data-datatable="true" data-datatable-page-size="10">
          <div className="scrollable-x-auto">
            <table className="table table-auto table-border">
              <thead>
                <tr>
                  <th className="w-[30px]">
                    <span
                      className={`sort ${
                        sortColumn === "branch_id"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("branch_id")}
                    >
                      <span className="sort-label">Id</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[230px]">
                    <span
                      className={`sort ${
                        sortColumn === "branch_name"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("branch_name")}
                    >
                      <span className="sort-label">Branch name</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[320px]">Address</th>

                  <th className="min-w-[200px]">
                    <span
                      className={`sort ${
                        sortColumn === "email"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("email")}
                    >
                      <span className="sort-label">Email</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[200px]">
                    <span
                      className={`sort ${
                        sortColumn === "mobile_number"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("mobile_number")}
                    >
                      <span className="sort-label">Mobile no</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[230px]">
                    <span
                      className={`sort ${
                        sortColumn === "branch_manager"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("branch_manager")}
                    >
                      <span className="sort-label">Branch Manager Name</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[190px]">
                    <span
                      className={`sort ${
                        sortColumn === "company_name"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("company_name")}
                    >
                      <span className="sort-label">Company Name</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  {(hasPermission(13, "update") ||
                    hasPermission(13, "delete") ||
                    hasPermission(13, "read")) && (
                    <th className="w-[50px]">Actions</th>
                  )}
                </tr>
              </thead>
              {loading ? (
                <TableShimmer />
              ) : branches.length > 0 ? (
                <tbody>
                  {branches.map((branch) => (
                    <tr key={branch.branch_id}>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {branch.branch_id}
                        </div>
                      </td>
                      <td>
                        <div
                          className="flex items-center gap-2.5 cursor-pointer hover:text-primary"
                          onClick={() =>
                            navigate(`/branch-profile/${branch.branch_id}`)
                          }
                        >
                          {branch.branch_name}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {branch.branch_address}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {branch.branch_email}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {branch.branch_phone_number}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {branch.branchManager.first_name}{" "}
                          {branch.branchManager.last_name}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {branch.company.company_name}
                        </div>
                      </td>

                      {(hasPermission(13, "update") ||
                        hasPermission(13, "delete") ||
                        hasPermission(13, "read")) && (
                        <td>
                          <div className="flex">
                            {hasPermission(12, "read") && (
                              <button
                                className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full"
                                onClick={() =>
                                  handleViewBranch(branch.branch_id)
                                }
                              >
                                <FaEye size={18} className="text-gray-600" />
                              </button>
                            )}

                            {hasPermission(12, "update") && (
                              <button
                                onClick={() =>
                                  handleUpdateBranch(branch.branch_id)
                                }
                                className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                              >
                                <FaPencilAlt className="text-yellow-600" />
                              </button>
                            )}

                            {hasPermission(12, "delete") && (
                              <button
                                onClick={() =>
                                  handleDeleteBranch(branch.branch_id)
                                }
                                className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                              >
                                <FaTrash className="text-red-500" />
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={4} className="text-center">
                      No branches available.
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>

          {totalBranches > perPage && (
            <div className="card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium">
              <div className="flex items-center gap-4">
                <span className="text-gray-700">
                  Showing {branches.length} of {totalBranches} Companies
                </span>
                <div className="pagination" data-datatable-pagination="true">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`btn ${currentPage === 1 ? "disabled" : ""}`}
                  >
                    <FaChevronLeft />
                  </button>
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      className={`btn ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`btn ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BranchTable;
