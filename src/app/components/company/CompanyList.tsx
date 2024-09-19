import React, { useState, useEffect } from "react";
import {
  FaPencilAlt,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDeleteCompany, useGetCompany } from "../../hooks";
import ListShimmer from "../shimmer/ListShimmer";

interface Company {
  company_id: number;
  company_name: string;
  address: string;
  logo: string;
}

const CompanyList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromParams = searchParams.get("page");

  const {
    companies,
    refetch,
    loading: loadingCompany,
    totalCount,
  } = useGetCompany(currentPage, perPage);
  const { deleteCompany } = useDeleteCompany();

  useEffect(() => {
    if (pageFromParams) {
      setCurrentPage(Number(pageFromParams));
    }
  }, [pageFromParams]);

  useEffect(() => {
    refetch(); 
  }, [currentPage, refetch]);

  const totalPages = Math.ceil(totalCount / perPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setSearchParams({ page: newPage.toString() });
    }
  };

  const handleAddCompany = () => {
    navigate("/company/add");
  };

  const handleUpdateCompany = (company: Company) => {
    navigate(`/company/edit/${company.company_id}`, { state: { company } });
  };

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
          refetch();
          Swal.fire("Deleted!", message, "success");
        } else {
          Swal.fire("Failed!", message, "error");
        }
      } else {
        Swal.fire("Cancelled", "The company is safe :)", "info");
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
      {loadingCompany ? (
        <ListShimmer />
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-semibold leading-none text-gray-900 py-3">
                Company List
              </h1>
              <span className="text-lg text-gray-700">
                Total Companies: {totalCount}
              </span>
            </div>
            <button onClick={handleAddCompany} className="btn btn-primary">
              Add Company
            </button>
          </div>

          <div>
            <div className="grid gap-5 lg:gap-7.5">
              <div className="card card-grid min-w-full">
                <div className="card-body">
                  <table className="table table-auto table-border">
                    <thead>
                      <tr>
                        <th className="w-[60px]">Id</th>
                        <th className="min-w-[200px]">Company Name</th>
                        <th className="min-w-[240px]">Address</th>
                        <th className="w-[50px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {companies.length > 0 ? (
                        companies.map((company) => (
                          <tr key={company.company_id}>
                            <td>{company.company_id}</td>
                            <td>
                              <span
                                className="cursor-pointer hover:text-primary"
                                onClick={() =>
                                  navigate(
                                    `/company-profile/${company.company_id}`
                                  )
                                }
                              >
                                {company.company_name}
                              </span>
                            </td>
                            <td>{company.address}</td>
                            <td>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleUpdateCompany(company)}
                                  className="bg-yellow-100 hover:bg-yellow-200 p-2 rounded-full"
                                >
                                  <FaPencilAlt className="text-yellow-600" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteCompany(company.company_id)
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
                            No companies available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {totalCount > perPage && (
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-gray-700">
                    Showing {companies.length} of {totalCount} Companies
                  </span>

                  <div className="pagination" data-datatable-pagination="true">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={`btn ${currentPage === 1 ? "disabled" : ""}`}
                    >
                      <FaChevronLeft />
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`btn ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
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

export default CompanyList;
