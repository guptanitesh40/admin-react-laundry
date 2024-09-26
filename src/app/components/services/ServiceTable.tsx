import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDeleteService, useGetServices } from "../../hooks";
import Swal from "sweetalert2";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { FaChevronLeft, FaChevronRight, FaPencilAlt, FaTrash } from "react-icons/fa";
import TableShimmer from "../shimmer/TableShimmer";

interface ServiceTableProps {
  search: string;
  setEditService: (service: any) => void;
  isSubmit: boolean;
  setIsSubmit: (value:boolean) => void;
}

const ServiceTable: React.FC<ServiceTableProps> = ({ search, isSubmit, setIsSubmit, setEditService }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | null>(null);
  const pageParams = searchParams.get("page");
  const perPageParams = searchParams.get("perPage");

  const { services, totalServices, fetchServices, loading } = useGetServices(
    currentPage, perPage, search, sortColumn, sortOrder
  );

  const totalPages = Math.ceil(totalServices / perPage);

  const { deleteService } = useDeleteService();

  useEffect(() => {
    if (isSubmit) {
      fetchServices();
      setIsSubmit(false);
    }

  }, [isSubmit,fetchServices]);

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
    fetchServices();
  }, [currentPage, perPage, search, sortColumn, sortOrder, fetchServices]);

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
        perPage: perPage.toString()      
      });
    }
    else
    {
      setSearchParams({
        page: "1", 
        perPage: perPage.toString()      
      });
    }
  }, [search]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortColumn(column);
      setSortOrder("ASC");
    }
    fetchServices();
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
            <option value={5}>5</option>
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
                    <th className="w-[100px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("service_id")}
                      >
                        Id
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "service_id" && sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "service_id" && sortOrder === "DESC"
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
                        onClick={() => handleSort("name")}
                      >
                        Service Name
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "name" && sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "name" && sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>
                    <th className="min-w-[200px]">
                      <div className="flex justify-between">
                        Image
                        <div className="flex "></div>
                      </div>
                    </th>
                    <th className="w-[125px]">Actions</th>
                  </tr>
                </thead>
                {loading ? (
                  <TableShimmer/>
                ) :
                services.length > 0 ? (
                  <tbody>
                    {services.map((service) => (
                      <tr key={service.service_id}>
                        <td>{service.service_id}</td>
                        <td>{service.name}</td>
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
                            onClick={() => setEditService(service)}
                          >
                            <FaPencilAlt className="text-yellow-600" />
                          </button>
                          <button
                            className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                            onClick={() => handleDeleteService(service.service_id)}
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
                      <td colSpan={4} className="text-center">
                        No services available
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
      {totalServices > perPage && (
        <div className="flex items-center gap-4 mt-4">
          <span className="text-gray-700">
            Showing {services.length} of {totalServices} Services
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

export default ServiceTable;
