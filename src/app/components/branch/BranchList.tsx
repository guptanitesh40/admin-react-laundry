import React, { useState, useEffect } from "react";
import {
  FaPencilAlt,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDeleteBranch, useGetBranch, useGetCompany } from "../../hooks";
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
  company_name: string;
}

const BranchList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromParams = searchParams.get("page");
  const { companies, refetch: fetchCompany } = useGetCompany();

  const { branches, refetch, loading, totalBranches } = useGetBranch(
    currentPage,
    perPage
  );
  const { deleteBranch } = useDeleteBranch();

  useEffect(() => {
    if (pageFromParams) {
      const newPage = Number(pageFromParams);
      setCurrentPage(newPage);
    }
  }, [pageFromParams]);

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  const totalPages = Math.ceil(totalBranches / perPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setSearchParams({ page: newPage.toString() });
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
      {loading ? (
        <ListShimmer />
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-semibold leading-none text-gray-900 py-3">
                Branch List
              </h1>
              <span className="text-lg text-gray-700">
                Total Branches: {totalBranches}
              </span>
            </div>
            <button onClick={handleAddBranch} className="btn btn-primary">
              Add Branch
            </button>
          </div>

          <div>
            <div className="grid gap-5 lg:gap-4.5">
              <div className="card card-grid min-w-full">
                <div className="card-body">
                  <table className="table table-auto table-border">
                    <thead>
                      <tr>
                        <th className="w-[60px]">Id</th>
                        <th className="min-w-[200px]">Branch Name</th>
                        <th className="min-w-[240px]">Address</th>
                        <th className="w-[60px]">Company Name</th>
                        <th className="w-[50px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {branches.length > 0 ? (
                        branches.map((branch) => (
                          <tr key={branch.branch_id}>
                            <td>{branch.branch_id}</td>
                            <td>
                              <span
                                className="cursor-pointer hover:text-primary"
                                onClick={() =>
                                  navigate(
                                    `/branch-profile/${branch.branch_id}`
                                  )
                                }
                              >
                                {branch.branch_name}
                              </span>
                            </td>
                            <td>{branch.branch_address}</td>

                            <td>
                              {companies.find(
                                (company) =>
                                  company.company_id === branch.company_id
                              )?.company_name || "Not Available"}
                            </td>

                            <td>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleUpdateBranch(branch)}
                                  className="bg-yellow-100 hover:bg-yellow-200 p-2 rounded-full"
                                >
                                  <FaPencilAlt className="text-yellow-600" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteBranch(branch.branch_id)
                                  }
                                  className="bg-red-100 hover:bg-red-200 p-2 rounded-full"
                                >
                                  <FaTrash className="text-red-500" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center">
                            No branches available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BranchList;
