/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useAddPrice, usePermissions } from "../../hooks";
import { useSearchParams } from "react-router-dom";
import TableShimmerEd2 from "../shimmer/TableShimmerEd2";
import useGetPrice02 from "../../hooks/price/useGetPrice02";
import Pagination from "../pagination/Pagination";
import { searchSchema } from "../../validation/searchSchema";
import * as Yup from "yup";

interface PriceItemType {
  category_id: number;
  product_id: number;
  service_id: number;
  price: number;
  category_name: string;
  product_name: string;
  service_name: string;
}

interface FilterOptions {
  categoryId: number[];
  productId: number[];
  serviceId: number[];
}

interface PriceTableProps {
  isSave: boolean;
  setIsSave: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  filters: FilterOptions;
}

const PriceTable: React.FC<PriceTableProps> = ({
  isSave,
  setIsSave,
  setIsLoading,
  filters,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(500);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { prices, loading, count, fetchPrices } = useGetPrice02();

  const { addPrices, loading: adding } = useAddPrice();

  const [updatedPrices, setUpdatedPrices] = useState<{
    [key: string]: {
      category_id: number;
      product_id: number;
      service_id: number;
      price: number;
    };
  }>({});

  const [editing, setEditing] = useState<Set<string>>(new Set());
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | null>(null);

  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [refetch, setRefetch] = useState(false);

  const { hasPermission } = usePermissions();

  const handleEditClick = (key: string) => {
    setEditingKey(key);
  };

  const handlePriceChange = (item: PriceItemType, value: number) => {
    const key = `${item.category_id}_${item.product_id}_${item.service_id}`;
    setUpdatedPrices((prev) => ({
      ...prev,
      [key]: {
        category_id: item.category_id,
        product_id: item.product_id,
        service_id: item.service_id,
        price: value,
      },
    }));
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      if (sortOrder === "ASC") {
        setSortOrder("DESC");
      } else {
        setSortOrder("ASC");
      }
    } else {
      setSortColumn(column);
      setSortOrder("ASC");
    }
  };

  const handleInputBlur = (key: string) => {
    setEditing((prev) => {
      const updatedEditing = new Set(prev);
      updatedEditing.delete(key);
      return updatedEditing;
    });
  };

  const totalPages = Math.ceil(count / perPage);

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

  const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await searchSchema.validate(
        { search: searchInput },
        { abortEarly: false }
      );
      setSearch(searchInput);
      setErrorMessage("");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrorMessage(error.errors[0]);
      }
    }
  };

  useEffect(() => {
    if (editingKey && inputRefs.current[editingKey]) {
      inputRefs.current[editingKey].focus();
    }
  }, [editingKey]);

  useEffect(() => {
    fetchPrices({
      page_number: currentPage,
      per_page: perPage,
      sort_by: sortColumn,
      order: sortOrder,
      search: search,
      filters: filters,
    });
  }, [currentPage, perPage, sortColumn, sortOrder, search, filters, refetch]);

  useEffect(() => {
    if (search) {
      setSearchParams({ search: search });
    } else {
      setSearchParams({});
    }
  }, [search]);

  useEffect(() => {
    if (adding) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [adding]);

  useEffect(() => {
    if (!isSave) return;

    const savePrices = async () => {
      if (Object.keys(updatedPrices).length === 0) {
        setIsSave(false);
        return;
      }

      const payload = Object.values(updatedPrices);
      const result = await addPrices(payload);

      if (result) {
        setRefetch((prev) => !prev);
        setUpdatedPrices({});
      }
      setIsSave(false);
    };

    savePrices();
  }, [isSave]);

  if (loading) {
    return (
      <div className="grid gap-5 lg:gap-7.5">
        <div className="card card-grid min-w-full">
          <TableShimmerEd2
            isFilters={true}
            columns={5}
            records={20}
            isPagination={false}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-5 lg:gap-7.5 mt-4">
        <div className="card card-grid min-w-full">
          <div className="card-header card-header-space flex-wrap items-center">
            <div className="flex items-center gap-2 mb-4">
              <span>Show</span>
              <select
                className="select select-sm w-16"
                data-datatable-size="true"
                name="perpage"
                value={perPage}
                onChange={handlePerPageChange}
              >
                <option value={100}>100</option>
                <option value={500}>500</option>
                <option value={1000}>1000</option>
                <option value={1500}>1500</option>
                <option value={2000}>2000</option>
              </select>
              <span>per page</span>
            </div>

            <div className="flex items-center gap-4 flex-1 justify-end">
              <div className="flex flex-col items-end">
                <form
                  onSubmit={onSearchSubmit}
                  className="flex items-center gap-2"
                >
                  <label className="input input-sm h-10 flex items-center gap-2">
                    <input
                      type="search"
                      value={searchInput}
                      onChange={(e) => {
                        setSearchInput(e.target.value);
                        if (e.target.value === "") {
                          setSearch("");
                          setErrorMessage("");
                        }
                      }}
                      placeholder="Search..."
                      className="min-w-[185px]"
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
              <div className="scrollable-x-auto scrollable-y-auto max-h-[450px]">
                <table
                  className="table table-auto table-border"
                  data-datatable-table="true"
                >
                  <thead>
                    <tr>
                      <th className="min-w-[40px]">Id</th>
                      <th className="min-w-[250px]">
                        <span
                          className={`sort ${
                            sortColumn === "category"
                              ? sortOrder === "ASC"
                                ? "asc"
                                : "desc"
                              : ""
                          }`}
                          onClick={() => handleSort("category")}
                        >
                          <span className="sort-label">Category</span>
                          <span className="sort-icon"></span>
                        </span>
                      </th>
                      <th className="min-w-[250px]">
                        <span
                          className={`sort ${
                            sortColumn === "product"
                              ? sortOrder === "ASC"
                                ? "asc"
                                : "desc"
                              : ""
                          }`}
                          onClick={() => handleSort("product")}
                        >
                          <span className="sort-label">Product</span>
                          <span className="sort-icon"></span>
                        </span>
                      </th>
                      <th className="min-w-[250px]">
                        <span
                          className={`sort ${
                            sortColumn === "service"
                              ? sortOrder === "ASC"
                                ? "asc"
                                : "desc"
                              : ""
                          }`}
                          onClick={() => handleSort("service")}
                        >
                          <span className="sort-label">Service</span>
                          <span className="sort-icon"></span>
                        </span>
                      </th>

                      <th className="min-w-[200px]">
                        <span
                          className={`sort ${
                            sortColumn === "price"
                              ? sortOrder === "ASC"
                                ? "asc"
                                : "desc"
                              : ""
                          }`}
                          onClick={() => handleSort("price")}
                        >
                          <span className="sort-label">Price</span>
                          <span className="sort-icon"></span>
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {prices.length > 0 ? (
                      prices.map((item, index) => {
                        const {
                          price,
                          category_name,
                          category_id,
                          product_name,
                          product_id,
                          service_name,
                          service_id,
                        } = item;
                        const key = `${category_id}_${product_id}_${service_id}`;
                        const isEditing = editing.has(key);

                        return (
                          <tr
                            key={index}
                            className={`font-semibold ${
                              price ? "" : "text-red-500"
                            }`}
                          >
                            <td>{(currentPage - 1) * perPage + index + 1}</td>
                            <td>{category_name}</td>
                            <td>{product_name}</td>
                            <td>{service_name}</td>
                            <td className="relative">
                              {editingKey === key ? (
                                <input
                                  ref={(el) => (inputRefs.current[key] = el)}
                                  type="text"
                                  className="w-full h-full absolute inset-0 input input-bordered"
                                  value={
                                    updatedPrices[key]?.price !== undefined
                                      ? updatedPrices[key].price
                                      : price || ""
                                  }
                                  onChange={(e) =>
                                    handlePriceChange(
                                      item,
                                      e.target.value === ""
                                        ? 0
                                        : Number(e.target.value)
                                    )
                                  }
                                  onBlur={() => {
                                    handleInputBlur(key);
                                    setEditingKey(null);
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      setIsSave(true);
                                    }
                                  }}
                                />
                              ) : (
                                <span
                                  className={`${
                                    hasPermission(10, "update") ||
                                    hasPermission(10, "create")
                                      ? "cursor-pointer h-full flex"
                                      : "h-full flex"
                                  }`}
                                  onClick={
                                    hasPermission(10, "update") ||
                                    hasPermission(10, "create")
                                      ? () => handleEditClick(key)
                                      : undefined
                                  }
                                >
                                  {updatedPrices[key]?.price !== undefined
                                    ? updatedPrices[key].price
                                    : price || "Add Price"}
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <Pagination
                count={count}
                currentPage={currentPage}
                totalRecords={prices?.length}
                perPage={perPage}
                onPageChange={handlePageChange}
                label="prices"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceTable;
