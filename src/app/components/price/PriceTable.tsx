import { useCallback, useEffect, useRef, useState } from "react";
import {
  useAddPrice,
  useGetCategories,
  useGetPrice,
  useGetProducts,
  useGetServices,
} from "../../hooks";
import Shimmer from "../shimmer/Shimmer";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

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

interface PriceTableProps {
  search: string;
  isSave: boolean;
  setIsSave: (value: boolean) => void;
}

const PriceTable: React.FC<PriceTableProps> = ({
  search,
  isSave,
  setIsSave,
}) => {
  const { categories } = useGetCategories();
  const { products } = useGetProducts();
  const { services } = useGetServices();
  const { prices, loading, fetchPrices } = useGetPrice();
  const { addPrice } = useAddPrice();

  const [updatedPrices, setUpdatedPrices] = useState<{ [key: string]: number }>(
    {}
  );
  const [editing, setEditing] = useState<Set<string>>(new Set());
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | null>(null);

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

  const filteredCombinations = combinations.filter((combination) => {
    const searchLower = search.toLowerCase();
    return (
      combination.category.name.toLowerCase().includes(searchLower) ||
      combination.product.name.toLowerCase().includes(searchLower) ||
      combination.service.name.toLowerCase().includes(searchLower)
    );
  }).sort((a: any,b: any) => {
    if(["category", "product", "service"].includes(sortColumn)) {
        return sortOrder === "ASC"
        ? a[sortColumn].name.localeCompare(b[sortColumn].name)
        : b[sortColumn].name.localeCompare(a[sortColumn].name)      
    }
    if(sortColumn === "price")
      {
          return sortOrder === "ASC"
          ? a.price - b.price
          : b.price - a.price
      }
    return 0;
  })

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
      sortOrder === "ASC" ? setSortOrder("DESC") : setSortOrder("ASC")
    } else {
      setSortColumn(column);
      setSortOrder("ASC");
    }
  };

  useEffect(() => {
    if (isSave) {
      const updatedData = filteredCombinations
        .filter((combination) => {
          const key = `${combination.category.category_id}_${combination.product.product_id}_${combination.service.service_id}`;

          return updatedPrices[key] !== undefined || combination.price > 0;
        })
        .map((combination) => ({
          category_id: combination.category.category_id,
          product_id: combination.product.product_id,
          service_id: combination.service.service_id,
          price:
            updatedPrices[
              `${combination.category.category_id}_${combination.product.product_id}_${combination.service.service_id}`
            ] || combination.price,
        }));

      try {
        addPrice(updatedData);
        fetchPrices();
        setEditing(new Set());
      } catch (error) {
        toast.error("Failed to save prices.");
      }
    }
    setIsSave(false);
  }, [isSave]);

  const handleInputBlur = (key: string) => {
    setEditing((prev) => {
      const updatedEditing = new Set(prev);
      updatedEditing.delete(key);
      return updatedEditing;
    });
  };

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

  return (
    <div>
      {loading ? (
        <Shimmer />
      ) : (
        <>
          <div className="mt-12 grid gap-5 lg:gap-7.5">
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
                          <th className="w-[100px]">                            
                            Id                            
                          </th>
                          <th className="min-w-[200px]">
                            <div
                              className="flex justify-between cursor-pointer"
                              onClick={() => handleSort("category")}
                            >
                              Category
                              <div className="flex cursor-pointer">
                                <FaArrowDownLong
                                  color={
                                    sortColumn === "category" &&
                                    sortOrder === "ASC"
                                      ? "gray"
                                      : "lightgray"
                                  }
                                />
                                <FaArrowUpLong
                                  color={
                                    sortColumn === "category" &&
                                    sortOrder === "DESC"
                                      ? "gray"
                                      : "lightgray"
                                  }
                                />
                              </div>
                            </div>{" "}
                          </th>
                          <th className="min-w-[200px]">
                            <div
                              className="flex justify-between cursor-pointer"
                              onClick={() => handleSort("product")}
                            >
                              Product
                              <div className="flex cursor-pointer">
                                <FaArrowDownLong
                                  color={
                                    sortColumn === "product" &&
                                    sortOrder === "ASC"
                                      ? "gray"
                                      : "lightgray"
                                  }
                                />
                                <FaArrowUpLong
                                  color={
                                    sortColumn === "banner_id" &&
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
                              onClick={() => handleSort("service")}
                            >
                              Service
                              <div className="flex cursor-pointer">
                                <FaArrowDownLong
                                  color={
                                    sortColumn === "service" &&
                                    sortOrder === "ASC"
                                      ? "gray"
                                      : "lightgray"
                                  }
                                />
                                <FaArrowUpLong
                                  color={
                                    sortColumn === "service" &&
                                    sortOrder === "DESC"
                                      ? "gray"
                                      : "lightgray"
                                  }
                                />
                              </div>
                            </div>
                          </th>
                          <th className="w-[200px]">
                          <div
                              className="flex justify-between cursor-pointer"
                              onClick={() => handleSort("price")}
                            >
                              Price
                              <div className="flex cursor-pointer">
                                <FaArrowDownLong
                                  color={
                                    sortColumn === "price" &&
                                    sortOrder === "ASC"
                                      ? "gray"
                                      : "lightgray"
                                  }
                                />
                                <FaArrowUpLong
                                  color={
                                    sortColumn === "price" &&
                                    sortOrder === "DESC"
                                      ? "gray"
                                      : "lightgray"
                                  }
                                />
                              </div>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCombinations.length > 0 ? (
                          filteredCombinations.map((combination, index) => {
                            const key = `${combination.category.category_id}_${combination.product.product_id}_${combination.service.service_id}`;
                            const isEditing = editing.has(key);

                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{combination.category.name}</td>
                                <td>{combination.product.name}</td>
                                <td>{combination.service.name}</td>
                                <td className="relative">
                                  {isEditing ? (
                                    <input
                                      ref={(el) =>
                                        (inputRefs.current[key] = el)
                                      }
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
                                    />
                                  ) : (
                                    <span
                                      className="cursor-pointer h-full flex"
                                      onClick={() => handleEditClick(key)}
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
      )}
    </div>
  );
};

export default PriceTable;
