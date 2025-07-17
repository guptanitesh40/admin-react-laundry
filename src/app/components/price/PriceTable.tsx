/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
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

  // const [search, setSearch] = useState<string>("");
  // const [searchInput, setSearchInput] = useState<string>("");
  // const [errorMessage, setErrorMessage] = useState<string>("");
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

  const combinations = getCombinations(categories, products, services, prices);

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

  // const filteredCombinations = combinations
  //   .filter((combination) => {
  //     const searchLower = (search || "").trim().toLowerCase();
  //     return (
  //       combination.category.name.toLowerCase().includes(searchLower) ||
  //       combination.product.name.toLowerCase().includes(searchLower) ||
  //       combination.service.name.toLowerCase().includes(searchLower)
  //     );
  //   })
  //   .sort((a: any, b: any) => {
  //     if (["category", "product", "service"].includes(sortColumn)) {
  //       return sortOrder === "ASC"
  //         ? a[sortColumn].name.localeCompare(b[sortColumn].name)
  //         : b[sortColumn].name.localeCompare(a[sortColumn].name);
  //     }
  //     if (sortColumn === "price") {
  //       return sortOrder === "ASC" ? a.price - b.price : b.price - a.price;
  //     }
  //     return 0;
  //   });

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

  // const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     await searchSchema.validate(
  //       { search: searchInput },
  //       { abortEarly: false }
  //     );
  //     setSearch(searchInput);
  //     setErrorMessage("");
  //   } catch (error) {
  //     if (error instanceof Yup.ValidationError) {
  //       setErrorMessage(error.errors[0]);
  //     }
  //   }
  // };

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
          <div className="card-body">
            <div data-datatable="true" data-datatable-page-size="10">
              <div className="scrollable-x-auto">
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
                      filteredCombinations.map((combination, index) => {
                        const key = `${combination.category.category_id}_${combination.product.product_id}_${combination.service.service_id}`;
                        const isEditing = editing.has(key);

                        return (
                          <tr
                            key={index}
                            className={`font-semibold ${
                              combination.price ? "" : "text-red-500"
                            }`}
                          >
                            <td>{index + 1}</td>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceTable;
