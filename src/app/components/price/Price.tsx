import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  useAddPrice,
  useGetCategories,
  useGetPrice,
  useGetProducts,
  useGetServices,
} from "../../hooks";
import Shimmer from "../shimmer";
import toast from "react-hot-toast";

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

const Price: React.FC = () => {
  const { categories } = useGetCategories();
  const { products } = useGetProducts();
  const { services } = useGetServices();
  const { prices, loading, refetch } = useGetPrice();
  const { addPrice } = useAddPrice();

  const [updatedPrices, setUpdatedPrices] = useState<{ [key: string]: number }>({});
  const [editing, setEditing] = useState<Set<string>>(new Set());
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const getCombinations = useCallback(
    (
      categories: Category[],
      products: Product[],
      services: Service[],
      prices: Price[],
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

  const handlePriceChange = (key: string, value: number) => {
    setUpdatedPrices((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    const updatedData = combinations
      .filter((combination) => {
        const key = `${combination.category.category_id}_${combination.product.product_id}_${combination.service.service_id}`;

        return (updatedPrices[key] !== undefined || combination.price > 0)
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
      await addPrice(updatedData);
      refetch();
      setEditing(new Set());
    } catch (error) {
      toast.error("Failed to save prices.");
    }
  };

  const handleEditClick = (key: string) => {
    setEditing((prev) => {
      const updatedEditing = new Set(prev);
      updatedEditing.add(key);
      return updatedEditing;
    });
  };

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

  return (
    <div>
      {loading ? (
        <Shimmer />
      ) : (
        <>
          <div>
            <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5">
              <div className="flex flex-col justify-center gap-2">
                <h1 className="text-xl font-semibold leading-none text-gray-900 py-3">
                  Price Table
                </h1>
              </div>
              <div className="flex items-center gap-2.5">
                <button className="btn btn-primary" onClick={handleSave}>
                  Save price
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="grid gap-5 lg:gap-7.5">
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
                            <th className="w-[60px]">Id</th>
                            <th className="min-w-[200px]">Category </th>
                            <th className="min-w-[200px]">Product </th>
                            <th className="min-w-[200px]">Service </th>
                            <th className="w-[200px]">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {combinations.length > 0 ? (
                            combinations.map((combination, index) => {
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
          </div>
        </>
      )}
    </div>
  );
};

export default Price;
