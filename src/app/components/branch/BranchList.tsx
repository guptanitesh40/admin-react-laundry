import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDeleteBranch, useGetBranch } from "../../hooks";
import ListShimmer from "../shimmer/ListShimmer";

interface Branch {
  branch_id: number;
  branch_name: string;
  branch_address: string;
  branch_manager: string;
  branch_phone_number: string;
  branch_email: string;
  branch_registration_number: string;
  company_id: number;
}

const BranchList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromParams = searchParams.get('page');

  const { branches, refetch, loading, totalBranches } = useGetBranch(
    currentPage,
    perPage
  );
  const { deleteBranch } = useDeleteBranch();

  useEffect(() => {
    if (pageFromParams) {
      setCurrentPage(Number(pageFromParams));
    }
  }, [pageFromParams]);

  const totalPages = Math.ceil(totalBranches / perPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setSearchParams({ page: newPage.toString() });
      refetch();
    }
  };

  const handleAddBranch = () => {
    navigate("/branch/add");
  };

  const handleUpdateBranch = (branch: Branch) => {
    navigate(`/branch/edit/${branch.branch_id}`, { state: { branch } });
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
          refetch();
          Swal.fire("Deleted!", message, "success");
        } else {
          Swal.fire("Failed!", message, "error");
        }
      } else {
        Swal.fire("Cancelled", "The branch is safe :)", "info");
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="container-fixed">
      <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
        <div className="flex flex-wrap items-center gap-5 justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Branch List</h1>
            <p className="text-lg font-medium text-gray-700">
              Total Branches: {totalBranches}
            </p>
          </div>

          <div className="flex gap-5">
            <button
              className="btn btn-success"
              onClick={handleAddBranch}
            >
              <i className="ki-filled ki-plus-squared"></i>
              New Branch
            </button>
          </div>
        </div>

        <div id="branch_list">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            {loading ? <ListShimmer /> : (
              <>
                {branches.length === 0 ? (
                  <div className="text-center text-gray-600">
                    <p>No branches available.</p>
                  </div>
                ) : (
                  branches.map((branch) => (
                    <div
                      className="card p-5 lg:p-7.5 hover:shadow-lg transition-shadow duration-300"
                      key={branch.branch_id}
                    >
                      <div className="flex items-center flex-wrap justify-between gap-5">
                        <div className="flex items-center gap-3.5">
                          <div>
                            <span
                              className="text-lg font-semibold cursor-pointer text-gray-900 hover:text-primary"
                              onClick={() =>
                                navigate(`/branch-profile/${branch.branch_id}`)
                              }
                            >
                              {branch.branch_name}
                            </span>
                            <div className="flex items-center text-sm font-medium text-gray-600">
                              {branch.branch_address}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center lg:gap-4">
                          <button
                            className="bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                            onClick={() => handleUpdateBranch(branch)}
                          >
                            <FaPencilAlt className="text-yellow-600" />
                          </button>
                          <button
                            className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                            onClick={() => handleDeleteBranch(branch.branch_id)}
                          >
                            <FaTrash className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {totalBranches > perPage && (
              <div className="flex items-center gap-4 mt-4">
                <span>
                  Showing {branches.length} of {totalBranches} Branches
                </span>
                <div className="pagination" data-datatable-pagination="true">
                  <button
                    className={`btn ${currentPage === 1 ? "opacity-50" : ""}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <FaChevronLeft />
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      className={`btn ${currentPage === index + 1 ? "active" : ""}`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    className={`btn ${currentPage === totalPages ? "opacity-50" : ""}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchList;
