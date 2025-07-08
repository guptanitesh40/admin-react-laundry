import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDeleteProduct, useGetProducts, usePermissions } from "../../hooks";
import Swal from "sweetalert2";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import * as Yup from "yup";
import { searchSchema } from "../../validation/searchSchema";
import Pagination from "../pagination/Pagination";
import TableShimmerEd2 from "../shimmer/TableShimmerEd2";

interface ProductTableProps {
  setEditProduct: (product_id: number) => void;
  isSubmit: boolean;
  setIsSubmit: (value: boolean) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  setEditProduct,
  isSubmit,
  setIsSubmit,
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

  const { products, count, loading, fetchProducts } = useGetProducts(
    currentPage,
    perPage,
    search,
    sortColumn,
    sortOrder
  );
  const { hasPermission } = usePermissions();

  const totalPages = Math.ceil(count / perPage);

  useEffect(() => {
    if (isSubmit) {
      fetchProducts();
      setIsSubmit(false);
    }
  }, [isSubmit, fetchProducts]);

  const { deleteProduct } = useDeleteProduct();

  const handleDeleteProduct = async (product_id: number) => {
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
        const { success, message } = await deleteProduct(product_id);
        if (success) {
          const updatedProducts = products.filter(
            (product) => product.product_id !== product_id
          );
          if (updatedProducts.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setSearchParams({
              page: (currentPage - 1).toString(),
              perPage: perPage.toString(),
            });
          }
          await fetchProducts();
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

  if (loading) {
    return (
      <TableShimmerEd2
        isFilters={true}
        columns={4}
        records={10}
        isPagination={true}
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
                        sortColumn === "product_id"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("product_id")}
                    >
                      <span className="sort-label">Id</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[230px]">
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

                  <th className="min-w-[230px]">
                    <span className="sort-label">Gujarati name</span>
                  </th>

                  <th className="min-w-[230px]">
                    <span className="sort-label">Hindi name</span>
                  </th>

                  <th className="min-w-[125px]">
                    <div className="flex justify-between">
                      Image
                      <div className="flex "></div>
                    </div>
                  </th>

                  {(hasPermission(6, "update") ||
                    hasPermission(6, "delete")) && (
                    <th className="min-w-[125px]">Actions</th>
                  )}
                </tr>
              </thead>
              {products.length > 0 ? (
                <tbody>
                  {products.map((product) => (
                    <tr key={product.product_id}>
                      <td>
                        <div className="flex items-center gap-2.5">
                          {product.product_id}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          {product.name}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          {product.name_gujarati}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          {product.name_hindi}
                        </div>
                      </td>
                      <td>
                        <img
                          alt={product.name}
                          className="rounded-lg size-20 shrink-0"
                          src={product.image}
                        />
                      </td>

                      {(hasPermission(6, "update") ||
                        hasPermission(6, "delete")) && (
                        <td>
                          {hasPermission(6, "update") && (
                            <button
                              className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                              onClick={() => setEditProduct(product.product_id)}
                            >
                              <FaPencilAlt className="text-yellow-600" />
                            </button>
                          )}

                          {hasPermission(6, "delete") && (
                            <button
                              className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                              onClick={() =>
                                handleDeleteProduct(product.product_id)
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
                      No Product available
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>

          <Pagination
            count={count}
            currentPage={currentPage}
            totalRecords={products?.length}
            perPage={perPage}
            onPageChange={handlePageChange}
            label="products"
          />
        </div>
      </div>
    </>
  );
};

export default ProductTable;
