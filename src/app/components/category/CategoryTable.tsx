import React, { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import { ImCheckmark, ImCross } from "react-icons/im";
import Swal from "sweetalert2";
import {
  useDeleteCategory,
  useGetCategories,
  useGetCategory,
  useUpdateCategory,
} from "../../hooks"; // Ensure correct imports
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import TableShimmer from "../shimmer/TableShimmer";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

interface Category {
  category_id: number;
  name: string;
}

interface CategoryTableProps {
  search: string;
  setIsSubmit: (value: boolean) => void;
  isSubmit: boolean;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  search,
  isSubmit,
  setIsSubmit,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | null>();

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParams = searchParams.get("page");
  const perPageParams = searchParams.get("perPage");

  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null
  );
  const [editingCategoryName, setEditingCategoryName] = useState<string>("");

  const { categories, totalCategories, fetchCategories, loading } =
    useGetCategories(currentPage, perPage, search, sortColumn, sortOrder);

  const { category } = useGetCategory(editingCategoryId);
  const { deleteCategory } = useDeleteCategory();
  const { updateCategory } = useUpdateCategory(fetchCategories);

  const totalPages = Math.ceil(totalCategories / perPage);

  useEffect(() => {
    if (isSubmit) {
      fetchCategories();
      setIsSubmit(false);
    }
  }, [isSubmit, fetchCategories]);

  useEffect(() => {
    if (category) {
      setEditingCategoryName(category.name || "");
    }
  }, [category]);

  const handleEditClick = (category_id: number) => {
    setEditingCategoryId(category_id);
  };

  const handleSaveEditClick = async () => {
    if (editingCategoryName.trim() === "") {
      toast.error("Category name cannot be empty.", { position: "top-center" });
      return;
    }

    if (category && editingCategoryName === category.name) {
      handleCancelEditClick();
      return;
    }

    try {
      const success = await updateCategory(
        editingCategoryId,
        editingCategoryName
      );
      if (success) {
        handleCancelEditClick();
      }
    } catch (error) {
      toast.error("An error occurred while updating the category.", {
        position: "top-center",
      });
    }
  };

  const handleCancelEditClick = () => {
    setEditingCategoryId(null);
    setEditingCategoryName("");
  };

  const handleDeleteCategory = async (category_id: number) => {
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
        const { success, message } = await deleteCategory(category_id);
        if (success) {
          await fetchCategories();
          Swal.fire(message);
        } else {
          Swal.fire(message);
        }
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.message || "An unexpected error occurred",
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
      setSearchParams({ search, page: "1", perPage: perPage.toString() });
    } else {
      setSearchParams({ page: "1", perPage: perPage.toString() });
    }
  }, [search]);

  useEffect(() => {
    fetchCategories();
  }, [perPage, currentPage, search, sortColumn, sortOrder, fetchCategories]);

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
                        onClick={() => handleSort("category_id")}
                      >
                        Id
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "category_id" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "category_id" &&
                              sortOrder === "DESC"
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
                        Category Name
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
                    <th className="w-[125px]">Actions</th>
                  </tr>
                </thead>
                {loading ? (
                  <TableShimmer />
                ) : categories.length > 0 ? (
                  <tbody>
                    {categories.map((category: Category) => (
                      <tr key={category.category_id}>
                        <td>{category.category_id}</td>
                        <td>
                          {editingCategoryId === category.category_id ? (
                            <input
                              type="text"
                              className="border border-gray-300 p-2 rounded-md focus:outline-none"
                              value={editingCategoryName}
                              onChange={(e) =>
                                setEditingCategoryName(e.target.value)
                              }
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  handleSaveEditClick();
                                }
                              }}
                            />
                          ) : (
                            category.name
                          )}
                        </td>
                        <td>
                          {editingCategoryId === category.category_id ? (
                            <>
                              <button
                                className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                                onClick={handleSaveEditClick}
                                aria-label="Save"
                              >
                                <ImCheckmark color="green" />
                              </button>
                              <button
                                className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                                onClick={handleCancelEditClick}
                                aria-label="Cancel"
                              >
                                <ImCross color="red" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                                onClick={() =>
                                  handleEditClick(category.category_id)
                                }
                                aria-label="Edit"
                              >
                                <FaPencilAlt className="text-yellow-600" />
                              </button>
                              <button
                                className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                                onClick={() =>
                                  handleDeleteCategory(category.category_id)
                                }
                                aria-label="Delete"
                              >
                                <FaTrash className="text-red-500" />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={3} className="text-center">
                        No categories found.
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>

      {totalCategories > perPage && (
        <div className="flex items-center gap-4 mt-4">
          <span className="text-gray-700">
            Showing {categories.length} of {totalCategories} Branches
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

export default CategoryTable;
