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
import MultiSelect from "../MultiSelect/MultiSelect";
import useGetUsersByRole from "../../hooks/user/useGetUsersByRole";
import { searchSchema } from "../../validation/searchSchema";
import * as Yup from "yup";

interface OptionType {
  label: string;
  value: number;
}

interface WorkshopTableProps {
  isSubmit: boolean;
  setIsSubmit: (value: boolean) => void;
  setUpdateWorkshop: (workshop_id: number) => void;
}

const WorkshopTable: React.FC<WorkshopTableProps> = ({
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

  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const pageParams = searchParams.get("page");
  const perPageParams = searchParams.get("perPage");

  const [workshopManagers, setWorkshopManagers] = useState<OptionType[]>([]);
  const [workshopManagerFilter, setWorkshopManagerFilter] = useState<number[]>(
    []
  );

  const { fetchUsersByRole } = useGetUsersByRole();

  const { workshops, totalWorkshops, loading, fetchWorkshops } =
    useGetWorkshops(
      currentPage,
      perPage,
      search,
      sortColumn,
      sortOrder,
      workshopManagerFilter
    );

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

  useEffect(() => {
    const fetchManagers = async () => {
      const managers = await fetchUsersByRole(6);
      if (managers) {
        const formattedOptions = managers.map((manager: any) => ({
          label: `${manager.first_name} ${manager.last_name} (${manager.mobile_number})`,
          value: manager.user_id,
        }));
        setWorkshopManagers(formattedOptions);
      }
    };
    fetchManagers();
  }, []);

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
      <div className="card-header card-header-space flex flex-wrap items-center justify-between gap-4">
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
              options={workshopManagers}
              displayValue="label"
              placeholder="Search Workshop Manager"
              selectedValues={workshopManagerFilter}
              onSelect={(selectedList) =>
                setWorkshopManagerFilter(
                  selectedList.map((manager) => manager.value)
                )
              }
              onRemove={(selectedList) =>
                setWorkshopManagerFilter(
                  selectedList.map((manager) => manager.value)
                )
              }
              className="w-[300px]"
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
        <div className="scrollable-x-auto">
          <table className="table table-auto table-border">
            <thead>
              <tr>
                <th className="min-w-[90px]">
                  <span
                    className={`sort ${
                      sortColumn === "workshop_id"
                        ? sortOrder === "ASC"
                          ? "asc"
                          : "desc"
                        : ""
                    }`}
                    onClick={() => handleSort("workshop_id")}
                  >
                    <span className="sort-label">Id</span>
                    <span className="sort-icon"></span>
                  </span>{" "}
                </th>
                <th className="min-w-[200px]">
                  <span
                    className={`sort ${
                      sortColumn === "workshop_name"
                        ? sortOrder === "ASC"
                          ? "asc"
                          : "desc"
                        : ""
                    }`}
                    onClick={() => handleSort("workshop_name")}
                  >
                    <span className="sort-label">Workshop name</span>
                    <span className="sort-icon"></span>
                  </span>
                </th>
                <th className="min-w-[230px]">Workshop manager</th>
                <th className="min-w-[230px]">
                  <span
                    className={`sort ${
                      sortColumn === "address"
                        ? sortOrder === "ASC"
                          ? "asc"
                          : "desc"
                        : ""
                    }`}
                    onClick={() => handleSort("address")}
                  >
                    <span className="sort-label">Address</span>
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
                <th className="min-w-[155px]">
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
                <th className="min-w-[125px]">Actions</th>
              </tr>
            </thead>
            {loading ? (
              <TableShimmer />
            ) : workshops?.length > 0 ? (
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
                        onClick={() => setUpdateWorkshop(workshop.workshop_id)}
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
                    No Workshop available
                  </td>
                </tr>
              </tbody>
            )}
          </table>
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
