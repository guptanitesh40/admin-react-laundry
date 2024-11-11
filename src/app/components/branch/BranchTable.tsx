import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useDeleteBranch,
  useGetBranches,
} from "../../hooks";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import Swal from "sweetalert2";
import TableShimmer from "../shimmer/TableShimmer";

interface BranchTableProps {
  search: string;
}
const BranchTable: React.FC<BranchTableProps> = ({ search }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | null>(null);
  const pageParams = searchParams.get("page");
  const perPageParams = searchParams.get("perPage");

  const { branches, fetchBranches, totalBranches, loading } = useGetBranches(
    currentPage,
    perPage,
    search,
    sortColumn,
    sortOrder
  );

  const navigate = useNavigate();

  const totalPages = Math.ceil(totalBranches / perPage);

  const { deleteBranch } = useDeleteBranch();

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
    fetchBranches();
  }, [perPage, currentPage, search, sortColumn, sortOrder, fetchBranches]);

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
      <div className="grid gap-5 lg:gap-4.5">
        <div className="card card-grid min-w-full">
          <div className="card-body">
          <div className="scrollable-x-auto">
            <table className="table table-auto table-border">
              <thead>
                <tr>
                  <th className="min-w-[90px]">
                    <div
                      className="flex justify-between"
                      onClick={() => handleSort("branch_id")}
                    >
                      Id
                      <div className="flex cursor-pointer">
                        <FaArrowDownLong
                          color={
                            sortColumn === "branch_id" && sortOrder === "ASC"
                              ? "gray"
                              : "lightgray"
                          }
                        />
                        <FaArrowUpLong
                          color={
                            sortColumn === "branch_id" && sortOrder === "DESC"
                              ? "gray"
                              : "lightgray"
                          }
                        />
                      </div>
                    </div>
                  </th>                  
                  <th className="min-w-[200px]">
                    <div
                      className="flex justify-between"
                      onClick={() => handleSort("branch_name")}
                    >
                      Branch Name
                      <div className="flex cursor-pointer">
                        <FaArrowDownLong
                          color={
                            sortColumn === "branch_name" && sortOrder === "ASC"
                              ? "gray"
                              : "lightgray"
                          }
                        />
                        <FaArrowUpLong
                          color={
                            sortColumn === "branch_name" && sortOrder === "DESC"
                              ? "gray"
                              : "lightgray"
                          }
                        />
                      </div>
                    </div>
                  </th>
                  <th className="min-w-[200px]">
                    <div
                      className="flex justify-between"
                      onClick={() => handleSort("branch_address")}
                    >
                      Branch Address
                      <div className="flex cursor-pointer">
                        <FaArrowDownLong
                          color={
                            sortColumn === "branch_address" && sortOrder === "ASC"
                              ? "gray"
                              : "lightgray"
                          }
                        />
                        <FaArrowUpLong
                          color={
                            sortColumn === "branch_address" && sortOrder === "DESC"
                              ? "gray"
                              : "lightgray"
                          }
                        />
                      </div>
                    </div>
                  </th>
                  <th className="min-w-[200px]">
                    <div
                      className="flex justify-between"
                      onClick={() => handleSort("branch_email")}
                    >
                      Branch Email
                      <div className="flex cursor-pointer">
                        <FaArrowDownLong
                          color={
                            sortColumn === "branch_email" && sortOrder === "ASC"
                              ? "gray"
                              : "lightgray"
                          }
                        />
                        <FaArrowUpLong
                          color={
                            sortColumn === "branch_email" && sortOrder === "DESC"
                              ? "gray"
                              : "lightgray"
                          }
                        />
                      </div>
                    </div>
                  </th>
                  <th className="min-w-[200px]">
                    <div
                      className="flex justify-between"
                      onClick={() => handleSort("branch_phone_number")}
                    >
                      Branch Phone no
                      <div className="flex cursor-pointer">
                        <FaArrowDownLong
                          color={
                            sortColumn === "branch_phone_number" && sortOrder === "ASC"
                              ? "gray"
                              : "lightgray"
                          }
                        />
                        <FaArrowUpLong
                          color={
                            sortColumn === "branch_phone_number" && sortOrder === "DESC"
                              ? "gray"
                              : "lightgray"
                          }
                        />
                      </div>
                    </div>
                  </th>
                  <th className="min-w-[230px]">
                    <div
                      className="flex justify-between"
                      onClick={() => handleSort("branch_manager")}
                    >
                      Branch Manager Name
                      <div className="flex cursor-pointer">
                        <FaArrowDownLong
                          color={
                            sortColumn === "branch_manager" && sortOrder === "ASC"
                              ? "gray"
                              : "lightgray"
                          }
                        />
                        <FaArrowUpLong
                          color={
                            sortColumn === "branch_manager" && sortOrder === "DESC"
                              ? "gray"
                              : "lightgray"
                          }
                        />
                      </div>
                    </div>
                  </th>
                  <th className="min-w-[190px]">
                    <div
                      className="flex justify-between"
                      onClick={() => handleSort("company_name")}
                    >
                      Company Name
                      <div className="flex cursor-pointer">
                        <span>
                          <FaArrowDownLong
                            color={
                              sortColumn === "company_name" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </span>
                        <span>
                          <FaArrowUpLong
                            color={
                              sortColumn === "company_name" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </span>
                      </div>
                    </div>
                  </th>                 
                  <th className="w-[50px]">Actions</th>
                </tr>
              </thead>
              {loading ? (
                <TableShimmer />
              ) : branches.length > 0 ? (
                <tbody>
                  {branches.map((branch) => (
                    <tr key={branch.branch_id}>
                      <td>{branch.branch_id}</td>
                      <td>
                        <span
                          className="cursor-pointer hover:text-primary"
                          onClick={() =>
                            navigate(`/branch-profile/${branch.branch_id}`)
                          }
                        >
                          {branch.branch_name}
                        </span>
                      </td>
                      <td>{branch.branch_address}</td>
                      <td>{branch.branch_email}</td>
                      <td>{branch.branch_phone_number}</td>
                      <td>{branch.branchManager.first_name} {branch.branchManager.last_name}</td>
                      <td>{branch.company.company_name}</td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateBranch(branch.branch_id)}
                            className="bg-yellow-100 hover:bg-yellow-200 p-2 rounded-full"
                          >
                            <FaPencilAlt className="text-yellow-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteBranch(branch.branch_id)}
                            className="bg-red-100 hover:bg-red-200 p-2 rounded-full"
                          >
                            <FaTrash className="text-red-500" />
                          </button>
                        </div>
                      </td>
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
          </div>
        </div>
      </div>
      {totalBranches > perPage && (
        <div className="flex items-center gap-4 mt-4">
          <span className="text-gray-700">
            Showing {branches.length} of {totalBranches} Branches
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

export default BranchTable;
