import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { useDeleteUser, useGetBranches, useGetCompanies, useGetOrder, useGetUsers } from "../../hooks";
import TableShimmer from "../shimmer/TableShimmer";
import { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Gender, Role } from "../../../types/enums";
import Swal from "sweetalert2";

interface UserTableProps {
  search: string;
}

interface User {
  company_ids: number[];
  branch_ids: number[];
}

const UserTable: React.FC<UserTableProps> = ({ search }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | null>(null);
  const pageParams = searchParams.get("page");
  const perPageParams = searchParams.get("perPage");
  const perPageForList = 1000;
  const pageNumberForList = 1;

  const { users, fetchUsers, totalUsers, loading } = useGetUsers(
    currentPage,
    perPage,
    search,
    sortColumn,
    sortOrder
  );
  const { deleteUser } = useDeleteUser();
  const { companies, fetchCompanies } = useGetCompanies(pageNumberForList, perPageForList);
  const { branches, fetchBranches } = useGetBranches(pageNumberForList, perPageForList);

  const navigate = useNavigate();

  const totalPages = Math.ceil(totalUsers / perPage);

  const handleUpdateUser = (user_id: number) => {
    navigate(`/user/edit/${user_id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCompanies();
      await fetchBranches();
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
    fetchUsers();
  }, [perPage, currentPage, search, sortColumn, sortOrder, fetchUsers]);

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

  return (
    <>
      <div className="inline-block">
        <div className="flex mb-3 items-center gap-2">
          Show
          <select
            className="select select-sm w-16"
            value={perPage}
            onChange={handlePerPageChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          per page
        </div>
      </div>

      <div className="grid gap-5 lg:gap-7.5">
        <div className="card card-grid min-w-full">
          <div className="card-body">
            <div className="scrollable-x-auto">
              <table className="table table-auto table-border">
                <thead>
                  <tr>
                    <th className="min-w-[100px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("user_id")}
                      >
                        Id
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "user_id" && sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "user_id" && sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>

                    <th className="min-w-[165px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("user_id")}
                      >
                        User name
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "user_id" && sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "user_id" && sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>

                    <th className="min-w-[250px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("email")}
                      >
                        Email
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "email" && sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "email" && sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>

                    <th className="min-w-[165px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("mobile_number")}
                      >
                        Mobile no
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "mobile_number" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "mobile_number" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>

                    <th className="min-w-[150px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("gender")}
                      >
                        Gender
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "gender" && sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "gender" && sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>

                    <th className="min-w-[170px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("role_id")}
                      >
                        Role
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "role_id" && sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "role_id" && sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th> 
                    
                    <th className="min-w-[250px]">
                      Companies
                    </th>
                    <th className="min-w-[250px]">
                      Branches
                    </th>                         

                    <th className="min-w-[140px]">Actions</th>
                  </tr>
                </thead>
                {loading ? (
                  <TableShimmer />
                ) : users.length > 0 ? (
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.user_id}>
                        <td>{user.user_id}</td>
                        <td>
                          {user.first_name} {user.last_name}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.mobile_number}</td>
                        <td>
                          {
                            Gender[
                              user.gender as unknown as keyof typeof Gender
                            ]
                          }
                        </td>
                        <td>
                          {Role[user.role_id as unknown as keyof typeof Role]}
                        </td>
                        <td>{companies
                        .filter((company) => (user.company_ids as number[]).includes(company.company_id))
                        .map((company) => company.company_name)
                        .join(", ")}</td>
                        <td>{branches
                        .filter((branch) => (user.branch_ids as number[]).includes(branch.branch_id))
                        .map((branch) => branch.branch_name)  
                        .join(", ")}</td>                    
                        <td>
                          <button 
                          className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                          onClick={() => handleUpdateUser(user.user_id)}
                          >
                            <FaPencilAlt
                              className="text-yellow-600"                              
                            />
                          </button>
                          <button
                            className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                            onClick={() => handleDeleteUser(user.user_id)}
                          >
                            <FaTrash className="text-red-500" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={5} className="text-center">
                        No users available
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>

      {totalUsers > perPage && (
        <div className="flex items-center gap-4 mt-4">
          <span className="text-gray-700">
            Showing {users.length} of {totalUsers} Users
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
                className={`btn ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className={`btn ${currentPage === totalPages ? "disabled" : ""}`}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserTable;
