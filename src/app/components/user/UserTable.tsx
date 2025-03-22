import {
  useDeleteUser,
  useGetBranches,
  useGetCompanies,
  useGetUsers,
} from "../../hooks";
import TableShimmer from "../shimmer/TableShimmer";
import { useEffect, useState } from "react";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Gender, Role } from "../../../types/enums";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { searchSchema } from "../../validation/searchSchema";
import { getRoleClass } from "../../utils/roleClasses";
import Pagination from "../pagination/Pagination";

interface UserTableProps {
  filters: {
    genderFilter: number[];
    roleFilter: number[];
    companyFilter: number[];
    branchFilter: number[];
  };
}

const UserTable: React.FC<UserTableProps> = ({ filters }) => {
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

  const { users, fetchUsers, count, loading } = useGetUsers(
    currentPage,
    perPage,
    search,
    sortColumn,
    sortOrder,
    filters.genderFilter,
    filters.roleFilter,
    filters.companyFilter,
    filters.branchFilter
  );
  const { deleteUser } = useDeleteUser();
  const { companies } = useGetCompanies(pageNumberForList, perPageForList);
  const { branches } = useGetBranches(pageNumberForList, perPageForList);

  const navigate = useNavigate();

  const totalPages = Math.ceil(count / perPage);

  const handleUpdateUser = (user_id: number) => {
    navigate(`/user/edit/${user_id}`);
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
  }, [
    filters.genderFilter,
    filters.roleFilter,
    filters.companyFilter,
    filters.branchFilter,
  ]);

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

  const handleDeleteUser = async (user_id: number) => {
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
        const { success, message } = await deleteUser(user_id);
        if (success) {
          const updatedUsers = users.filter((user) => user.user_id !== user_id);
          if (updatedUsers.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setSearchParams({
              page: (currentPage - 1).toString(),
              perPage: perPage.toString(),
            });
          }
          await fetchUsers();
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

  const handleViewUser = async (user_id: number) => {
    navigate(`/user/${user_id}`);
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

        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="flex flex-col items-start">
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
                  <th className="min-w-[70px]">
                    <span
                      className={`sort ${
                        sortColumn === "user_id"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("user_id")}
                    >
                      <span className="sort-label">Id</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[250px]">
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
                      <span className="sort-label">Full name</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[200px]">Role</th>

                  <th className="min-w-[250px]">
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

                  <th className="min-w-[190px]">
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

                  <th className="min-w-[80px]">Gender</th>

                  <th className="min-w-[250px]">
                    <span className="sort-label">Company</span>
                  </th>

                  <th className="min-w-[250px]">
                    <span className="sort-label">Branch</span>
                  </th>

                  <th className="min-w-[250px]">
                    <span className="sort-label">Workshop</span>
                  </th>

                  <th className="min-w-[150px]">Actions</th>
                </tr>
              </thead>
              {loading ? (
                <TableShimmer />
              ) : users.length > 0 ? (
                <tbody>
                  {users.map((user) => {
                    return (
                      <tr key={user.user_id}>
                        <td
                          className="cursor-pointer"
                          onClick={() => handleViewUser(user.user_id)}
                        >
                          <div className="flex items-center gap-2.5">
                            {user.user_id}
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-1.5">
                            {user.first_name} {user.last_name}
                          </div>
                        </td>
                        <td>
                          <span
                            className={`mt-1 p-2 rounded-md text-sm ${getRoleClass(
                              user.role_id
                            )}`}
                          >
                            {Role[user.role_id as unknown as keyof typeof Role]}
                          </span>
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <div className="flex items-center gap-1.5">
                            {user.mobile_number}
                          </div>
                        </td>
                        <td>
                          {
                            Gender[
                              user.gender as unknown as keyof typeof Gender
                            ]
                          }
                        </td>
                        <td>
                          {user?.companies
                            .map((company: any) => company)
                            .join(", ")}
                        </td>
                        <td>
                          {user?.branches

                            .map((branch: any) => branch)
                            .join(", ")}{" "}
                        </td>
                        <td>
                          {user?.workshops

                            .map((workshop: any) => workshop)
                            .join(", ")}{" "}
                        </td>

                        <td className="flex">
                          <button
                            className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full"
                            onClick={() => handleViewUser(user.user_id)}
                          >
                            <FaEye size={18} className="text-gray-600" />
                          </button>
                          <button
                            className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                            onClick={() => handleUpdateUser(user.user_id)}
                          >
                            <FaPencilAlt className="text-yellow-600" />
                          </button>
                          <button
                            className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                            onClick={() => handleDeleteUser(user.user_id)}
                          >
                            <FaTrash className="text-red-500" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={6} className="text-center">
                      No user available
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>

          <Pagination
            count={count}
            currentPage={currentPage}
            totalRecords={users?.length}
            perPage={perPage}
            onPageChange={handlePageChange}
            label="users"
          />
        </div>
      </div>
    </>
  );
};

export default UserTable;
