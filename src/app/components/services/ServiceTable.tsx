import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDeleteService, useGetServices } from "../../hooks";
import Swal from "sweetalert2";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import TableShimmer from "../shimmer/TableShimmer";
import * as Yup from "yup";
import { searchSchema } from "../../validation/searchSchema";

interface ServiceTableProps {
  setEditService: (service_id: number) => void;
  isSubmit: boolean;
  setIsSubmit: (value: boolean) => void;
}

const ServiceTable: React.FC<ServiceTableProps> = ({
  isSubmit,
  setIsSubmit,
  setEditService,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | null>(null);
  const pageParams = searchParams.get("page");
  const perPageParams = searchParams.get("perPage");

  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { services, totalServices, fetchServices, loading } = useGetServices(
    currentPage,
    perPage,
    search,
    sortColumn,
    sortOrder
  );

  const totalPages = Math.ceil(totalServices / perPage);

  const { deleteService } = useDeleteService();

  useEffect(() => {
    const refetchData = async () => {
      if (isSubmit) {
        fetchServices();
        setIsSubmit(false);
      }
    };
    refetchData();
  }, [isSubmit]);

  const handleDeleteService = async (service_id: number) => {
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
        const { success, message } = await deleteService(service_id);
        if (success) {
          const updatedServices = services.filter(
            (service) => service.service_id !== service_id
          );
          if (updatedServices.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setSearchParams({
              page: (currentPage - 1).toString(),
              perPage: perPage.toString(),
            });
          }
          await fetchServices();
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
  }, [search]);

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

  return (
    <>
      <div className="card-header card-header-space flex-wrap">
        <div className="justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm mb-2 font-medium">
          <div className="flex items-center gap-2 order-2 md:order-1">
            Show
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
            per page
          </div>
        </div>

        <div className="flex flex-wrap gap-2 lg:gap-5">
          <div className="flex flex-col">
            <form onSubmit={onSearchSubmit} className="flex flex-col">
              <label className="input input-sm h-10 flex items-center">
                <input
                  type="search"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    if (e.target.value === "") {
                      setSearch("");
                    }
                  }}
                  placeholder="Search service"
                  className="w-[275px]"
                />
                <button type="submit">
                  <i className="ki-filled ki-magnifier"></i>
                </button>
              </label>
              <p className="text-red-500 text-sm">{errorMessage || "\u00A0"}</p>
            </form>
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
                        sortColumn === "service_id"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("service_id")}
                    >
                      <span className="sort-label">Id</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[250px]">
                    <span
                      className={`sort ${
                        sortColumn === "name"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("name")}
                    >
                      <span className="sort-label">Product name</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="w-[125px]">Image</th>

                  <th className="w-[125px]">Actions</th>
                </tr>
              </thead>
              {loading ? (
                <TableShimmer />
              ) : services.length > 0 ? (
                <tbody>
                  {services.map((service) => (
                    <tr key={service.service_id}>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {service.service_id}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          {service.name}
                        </div>
                      </td>
                      <td>
                        <img
                          alt={service.name}
                          className="rounded-lg size-20 shrink-0"
                          src={service.image}
                        />
                      </td>
                      <td>
                        <button
                          className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                          onClick={() => setEditService(service.service_id)}
                        >
                          <FaPencilAlt className="text-yellow-600" />
                        </button>
                        <button
                          className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                          onClick={() =>
                            handleDeleteService(service.service_id)
                          }
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
                    <td colSpan={6} className="text-center">
                      No users available
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>

          {totalServices > perPage && (
            <div className="card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium">
              <div className="flex items-center gap-4">
                <span className="text-gray-700">
                  Showing {services.length} of {totalServices} Users
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

export default ServiceTable;
