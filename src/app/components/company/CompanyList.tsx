import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  FaPencilAlt,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
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
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page") || "1", 10);
  const perPage = 10;

  const { companies, refetch, loading: loadingCompany, totalCount } = useGetCompany(page, perPage);
  const { deleteCompany } = useDeleteCompany();

  const totalPages = Math.ceil(totalCount / perPage);

  useEffect(() => {
    refetch();
  }, [page, perPage, refetch]);

  const handleAddCompany = () => {
    navigate("/company/add");
  };

  const handleUpdateCompany = (company: Company) => {
    navigate(`/company/edit/${company.company_id}`, { state: { company } });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      navigate(`/companies?page=${newPage}`);
    }
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
      <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
        <div className="flex flex-wrap items-center gap-5 justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Company List</h1>
            <p className="text-lg font-medium text-gray-700">
              Total Companies: {totalCount}
            </p>
          </div>

          <div className="flex gap-5">
            <button className="btn btn-success" onClick={handleAddCompany}>
              <i className="ki-filled ki-plus-squared"></i>
              New Company
            </button>
          </div>
        </div>

        <div className="" id="companies_list">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            {loadingCompany ? (
              <ListShimmer />
            ) : (
              <>
                {totalCount === 0 ? (
                  <div className="text-center text-gray-600">
                    <p>No companies available.</p>
                  </div>
                ) : (
                  companies.map((company) => (
                    <div
                      className="card p-5 lg:p-7.5 hover:shadow-lg transition-shadow duration-300"
                      key={company.company_id}
                    >
                      <div className="flex items-center flex-wrap justify-between gap-5">
                        <div className="flex items-center gap-3.5">
                          <div className="flex items-center justify-center w-[50px]">
                            <img
                              alt=""
                              className="size-[50px] shrink-0 rounded-lg"
                              src={company.logo}
                            />
                          </div>
                          <div>
                            <span
                              className="text-lg font-semibold cursor-pointer text-gray-900 hover:text-primary"
                              onClick={() =>
                                navigate(`/company-profile/${company.company_id}`)
                              }
                            >
                              {company.company_name}
                            </span>
                            <div className="flex items-center text-sm font-medium text-gray-600">
                              {company.address}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center lg:gap-4">
                          <button
                            className="bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                            onClick={() => handleUpdateCompany(company)}
                          >
                            <FaPencilAlt className="text-yellow-600" />
                          </button>

                          <button
                            className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                            onClick={() => handleDeleteCompany(company.company_id)}
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
          </div>
        </div>

        {totalCount > perPage && (
          <div className="flex items-center gap-4 order-1 md:order-2 mt-4">
            <span>
              Showing {companies.length} of {totalCount} Companies
            </span>
            <div className="pagination" data-datatable-pagination="true">
              <button
                className={`btn ${page === 1 ? "opacity-50" : ""}`}
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                <FaChevronLeft />
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`btn ${page === index + 1 ? "active" : ""}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className={`btn ${page === totalPages ? "opacity-50" : ""}`}
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyList;
