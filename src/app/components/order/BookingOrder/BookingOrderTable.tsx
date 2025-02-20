import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchSchema } from "../../../validation/searchSchema";
import * as Yup from "yup";
import {
  useDeleteOrder,
  useGenerateInvoice,
  useGetOrders,
} from "../../../hooks";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import LoadingSpinner from "../../shimmer/Loading";
import TableShimmer from "../../shimmer/TableShimmer";
import { getOrderStatusLabel } from "../../../utils/orderStatusClasses";
import dayjs from "dayjs";
import { PaymentType } from "../../../../types/enums";
import Swal from "sweetalert2";

interface BookingOrderTableProps {
  filters: {
    paymentStatusFilter: number[];
    orderStatusFilter: number[];
    paymentTypeFilter: number | undefined;
    customerFilter: number[];
    pickupBoyFilter: number[];
    deliveryBoyFilter: number[];
    branchFilter: number[];
  };
}

const BookingOrderTable: React.FC<BookingOrderTableProps> = ({ filters }) => {
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
  const [invoiceId, setInvoiceId] = useState<any>();
  let list = "booking_list";

  const { orders, loading, totalOrders, fetchOrders } = useGetOrders(
    currentPage,
    perPage,
    search,
    sortColumn,
    sortOrder, 
    filters.orderStatusFilter,
    filters.customerFilter,
    filters.branchFilter,
    filters.pickupBoyFilter,
    filters.deliveryBoyFilter,
    filters.paymentTypeFilter,
    filters.paymentStatusFilter,
    list,
  );
  const { deleteOrder } = useDeleteOrder();
  const { generateInvoice, loading: generating } = useGenerateInvoice();

  const navigate = useNavigate();

  const totalPages = Math.ceil(totalOrders / perPage);

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

  const handleViewOrder = (order_id: number) => {
    navigate(`/order/${order_id}`, { state: { from: "OrderTable" } });
  };

  const handleDeleteOrder = async (order_id: number) => {
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
        const { success, message } = await deleteOrder(order_id);
        if (success) {
          const updatedOrders = orders.filter(
            (order) => order.order_id !== order_id
          );
          if (updatedOrders.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setSearchParams({
              page: (currentPage - 1).toString(),
              perPage: perPage.toString(),
            });
          }
          await fetchOrders();
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

  const handleUpdateOrder = (order_id: number) => {
    navigate(`/order/edit/${order_id}`, { state: { prevUrl: location.pathname}});
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

  const handleGenerateInvoice = async (order_id: number) => {
    setInvoiceId(order_id);
    await generateInvoice(order_id);
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
                  className="min-w-[185px]"
                />
                <button type="submit" className="btn btn-sm btn-icon">
                  <span>
                    <i className="ki-filled ki-magnifier"></i>
                  </span>
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
                  <th className="min-w-[90px]">
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
                      <span className="sort-label">Id</span>
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
                      <span className="sort-label">Assigned Branch</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[280px]">Order Status</th>

                  <th className="min-w-[280px]">Next Status</th>

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
                      <span className="sort-label">Mobile no</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[230px]">
                    <span
                      className={`sort ${
                        sortColumn === "address_details"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("address_details")}
                    >
                      <span className="sort-label">Shipping Address</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[150px]">
                    <span
                      className={`sort ${
                        sortColumn === "created_at"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("created_at")}
                    >
                      <span className="sort-label">Booking Date</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[150px]">
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
                      <span className="sort-label">Estimated Pickup Date</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[150px]">
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
                      <span className="sort-label">Delivery Date</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

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
                      <span className="sort-label">Bill Amount</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[135px]">
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
                      <span className="sort-label">Total Duo Amount</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[165px]">
                    <span
                      className={`sort ${
                        sortColumn === "payment_type"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("payment_type")}
                    >
                      <span className="sort-label">Payment type</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[160px]">Receipt</th>

                  <th className="w-[170px]">Actions</th>
                </tr>
              </thead>
              {loading ? (
                <TableShimmer />
              ) : orders.length > 0 ? (
                <tbody>
                  {orders.map((order) => {
                    const adminStatusClass = getOrderStatusLabel(
                      order.order_status_details.admin_label
                    );

                    const nextStepClass = getOrderStatusLabel(
                      order.order_status_details.next_step
                    );

                    return (
                      <tr key={order.order_id}>
                        <td>#{order.order_id}</td>
                        <td>
                          {order.user.first_name + " " + order.user.last_name}
                        </td>

                        <td>{order?.branch?.branch_name}</td>

                        <td>
                          <span
                            className={`${adminStatusClass} relative badge-outline badge-xl rounded-[30px]`}
                          >
                            {order.order_status_details.admin_label}
                          </span>
                        </td>

                        <td>
                          {order.order_status_details.next_step !== "NULL" && (
                            <div className="tooltip-custom">
                              <span
                                className={`${nextStepClass} badge-outline badge-xl rounded-[30px]`}
                              >
                                {order.order_status_details.next_step}
                              </span>
                              <div className="tooltip-text">
                                {order.order_status_details.description}
                              </div>
                            </div>
                          )}
                        </td>
                        <td>{order.user.mobile_number}</td>

                        <td>{order.address_details}</td>
                        <td>
                          <div className="flex items-center gap-2.5">
                            {dayjs(order.created_at).format("DD-MM-YYYY")}
                            <br />
                            {dayjs(order.created_at).format("hh:mm:ss A")}
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-2.5">
                            {dayjs(order.estimated_pickup_time).format(
                              "DD-MM-YYYY"
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-2.5">
                            {dayjs(order.estimated_delivery_time).format(
                              "DD-MM-YYYY"
                            )}
                            <br />
                          </div>
                        </td>
                        <td>{order.coupon_code}</td>
                        <td>{order.coupon_discount}</td>
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
                            className="flex items-center mr-2 btn btn-light btn-sm"
                            onClick={() =>
                              handleGenerateInvoice(order.order_id)
                            }
                            disabled={
                              generating && invoiceId === order.order_id
                            }
                          >
                            {generating && invoiceId === order.order_id ? (
                              <>
                                <i className="ki-filled ki-cheque text-2xl link"></i>
                                Receipt <LoadingSpinner />
                              </>
                            ) : (
                              <>
                                <i className="ki-filled ki-cheque text-2xl link"></i>
                                Receipt
                              </>
                            )}
                          </button>
                        </td>
                        <td>
                          <div className="flex">
                            <button
                              className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full"
                              onClick={() => handleViewOrder(order.order_id)}
                            >
                              <FaEye size={18} className="text-gray-600" />
                            </button>
                            <button
                              className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                              onClick={() => handleUpdateOrder(order.order_id)}
                            >
                              <FaPencilAlt className="text-yellow-600" />
                            </button>
                            <button
                              className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                              onClick={() => handleDeleteOrder(order.order_id)}
                            >
                              <FaTrash className="text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={5} className="text-center">
                      No Order available
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>

          {totalOrders > perPage && (
            <div className="card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium">
              <div className="flex items-center gap-4">
                <span className="text-gray-700">
                  Showing {orders.length} of {totalOrders} Orders
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

export default BookingOrderTable;
