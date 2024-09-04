import React, { useState, useCallback } from "react";
import { useGetCategories, useGetPrice, useGetProducts, useGetServices } from "../../hooks";
import PriceModal from "./PriceModal";
import Shimmer from "../shimmer";
import ReactPaginate from "react-paginate";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";

interface Category {
  category_id: number;
}

interface Product {
  product_id: number;
}

interface Service {
  service_id: number;
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    refetch();
  };

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

  const offset = currentPage * rowsPerPage;
  const currentCombinations = combinations.slice(offset, offset + rowsPerPage);
  const pageCount = Math.ceil(combinations.length / rowsPerPage);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <div>
      {loading ? (
        <Shimmer />
      ) : (
        <>
          <div className="container-fixed">
            <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5">
              <div className="flex flex-col justify-center gap-2">
                <h1 className="text-xl font-semibold leading-none text-gray-900 py-3">
                  Price Table
                </h1>
              </div>
              <div className="flex items-center gap-2.5">
                <button className="btn btn-primary" onClick={openModal}>
                  Add Price
                </button>
              </div>
            </div>
          </div>

          <div className="container-fixed">
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
                            <th className="w-[60px] text-center">Id</th>
                            <th className="min-w-[300px]">Category ID</th>
                            <th className="min-w-[300px]">Product ID</th>
                            <th className="min-w-[175px]">Service ID</th>
                            <th className="min-w-[175px]">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentCombinations.length > 0 ? (
                            currentCombinations.map((combination, index) => (
                              <tr key={index}>
                                <td>{offset + index + 1}</td>
                                <td>{combination.category.category_id}</td>
                                <td>{combination.product.product_id}</td>
                                <td>{combination.service.service_id}</td>
                                <td>{combination.price}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="text-center">
                                No data available
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>

                      <div className="card-footer flex justify-between items-center gap-5 text-gray-600 text-2sm font-medium">
                        <div className="flex items-center gap-2">
                          Show
                          <select
                            className="select select-sm w-16"
                            value={rowsPerPage}
                            onChange={(e) => setRowsPerPage(Number(e.target.value))}
                          >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                          </select>
                          per page
                        </div>

                        <div className="pagination inline-flex gap-1">
                          <ReactPaginate
                            previousLabel={<GrFormPrevious />}
                            nextLabel={<MdNavigateNext />}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination flex gap-1"}
                            pageClassName={"btn"}
                            pageLinkClassName={""}
                            activeClassName={"bg-gray-200 text-gray-800"}
                            previousClassName={"btn"}
                            nextClassName={"btn"}
                            breakClassName={"btn"}
                            disabledClassName={"btn disabled"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PriceModal isOpen={isModalOpen} handleClose={closeModal} />
        </>
      )}
    </div>
  );
};

export default Price;
