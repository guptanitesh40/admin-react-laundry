import { useEffect, useState } from "react";
import { useGetWorkshopOrders } from "../../hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import TableShimmer from "../shimmer/TableShimmer";
import { PaymentStatus, PaymentType } from "../../../types/enums";
import dayjs from "dayjs";
import { FaChevronLeft, FaChevronRight, FaEye } from "react-icons/fa";
import * as Yup from "yup";
import { searchSchema } from "../../validation/searchSchema";
import { getPaymentStatusLabel } from "../../utils/paymentStatusClasses";

interface WorkshopOrderTableProps {
  filters: {
    paymentStatusFilter: number[];
    workshopOrderStatusFilter: number[];
    paymentTypeFilter: number | undefined;
    customerFilter: number[];
    branchFilter: number[];
    workshopFilter: number[];
    workshopManagerFilter: number[];
  };
}

const WorkshopOrderTable: React.FC<WorkshopOrderTableProps> = ({ filters }) => {
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

  const { workshopOrders, loading, count } = useGetWorkshopOrders(
    currentPage,
    perPage,
    search,
    sortColumn,
    sortOrder,
    filters.workshopOrderStatusFilter,
    filters.customerFilter,
    filters.branchFilter,
    filters.paymentTypeFilter,
    filters.paymentStatusFilter,
    filters.workshopFilter,
    filters.workshopManagerFilter
  );

  const navigate = useNavigate();

  const totalPages = Math.ceil(count / perPage);

  useEffect(() => {
    if (pageParams) {
      setCurrentPage(Number(pageParams));
    }
    if (perPageParams) {
      setPerPage(Number(perPageParams));
    }
  }, [pageParams, perPageParams]);

  const handleViewOrder = (order_id: number) => {
    navigate(`/order/${order_id}`, { state: { from: "WorkshopOrderTable" } });
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
                  className="min-w-[200px] flex-grow"
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
                  <th className="min-w-[115px]">
                    <span
                      className={`sort ${
                        sortColumn === "order_id"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("order_id")}
                    >
                      <span className="sort-label">Order Id</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[240px]">
                    <span
                      className={`sort ${
                        sortColumn === "first_name"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("first_name")}
                    >
                      <span className="sort-label">Customer</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[200px]">
                    <span
                      className={`sort ${
                        sortColumn === "branch_id"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("branch_id")}
                    >
                      <span className="sort-label">Branch</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[200px]">
                    <span
                      className={`sort ${
                        sortColumn === "workshop_name"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("workshop_name")}
                    >
                      <span className="sort-label">Workshop name</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[200px]">Workshop Manager</th>

                  <th className="min-w-[140px]">
                    <span
                      className={`sort ${
                        sortColumn === "mobile_number"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("mobile_number")}
                    >
                      <span className="sort-label">Mobile No</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[280px]">Shipping address</th>

                  <th className="min-w-[130px]">
                    <span
                      className={`sort ${
                        sortColumn === "coupon_code"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("coupon_code")}
                    >
                      <span className="sort-label">Coupon code</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[130px]">
                    <span
                      className={`sort ${
                        sortColumn === "coupon_discount"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("coupon_discount")}
                    >
                      <span className="sort-label">Coupon discount</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[220px]">Order Status</th>

                  <th className="min-w-[200px]">
                    <span
                      className={`sort ${
                        sortColumn === "estimated_delivery_time"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("estimated_delivery_time")}
                    >
                      <span className="sort-label">
                        Estimated delivery time
                      </span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[200px]">
                    <span
                      className={`sort ${
                        sortColumn === "estimated_pickup_time"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("estimated_pickup_time")}
                    >
                      <span className="sort-label">Estimated pickup time</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[140px]">
                    <span
                      className={`sort ${
                        sortColumn === "shipping_charges"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("shipping_charges")}
                    >
                      <span className="sort-label">Shipping charge</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[180px]">
                    <span
                      className={`sort ${
                        sortColumn === "express_delivery_charges"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("express_delivery_charges")}
                    >
                      <span className="sort-label">
                        Express delivery charges
                      </span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[130px]">
                    <span
                      className={`sort ${
                        sortColumn === "sub_total"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("sub_total")}
                    >
                      <span className="sort-label">Sub total</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[105px]">
                    <span
                      className={`sort ${
                        sortColumn === "total"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("total")}
                    >
                      <span className="sort-label">Total</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[165px]">Payment type</th>

                  <th className="min-w-[50px]">Action</th>                                    
                </tr>
              </thead>
              {loading ? (
                <TableShimmer />
              ) : workshopOrders?.length > 0 ? (
                <tbody>
                  {workshopOrders.map((order) => {
                    return (
                      <tr key={order.order_id}>
                        <td>#{order.order_id}</td>
                        <td>
                          {order.user.first_name} {order.user.last_name}
                        </td>
                        <td>{order.branch.branch_name}</td>
                        <td>{order.workshop.workshop_name}</td>
                        <td>
                          {order.workshop.workshopManagerMappings
                            .map(
                              (mapping: any) =>
                                `${mapping.user.first_name} ${mapping.user.last_name}`
                            )
                            .join(", ")}
                        </td>
                        <td>{order.user.mobile_number}</td>
                        <td>{order.address_details}</td>
                        <td>{order.coupon_code}</td>
                        <td>{order.coupon_discount}</td>
                        <td>
                          <span className="badge badge-outline rounded-[30px]">
                            {order.workshop_status_name}
                          </span>
                        </td>
                        <td>
                          <div className="flex flex-col">
                            {dayjs(order.estimated_delivery_time).format(
                              "DD-MM-YYYY"
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-col">
                            {dayjs(order.estimated_pickup_time).format(
                              "DD-MM-YYYY"
                            )}
                          </div>
                        </td>
                        <td>{order.shipping_charges}</td>
                        <td>{order.express_delivery_charges}</td>
                        <td>{order.sub_total}</td>
                        <td>{order.total}</td>
                        <td>
                          {
                            PaymentType[
                              order.payment_type as keyof typeof PaymentType
                            ]
                          }
                        </td>

                        <td>
                          <button
                            className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full"
                            onClick={() => handleViewOrder(order.order_id)}
                          >
                            <FaEye size={18} className="text-gray-600" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={5} className="text-center">
                      No Orders available
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>

          {count > perPage && (
            <div className="card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium">
              <div className="flex items-center gap-4">
                <span className="text-gray-700">
                  Showing {workshopOrders.length} of {count} Workshop order
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
                      className={`btn ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`btn ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WorkshopOrderTable;
