import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDeleteService, useGetServices, usePermissions } from "../../hooks";
import Swal from "sweetalert2";
import {
  FaPencilAlt,
  FaTrash
} from "react-icons/fa";
import TableShimmer from "../shimmer/TableShimmer";
import * as Yup from "yup";
import { searchSchema } from "../../validation/searchSchema";
import Pagination from "../pagination/Pagination";

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

  const { services, count, fetchServices, loading } = useGetServices(
    currentPage,
    perPage,
    search,
    sortColumn,
    sortOrder
  );
  const { hasPermission } = usePermissions();

  const totalPages = Math.ceil(count / perPage);

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

                  <th className="min-w-[650px]">
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

                  <th className="min-w-[125px]">Image</th>
                  {(hasPermission(7, "update") ||
                    hasPermission(7, "delete")) && (
                    <th className="min-w-[125px]">Actions</th>
                  )}
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

                      {(hasPermission(7, "update") ||
                        hasPermission(7, "delete")) && (
                        <td>
                          {hasPermission(7, "update") && (
                            <button
                              className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                              onClick={() => setEditService(service.service_id)}
                            >
                              <FaPencilAlt className="text-yellow-600" />
                            </button>
                          )}

                          {hasPermission(7, "delete") && (
                            <button
                              className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                              onClick={() =>
                                handleDeleteService(service.service_id)
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
                      No Service available
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>

          <Pagination
            count={count}
            currentPage={currentPage}
            totalRecords={services?.length}
            perPage={perPage}
            onPageChange={handlePageChange}
            label="service"
          />
        </div>
      </div>
    </>
  );
};

export default ServiceTable;
