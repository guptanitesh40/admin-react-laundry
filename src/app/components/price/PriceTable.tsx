/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  useAddPrice,
  useGetCategories,
  useGetPrice,
  useGetProducts,
  useGetServices,
  usePermissions,
} from "../../hooks";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import TableShimmerEd2 from "../shimmer/TableShimmerEd2";
import Pagination from "./PricePagination";

interface Category {
  category_id: number;
  name: string;
}

interface Product {
  product_id: number;
  name: string;
}

interface Service {
  service_id: number;
  name: string;
}

interface Price {
  [key: string]: number;
}

interface Combination {
  category: Category;
  product: Product;
  service: Service;
  price: number;
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
  search: string;
  filters: FilterOptions;
}

const PriceTable: React.FC<PriceTableProps> = ({
  isSave,
  setIsSave,
  setIsLoading,
  search,
  filters,
}) => {
  const { categories } = useGetCategories(1, 1000);
  const { products } = useGetProducts(1, 1000);
  const { services } = useGetServices(1, 1000);
  const { prices, loading, fetchPrices } = useGetPrice();
  const { addPrice, loading: adding } = useAddPrice();

  const [updatedPrices, setUpdatedPrices] = useState<{ [key: string]: number }>(
    {}
  );

  const [editing, setEditing] = useState<Set<string>>(new Set());
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  const { hasPermission } = usePermissions();

  const getCombinations = useCallback(
    (
      categories: Category[],
      products: Product[],
      services: Service[],
      prices: Price[]
    ): Combination[] => {
      const combinations: Combination[] = [];

      categories.forEach((category) => {
        products.forEach((product) => {
          services.forEach((service) => {
            const key = `${category.category_id}_${product.product_id}_${service.service_id}`;
            combinations.push({
              category,
              product,
              service,
              price: prices[key] || 0,
            });
          });
        });
      });

      return combinations;
    },
    [categories, products, services, prices]
  );

  // const combinations = getCombinations(categories, products, services, prices);
  const combinations = useMemo(
    () => getCombinations(categories, products, services, prices),
    [categories, products, services, prices]
  );

  const filteredCombinations = combinations
    .filter((combination) => {
      const searchLower = (search || "").trim().toLowerCase();
      const matchesSearch =
        combination.category.name.toLowerCase().includes(searchLower) ||
        combination.product.name.toLowerCase().includes(searchLower) ||
        combination.service.name.toLowerCase().includes(searchLower);

      const matchesCategory =
        filters.categoryId.length === 0 ||
        filters.categoryId.includes(combination.category.category_id);

      const matchesProduct =
        filters.productId.length === 0 ||
        filters.productId.includes(combination.product.product_id);

      const matchesService =
        filters.serviceId.length === 0 ||
        filters.serviceId.includes(combination.service.service_id);

      return (
        matchesSearch && matchesCategory && matchesProduct && matchesService
      );
    })
    .sort((a: any, b: any) => {
      if (["category", "product", "service"].includes(sortColumn)) {
        return sortOrder === "ASC"
          ? a[sortColumn].name.localeCompare(b[sortColumn].name)
          : b[sortColumn].name.localeCompare(a[sortColumn].name);
      }
      if (sortColumn === "price") {
        return sortOrder === "ASC" ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredCombinations?.length / perPage);

  const paginatedItems = filteredCombinations.slice(
    (currentPage - 1) * perPage,
    (currentPage - 1) * perPage + perPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = Number(e.target.value);
    setPerPage(newPerPage);
    setCurrentPage(1);
    // setSearchParams({ page: "1", perPage: newPerPage.toString() });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    if (isSave) {
      const isDataChanged = combinations.some((combination) => {
        const key = `${combination.category.category_id}_${combination.product.product_id}_${combination.service.service_id}`;
        return (
          updatedPrices[key] !== undefined &&
          updatedPrices[key] !== combination.price
        );
      });

      if (!isDataChanged) {
        setIsSave(false);
        return;
      }

      const updatedData = combinations
        .map((combination) => {
          const key = `${combination.category.category_id}_${combination.product.product_id}_${combination.service.service_id}`;

          return {
            category_id: combination.category.category_id,
            product_id: combination.product.product_id,
            service_id: combination.service.service_id,
            price:
              updatedPrices[key] !== undefined
                ? updatedPrices[key]
                : combination.price,
          };
        })
        .filter((combination) => combination.price > 0);

      try {
        addPrice(updatedData).then(() => {
          fetchPrices().then(() => {
            setUpdatedPrices({});
            setEditing(new Set());
          });
        });
      } catch (error) {
        toast.error("Failed to save prices.");
      }
    }
    setIsSave(false);
  }, [isSave, addPrice, combinations, updatedPrices]);

  useEffect(() => {
    const keys = Array.from(editing);
    if (keys.length > 0) {
      const key = keys[0];
      if (inputRefs.current[key]) {
        inputRefs.current[key]?.focus();
      }
    }
  }, [editing]);

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

  const handleEditClick = (key: string) => {
    setEditing((prev) => {
      const updatedEditing = new Set(prev);
      updatedEditing.add(key);
      return updatedEditing;
    });
  };

  const handlePriceChange = (key: string, value: number) => {
    setUpdatedPrices((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      sortOrder === "ASC" ? setSortOrder("DESC") : setSortOrder("ASC");
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
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={500}>500</option>
                <option value={1000}>1000</option>
              </select>
              <span>per page</span>
            </div>
          </div>
          <div className="card-body">
            <div data-datatable="true" data-datatable-page-size="10">
              <div className="scrollable-x-auto scrollable-y-auto max-h-[500px]">
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
                    {filteredCombinations.length > 0 ? (
                      filteredCombinations
                        .slice(
                          (currentPage - 1) * perPage,
                          (currentPage - 1) * perPage + perPage
                        )
                        .map((combination, index) => {
                          const key = `${combination.category.category_id}_${combination.product.product_id}_${combination.service.service_id}`;
                          const isEditing = editing.has(key);

                          return (
                            <tr
                              key={index}
                              className={`font-semibold ${
                                combination.price ? "" : "text-red-500"
                              }`}
                            >
                              <td>{(currentPage - 1) * perPage + index + 1}</td>
                              <td>{combination.category.name}</td>
                              <td>{combination.product.name}</td>
                              <td>{combination.service.name}</td>
                              <td className="relative">
                                {isEditing ? (
                                  <input
                                    ref={(el) => (inputRefs.current[key] = el)}
                                    type="text"
                                    className="w-full h-full absolute inset-0 input input-bordered"
                                    value={
                                      updatedPrices[key] !== undefined
                                        ? updatedPrices[key]
                                        : combination.price || ""
                                    }
                                    onChange={(e) =>
                                      handlePriceChange(
                                        key,
                                        e.target.value === ""
                                          ? 0
                                          : Number(e.target.value)
                                      )
                                    }
                                    onBlur={() => handleInputBlur(key)}
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
                                    {updatedPrices[key] !== undefined
                                      ? updatedPrices[key]
                                      : combination.price || "Add Price"}
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
                count={filteredCombinations.length}
                currentPage={currentPage}
                totalRecords={paginatedItems?.length}
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
