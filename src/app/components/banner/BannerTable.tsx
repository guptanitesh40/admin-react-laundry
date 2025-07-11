import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useDeleteBanner, useGetBanners, usePermissions } from "../../hooks";
import Swal from "sweetalert2";
import { useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { searchSchema } from "../../validation/searchSchema";
import { BannerType } from "../../../types/enums";
import { getBannerTypeLabel } from "../../utils/bannerTypeLabel";
import Pagination from "../pagination/Pagination";
import TableShimmerEd2 from "../shimmer/TableShimmerEd2";

interface BannerTableProps {
  setEditBanner: (banner_id: number) => void;
  isSubmit: boolean;
  setIsSubmit: (value: boolean) => void;
}

const BannerTable: React.FC<BannerTableProps> = ({
  setEditBanner,
  isSubmit,
  setIsSubmit,
}) => {
  const { deleteBanner } = useDeleteBanner();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | null>(null);

  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const pageFromParams = searchParams.get("page");
  const perPageFromParams = searchParams.get("perPage");

  const [bannerTypeFilter, setBannerTypeFilter] = useState<number>();

  const { banners, fetchBanners, count, loading } = useGetBanners(
    currentPage,
    perPage,
    search,
    sortColumn,
    sortOrder,
    bannerTypeFilter
  );
  const { hasPermission } = usePermissions();

  const totalPages = Math.ceil(count / perPage);

  useEffect(() => {
    const refetchData = async () => {
      if (isSubmit) {
        fetchBanners();
        setIsSubmit(false);
      }
    };
    refetchData();
  }, [isSubmit]);

  useEffect(() => {
    if (pageFromParams) {
      setCurrentPage(Number(pageFromParams));
    }
    if (perPageFromParams) {
      setPerPage(Number(perPageFromParams));
    }
  }, [pageFromParams, perPageFromParams]);

  useEffect(() => {
    setCurrentPage(1);
    if (search !== "") {
      setSearchParams({ search, page: "1", perPage: perPage.toString() });
    } else {
      setSearchParams({});
    }
  }, [search]);

  useEffect(() => {
    setCurrentPage(1);
    if (search !== "") {
      setSearchParams({ search, page: "1", perPage: perPage.toString() });
    } else {
      setSearchParams({});
    }
  }, [bannerTypeFilter]);

  const handleDeleteBanner = async (banner_id: number) => {
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
        const { success, message } = await deleteBanner(banner_id);
        if (success) {
          const updatedBanners = banners.filter(
            (banner) => banner.banner_id !== banner_id
          );
          if (updatedBanners.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setSearchParams({
              page: (currentPage - 1).toString(),
              perPage: perPage.toString(),
            });
          }
          await fetchBanners();
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

  if (loading) {
    return (
      <TableShimmerEd2
        isFilters={true}
        columns={6}
        records={5}
        isPagination={false}
      />
    );
  }

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
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
          <span>per page</span>
        </div>

        <div className="flex flex-wrap gap-2 lg:gap-5 mb-3">
          <div className="flex flex-wrap gap-2.5">
            <select
              className="select select-lg w-[170px] text-sm"
              value={bannerTypeFilter}
              onChange={(e) => {
                setBannerTypeFilter(Number(e.target.value));
              }}
            >
              <option value="" selected>
                Banner Type
              </option>
              <option value={1}>Website</option>
              <option value={2}>App</option>
              <option value={3}>Both</option>
            </select>
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
                        sortColumn === "banner_id"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("banner_id")}
                    >
                      <span className="sort-label">Id</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[115px]">Image</th>

                  <th className="min-w-[160px]">
                    <span
                      className={`sort ${
                        sortColumn === "title"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("title")}
                    >
                      <span className="sort-label">Title</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[205px]">
                    <span
                      className={`sort ${
                        sortColumn === "description"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("description")}
                    >
                      <span className="sort-label">Description</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[130px]">Banner type</th>

                  {(hasPermission(14, "update") ||
                    hasPermission(14, "delete")) && (
                    <th className="min-w-[125px]">Actions</th>
                  )}
                </tr>
              </thead>
              {banners.length > 0 ? (
                <tbody>
                  {banners.map((banner) => (
                    <tr key={banner.banner_id}>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {banner.banner_id}
                        </div>
                      </td>
                      <td>
                        <img
                          alt={banner.image}
                          className="rounded-lg size-20 shrink-0"
                          src={banner.image}
                        />
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          {banner.title}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          {banner.description}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`mt-1 rounded-md text-sm ${getBannerTypeLabel(
                            banner.banner_type
                          )}`}
                        >
                          {
                            BannerType[
                              banner.banner_type as unknown as keyof typeof BannerType
                            ]
                          }
                        </span>
                      </td>
                      {(hasPermission(14, "update") ||
                        hasPermission(14, "delete")) && (
                        <td>
                          {hasPermission(14, "update") && (
                            <button
                              className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                              onClick={() => setEditBanner(banner.banner_id)}
                            >
                              <FaPencilAlt className="text-yellow-600" />
                            </button>
                          )}
                          {hasPermission(14, "delete") && (
                            <button
                              className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                              onClick={() =>
                                handleDeleteBanner(banner.banner_id)
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
                      No banner available
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>

      <Pagination
        count={count}
        currentPage={currentPage}
        totalRecords={banners?.length}
        perPage={perPage}
        onPageChange={handlePageChange}
        label="banners"
      />
    </>
  );
};

export default BannerTable;
