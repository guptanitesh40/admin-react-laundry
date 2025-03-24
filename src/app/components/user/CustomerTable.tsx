import { useEffect, useState } from "react";
import { searchSchema } from "../../validation/searchSchema";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import TableShimmer from "../shimmer/TableShimmer";
import { Gender } from "../../../types/enums";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useDeleteUser, useGetUsers, usePermissions } from "../../hooks";
import Swal from "sweetalert2";
import MultiSelect from "../MultiSelect/MultiSelect";
import Pagination from "../pagination/Pagination";

const CustomerTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | null>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [genderFilter, setGenderFilter] = useState<number[]>([]);

  const pageParams = searchParams.get("page");
  const perPageParams = searchParams.get("perPage");

  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  let role = 5;

  const { users, loading, count, fetchUsers } = useGetUsers(
    currentPage,
    perPage,
    search,
    sortColumn,
    sortOrder,
    genderFilter,
    role
  );
  const { deleteUser } = useDeleteUser();
  const { hasPermission } = usePermissions();

  const genderOptions = Object.entries(Gender)
    .filter(([key, value]) => typeof value === "number")
    .map(([label, value]) => ({ label, value: value as number }));

  const totalPages = Math.ceil(count / perPage);

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
  }, [genderFilter]);

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

  const handleViewCustomer = async (user_id: number) => {
    navigate(`/customer/${user_id}`);
  };

  const handleUpdateCustomer = (user_id: number) => {
    navigate(`/customer/edit/${user_id}`);
  };

  const handleDeleteCustomer = async (user_id: number) => {
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

  if (!users) return;

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
              options={genderOptions}
              displayValue="label"
              placeholder="Select Gender"
              selectedValues={genderFilter}
              onSelect={(selectedList: any) =>
                setGenderFilter(
                  selectedList.map((item: { value: any }) => item.value)
                )
              }
              onRemove={(selectedList: any) =>
                setGenderFilter(
                  selectedList.map((item: { value: any }) => item.value)
                )
              }
              className="lgscreen:min-w-[230px] mini:min-w-[250px]"
              sliceCount={2}
            />
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
                  className="mini:min-w-[185px] lgscreen:min-w-[150px] flex-grow"
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

                  <th className="min-w-[150px]">Total Pending Amount</th>

                  {(hasPermission(8, "read") ||
                    hasPermission(8, "update") ||
                    hasPermission(8, "delete")) && (
                    <th className="min-w-[180px]">Actions</th>
                  )}
                </tr>
              </thead>
              {loading ? (
                <TableShimmer />
              ) : users.length > 0 ? (
                <tbody>
                  {users?.map((customer: any) => {
                    return (
                      <tr key={customer.user_id}>
                        <td
                          className="cursor-pointer text-blue-600 hover:underline"
                          onClick={() => handleViewCustomer(customer.user_id)}
                        >
                          <div className="flex items-center gap-2.5">
                            {customer.user_id}
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-1.5">
                            {customer.first_name} {customer.last_name}
                          </div>
                        </td>
                        <td>{customer.email}</td>
                        <td>
                          <div className="flex items-center gap-1.5">
                            {customer.mobile_number}
                          </div>
                        </td>
                        <td>
                          {
                            Gender[
                              customer.gender as unknown as keyof typeof Gender
                            ]
                          }
                        </td>
                        <td>{customer.total_due_amount}</td>

                        {(hasPermission(8, "read") ||
                          hasPermission(8, "update") ||
                          hasPermission(8, "delete")) && (
                          <td className="space-x-3">
                            {hasPermission(8, "read") && (
                              <button
                                className="bg-yellow-100 hover:bg-yellow-200 p-[9px] rounded-full"
                                style={{ marginBottom: "-30px" }}
                                onClick={() =>
                                  handleViewCustomer(customer.user_id)
                                }
                              >
                                <FaEye size={18} className="text-gray-600" />
                              </button>
                            )}

                            {hasPermission(8, "update") && (
                              <button
                                className="bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                                onClick={() =>
                                  handleUpdateCustomer(customer.user_id)
                                }
                              >
                                <FaPencilAlt className="text-yellow-600" />
                              </button>
                            )}

                            {hasPermission(8, "delete") && (
                              <button
                                className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                                onClick={() =>
                                  handleDeleteCustomer(customer.user_id)
                                }
                              >
                                <FaTrash className="text-red-500" />
                              </button>
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={6} className="text-center">
                      No customer available
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
            label="customers"
          />
        </div>
      </div>
    </>
  );
};

export default CustomerTable;
