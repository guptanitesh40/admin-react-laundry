import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDeleteCompany, useGetCompanies, usePermissions } from "../../hooks";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { searchSchema } from "../../validation/searchSchema";
import * as Yup from "yup";
import TableShimmer from "../shimmer/TableShimmer";
import { CompanyOwed } from "../../../types/enums";
import Pagination from "../pagination/Pagination";

const CompanyTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | null>(null);

  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [ownershipFilter, setOwnershipFilter] = useState<number>();

  const pageParams = searchParams.get("page");
  const perPageParams = searchParams.get("perPage");

  const { companies, fetchCompanies, loading, count } = useGetCompanies(
    currentPage,
    perPage,
    search,
    sortColumn,
    sortOrder,
    ownershipFilter
  );
  const { hasPermission } = usePermissions();
  const navigate = useNavigate();

  const totalPages = Math.ceil(count / perPage);

  const { deleteCompany } = useDeleteCompany();

  const handleDeleteCompany = async (company_id: number) => {
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
        const { success, message } = await deleteCompany(company_id);
        if (success) {
          const updatedCompanies = companies.filter(
            (company) => company.company_id !== company_id
          );
          if (updatedCompanies.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setSearchParams({
              page: (currentPage - 1).toString(),
              perPage: perPage.toString(),
            });
          }
          await fetchCompanies();
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

  const handleUpdateCompany = (company_id: number) => {
    navigate(`/company/edit/${company_id}`);
  };

  useEffect(() => {
    if (pageParams) {
      setCurrentPage(Number(pageParams));
    }
    if (perPageParams) {
      setPerPage(Number(perPageParams));
    }
  }, [pageParams, perPageParams]);

  useEffect(() => {
    setCurrentPage(1);
    if (search !== "") {
      setSearchParams({ search, page: "1", perPage: perPage.toString() });
    } else {
      setSearchParams({});
    }
  }, [search]);

  useEffect(() => {
    setCurrentPage(1);
    if (search !== "") {
      setSearchParams({ search, page: "1", perPage: perPage.toString() });
    } else {
      setSearchParams({});
    }
  }, [ownershipFilter]);

  const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await searchSchema.validate({ search: search }, { abortEarly: false });
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

  const handleViewCompany = (company_id: number) => {
    navigate(`/company-profile/${company_id}`);
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
            <select
              className="select select-lg w-[200px] text-sm"
              value={ownershipFilter}
              onChange={(e) => {
                setOwnershipFilter(Number(e.target.value));
              }}
            >
              <option value="" selected>
                Select Ownership
              </option>
              <option value={1}>Own</option>
              <option value={2}>Other Company</option>
            </select>
          </div>

          <div className="flex">
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
                  className="min-w-[185px] flex-grow"
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
            <table
              className="table table-auto table-border"
              data-datatable-table="true"
            >
              <thead>
                <tr>
                  <th className="w-[30px]">
                    <span
                      className={`sort ${
                        sortColumn === "company_id"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("company_id")}
                    >
                      <span className="sort-label">Id</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[230px]">
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
                      <span className="sort-label">Company name</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[230px]">
                    <span
                      className={`sort ${
                        sortColumn === "company_owner_name"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("company_owner_name")}
                    >
                      <span className="sort-label">Company owner name</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[230px]">Company Ownership</th>

                  <th className="min-w-[320px]">Address</th>

                  <th className="min-w-[120px]">
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

                  <th className="min-w-[215px]">
                    <span
                      className={`sort ${
                        sortColumn === "mobile_number"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("phone_number")}
                    >
                      <span className="sort-label">Phone No 1</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[215px]">
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
                      <span className="sort-label">Phone No 2</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[180px]">Company Website</th>

                  <th className="min-w-[200px]">
                    <span
                      className={`sort ${
                        sortColumn === "registration_date"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("registration_date")}
                    >
                      <span className="sort-label">Registration Date</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  {(hasPermission(12, "update") ||
                    hasPermission(12, "delete") ||
                    hasPermission(12, "read")) && (
                    <th className="min-w-[180px]">Actions</th>
                  )}
                </tr>
              </thead>
              {loading ? (
                <TableShimmer />
              ) : companies.length > 0 ? (
                <tbody>
                  {companies.map((company) => (
                    <tr key={company.company_id}>
                      <td
                        className="cursor-pointer text-blue-600 hover:underline"
                        onClick={() =>
                          navigate(`/company-profile/${company.company_id}`)
                        }
                      >
                        <div className="flex items-center gap-2.5">
                          {company.company_id}
                        </div>
                      </td>
                      <td>
                        <span>{company.company_name}</span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {company.company_owner_name}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {
                            CompanyOwed[
                              company.company_ownedby as unknown as keyof typeof CompanyOwed
                            ]
                          }
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {company.address}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {company.email}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {company.phone_number}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {company.mobile_number}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          <a
                            className="text-gray-600 hover:text-primary"
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {company.website}
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {dayjs(company.registration_date).format(
                            "DD-MM-YYYY"
                          )}
                        </div>
                      </td>

                      {(hasPermission(12, "update") ||
                        hasPermission(12, "delete") ||
                        hasPermission(12, "read")) && (
                        <td>
                          {hasPermission(12, "read") && (
                            <button
                              className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full"
                              onClick={() =>
                                handleViewCompany(company.company_id)
                              }
                            >
                              <FaEye size={18} className="text-gray-600" />
                            </button>
                          )}

                          {hasPermission(12, "update") && (
                            <button
                              className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                              onClick={() =>
                                handleUpdateCompany(company.company_id)
                              }
                            >
                              <FaPencilAlt className="text-yellow-600" />
                            </button>
                          )}

                          {hasPermission(12, "delete") && (
                            <button
                              className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                              onClick={() =>
                                handleDeleteCompany(company.company_id)
                              }
                            >
                              <FaTrash className="text-red-500" />
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={6} className="text-center">
                      No company available
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>

          <Pagination
            count={count}
            currentPage={currentPage}
            totalRecords={companies?.length}
            perPage={perPage}
            onPageChange={handlePageChange}
            label="company"
          />
        </div>
      </div>
    </>
  );
};

export default CompanyTable;
