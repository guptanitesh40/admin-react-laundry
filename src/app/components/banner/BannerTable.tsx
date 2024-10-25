import React, { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import { useDeleteBanner, useGetBanners, } from "../../hooks";
import Swal from "sweetalert2";
import { useSearchParams } from "react-router-dom";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import TableShimmer from "../shimmer/TableShimmer";
import { BannerType } from "../../../types/enums";

interface BannerTableProps {
  search: string;
  setEditBanner: (banner_id: number) => void;
  isSubmit: boolean;
  setIsSubmit: (value : boolean) => void;
}

const BannerTable: React.FC<BannerTableProps> = ({
  search,
  setEditBanner,
  isSubmit,
  setIsSubmit
}) => {
  const { deleteBanner } = useDeleteBanner();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | null>(null);

  const pageFromParams = searchParams.get("page");
  const perPageFromParams = searchParams.get("perPage");

  const { banners, fetchBanners, totalBanners, loading } = useGetBanners(
    currentPage,
    perPage,
    search,
    sortColumn,
    sortOrder
  );

  const totalPages = Math.ceil(totalBanners / perPage);

  useEffect(() => {
    if (isSubmit) {
      fetchBanners();
      setIsSubmit(false);
    }

  }, [isSubmit,fetchBanners]);

  useEffect(() => {
    if (pageFromParams) {
      setCurrentPage(Number(pageFromParams));
    }
    if (perPageFromParams) {
      setPerPage(Number(perPageFromParams));
    }
  }, [pageFromParams, perPageFromParams]);

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

  useEffect(() => {
    fetchBanners();
  }, [perPage, currentPage, search, sortColumn, sortOrder, fetchBanners]);

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

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      sortOrder === "ASC" ? setSortOrder("DESC") : setSortOrder("ASC")
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
                        onClick={() => handleSort("banner_id")}
                      >
                        Id
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "banner_id" && sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "banner_id" && sortOrder === "DESC"
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
                    <th className="min-w-[165px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("title")}
                      >
                        Title
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "title" && sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "title" && sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>
                    <th className="min-w-[205px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("description")}
                      >
                        Description
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "description" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "description" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>
                    <th className="w-[160px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("banner_type")}
                      >
                        Banner type
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "banner_type" && sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "banner_type" && sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>
                    <th className="w-[125px]">Actions</th>
                  </tr>
                </thead>
                {loading ? (<TableShimmer/>
                ):
                banners.length > 0 ? (
                  <tbody>
                    {banners.map((banner) => (
                      <tr key={banner.banner_id}>
                        <td>{banner.banner_id}</td>
                        <td>
                          <img
                            className="rounded-lg size-20 shrink-0"
                            src={banner.image}
                          />
                        </td>
                        <td>{banner.title}</td>
                        <td className="max-w-[105px] break-words overflow-hidden">
                          {banner.description}
                        </td>
                        <td>
                          {
                            BannerType[
                              banner.banner_type as unknown as keyof typeof BannerType
                            ]
                          }
                        </td>
                        <td>
                          <button
                            className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                            onClick={() => setEditBanner(banner.banner_id)}
                          >
                            <FaPencilAlt className="text-yellow-600" />
                          </button>
                          <button
                            className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                            onClick={() => handleDeleteBanner(banner.banner_id)}
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
                        No banners available
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>

      {totalBanners > perPage && (
        <div className="flex items-center gap-4 mt-4">
          <span className="text-gray-700">
            Showing {banners.length} of {totalBanners} Branches
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

export default BannerTable;
