/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  useDeleteCategory,
  useGetCategories,
  usePermissions,
  useUpdateCategory,
} from "../../hooks"; // Ensure correct imports
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { searchSchema } from "../../validation/searchSchema";
import { ImCheckmark, ImCross } from "react-icons/im";
import Pagination from "../pagination/Pagination";
import TableShimmerEd2 from "../shimmer/TableShimmerEd2";

interface CategoryTableProps {
  setIsSubmit: (value: boolean) => void;
  isSubmit: boolean;
}

interface EditCategoryData {
  name: string;
  name_gujarati: string;
  name_hindi: string;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
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
  const [editingCategoryData, setEditingCategoryData] =
    useState<EditCategoryData>({
      name: "",
      name_gujarati: "",
      name_hindi: "",
    });

  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { categories, count, fetchCategories, loading } = useGetCategories(
    currentPage,
    perPage,
    search,
    sortColumn,
    sortOrder
  );
  const { deleteCategory } = useDeleteCategory();
  const { updateCategory } = useUpdateCategory();
  const { hasPermission } = usePermissions();

  const totalPages = Math.ceil(count / perPage);

  useEffect(() => {
    if (isSubmit) {
      fetchCategories();
      setIsSubmit(false);
    }
  }, [isSubmit, fetchCategories]);

  const handleEditClick = (
    category_id: number,
    name: string,
    name_gujarati: string,
    name_hindi: string
  ) => {
    setEditingCategoryId(category_id);
    setEditingCategoryData({
      name: name,
      name_gujarati: name_gujarati,
      name_hindi: name_hindi,
    });
  };

  const handleSaveEditClick = async () => {
    if (editingCategoryData.name.trim() === "") {
      toast.error("Category name cannot be empty.", { position: "top-center" });
      return;
    }

    try {
      const success = await updateCategory(
        editingCategoryId,
        editingCategoryData
      );
      if (success) {
        handleCancelEditClick();
        fetchCategories();
      }
    } catch {
      toast.error("An error occurred while updating the category.", {
        position: "top-center",
      });
    }
  };

  const handleCancelEditClick = () => {
    setEditingCategoryId(null);
    setEditingCategoryData({
      name: "",
      name_gujarati: "",
      name_hindi: "",
    });
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

  if (loading) {
    return (
      <TableShimmerEd2
        isFilters={true}
        isPagination={false}
        columns={3}
        records={5}
      />
    );
  }

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
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
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
                        sortColumn === "category_id"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("category_id")}
                    >
                      <span className="sort-label">Id</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[260px]">
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
                      <span className="sort-label">English name</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[260px]">
                    <span className="sort-label">Gujarati name</span>
                  </th>

                  <th className="min-w-[260px]">
                    <span className="sort-label">Hindi name</span>
                  </th>

                  {(hasPermission(5, "update") ||
                    hasPermission(5, "delete")) && (
                    <th className="min-w-[125px]">Actions</th>
                  )}
                </tr>
              </thead>
              {categories.length > 0 ? (
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.category_id}>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {category.category_id}
                        </div>
                      </td>
                      <td>
                        {editingCategoryId === category.category_id ? (
                          <input
                            type="text"
                            className="border border-gray-300 p-2 rounded-md focus:outline-none"
                            value={editingCategoryData.name}
                            onChange={(e) =>
                              setEditingCategoryData((prev) => {
                                return {
                                  ...prev,
                                  name: e.target.value,
                                };
                              })
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
                          <input
                            type="text"
                            className="border border-gray-300 p-2 rounded-md focus:outline-none"
                            value={editingCategoryData.name_gujarati}
                            onChange={(e) =>
                              setEditingCategoryData((prev) => {
                                return {
                                  ...prev,
                                  name_gujarati: e.target.value,
                                };
                              })
                            }
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleSaveEditClick();
                              }
                            }}
                          />
                        ) : (
                          category.name_gujarati
                        )}
                      </td>
                      <td>
                        {editingCategoryId === category.category_id ? (
                          <input
                            type="text"
                            className="border border-gray-300 p-2 rounded-md focus:outline-none"
                            value={editingCategoryData.name_hindi}
                            onChange={(e) =>
                              setEditingCategoryData((prev) => {
                                return {
                                  ...prev,
                                  name_hindi: e.target.value,
                                };
                              })
                            }
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleSaveEditClick();
                              }
                            }}
                          />
                        ) : (
                          category.name_hindi
                        )}
                      </td>

                      {(hasPermission(5, "update") ||
                        hasPermission(5, "delete")) && (
                        <td>
                          {editingCategoryId === category.category_id ? (
                            hasPermission(5, "update") && (
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
                            )
                          ) : (
                            <>
                              {hasPermission(5, "update") && (
                                <button
                                  className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                                  onClick={() =>
                                    handleEditClick(
                                      category.category_id,
                                      category.name,
                                      category.name_gujarati,
                                      category.name_hindi
                                    )
                                  }
                                  aria-label="Edit"
                                >
                                  <FaPencilAlt className="text-yellow-600" />
                                </button>
                              )}
                              {hasPermission(5, "delete") && (
                                <button
                                  className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                                  onClick={() =>
                                    handleDeleteCategory(category.category_id)
                                  }
                                  aria-label="Delete"
                                >
                                  <FaTrash className="text-red-500" />
                                </button>
                              )}
                            </>
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
                      No Category available
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>

          <Pagination
            count={count}
            currentPage={currentPage}
            totalRecords={categories?.length}
            perPage={perPage}
            onPageChange={handlePageChange}
            label="category"
          />
        </div>
      </div>
    </>
  );
};

export default CategoryTable;
