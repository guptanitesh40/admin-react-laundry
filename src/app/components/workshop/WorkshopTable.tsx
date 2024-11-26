import React, { useEffect, useState } from "react";
import TableShimmer from "../shimmer/TableShimmer";
import { useDeleteWorkshop, useGetWorkshops } from "../../hooks";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import Swal from "sweetalert2";

interface WorkshopTableProps {
  search: string;
  isSubmit: boolean;
  setIsSubmit: (value: boolean) => void;
  setUpdateWorkshop: (workshop_id: number) => void;
}

const WorkshopTable: React.FC<WorkshopTableProps> = ({
  search,
  isSubmit,
  setIsSubmit,
  setUpdateWorkshop,
}) => {
  const { deleteWorkshop } = useDeleteWorkshop();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | null>(null);

  const pageParams = searchParams.get("page");
  const perPageParams = searchParams.get("perPage");

  const { workshops, totalWorkshops, loading, fetchWorkshops } =
    useGetWorkshops(currentPage, perPage, search, sortColumn, sortOrder);

  const totalPages = Math.ceil(totalWorkshops / perPage);

  useEffect(() => {
    const refetchData = async () => {
      if (isSubmit) {
        fetchWorkshops();
        setIsSubmit(false);
      }
    };
    refetchData();
  }, [isSubmit]);

  const handleDeleteWorkshop = async (workshop_id: number) => {
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
        const { success, message } = await deleteWorkshop(workshop_id);
        if (success) {
          const updatedWorkshops = workshops.filter(
            (workshop) => workshop.workshop_id !== workshop_id
          );
          if (updatedWorkshops.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setSearchParams({
              page: (currentPage - 1).toString(),
              perPage: perPage.toString(),
            });
          }
          await fetchWorkshops();
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

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
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

      <div className="grid gap-5 lg:gap-5.5">
        <div className="card card-grid min-w-full">
          <div className="card-body">
            <div className="scrollable-x-auto">
              <table className="table table-auto table-border">
                <thead>
                  <tr>
                    <th className="min-w-[90px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("workshop_id")}
                      >
                        Id
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "workshop_id" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "workshop_id" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>
                    <th className="min-w-[200px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("workshop_name")}
                      >
                        Workshop name
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "workshop_name" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "workshop_name" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>
                    <th className="min-w-[230px]">Workshop manager</th>
                    <th className="min-w-[230px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("address")}
                      >
                        Address
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "address" && sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "address" && sortOrder === "DESC"
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
                    <th className="min-w-[155px]">
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
                    <th className="min-w-[125px]">Actions</th>
                  </tr>
                </thead>
                {loading ? (
                  <TableShimmer />
                ) : workshops ? (
                  <tbody>
                    {workshops.map((workshop) => (
                      <tr key={workshop.workshop_id}>
                        <td>{workshop.workshop_id}</td>
                        <td>{workshop.workshop_name}</td>
                        <td>
                          {workshop.workshop_managers
                            .map((manager: any) => manager.full_name)
                            .join(", ")}
                        </td>
                        <td>{workshop.address}</td>
                        <td>{workshop.email}</td>
                        <td>{workshop.mobile_number}</td>
                        <td>
                          <button
                            className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                            onClick={() =>
                              setUpdateWorkshop(workshop.workshop_id)
                            }
                          >
                            <FaPencilAlt className="text-yellow-600" />
                          </button>
                          <button
                            className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                            onClick={() =>
                              handleDeleteWorkshop(workshop.workshop_id)
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
                      <td colSpan={5} className="text-center">
                        No workshops available
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>

      {totalWorkshops > perPage && (
        <div className="flex items-center gap-4 mt-4">
          <span className="text-gray-700">
            Showing {workshops.length} of {totalWorkshops} Branches
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

export default WorkshopTable;
