import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchSchema } from "../../../validation/searchSchema";
import * as Yup from "yup";
import {
  useDeleteOrder,
  useGenerateInvoice,
  useGetOrders,
  usePermissions,
} from "../../../hooks";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import LoadingSpinner from "../../shimmer/LoadingSpinner";
import { getOrderStatusLabel } from "../../../utils/orderStatusClasses";
import dayjs from "dayjs";
import { PaymentType } from "../../../../types/enums";
import Swal from "sweetalert2";
import Pagination from "../../pagination/Pagination";
import TableShimmerEd2 from "../../shimmer/TableShimmerEd2";
import { IoPrint } from "react-icons/io5";
import toast from "react-hot-toast";

interface DeliveredOrderTableProps {
  filters: {
    end_date: string;
    start_date: string;
    paymentStatusFilter: number[];
    orderStatusFilter: number[];
    paymentTypeFilter: number | undefined;
    customerFilter: number[];
    pickupBoyFilter: number[];
    deliveryBoyFilter: number[];
    branchFilter: number[];
  };
}

const DeliveredOrderTable: React.FC<DeliveredOrderTableProps> = ({
  filters,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(50);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | null>(null);

  const pageParams = searchParams.get("page");
  const perPageParams = searchParams.get("perPage");

  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [invoiceId, setInvoiceId] = useState<any>();
  const list = "order_list";
  const orderList = "delivered_order";

  const { orderData, loading, count, fetchOrders } = useGetOrders(
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
    filters.start_date,
    filters.end_date,
    list,
    orderList
  );
  const { deleteOrder } = useDeleteOrder();
  const { generateInvoice, loading: generating } = useGenerateInvoice();
  const { hasPermission } = usePermissions();

  const navigate = useNavigate();

  const totalPages = Math.ceil(count / perPage);

  const {
    orders = [],
    total_amount = 0,
    paid_amount = 0,
    total_quantity = 0,
    kasar_amount = 0,
  } = orderData || {};

  useEffect(() => {
    if (pageParams) {
      setCurrentPage(Number(pageParams));
    }
    if (perPageParams) {
      setPerPage(Number(perPageParams));
    }
  }, [pageParams, perPageParams]);

  useEffect(() => {
    setCurrentPage(1);
    if (search !== "") {
      setSearchParams({ search, page: "1", perPage: perPage.toString() });
    } else {
      setSearchParams({});
    }
  }, [search]);

  useEffect(() => {
    setCurrentPage(1);
    if (search !== "") {
      setSearchParams({ search, page: "1", perPage: perPage.toString() });
    } else {
      setSearchParams({});
    }
  }, [
    filters.paymentStatusFilter,
    filters.orderStatusFilter,
    filters.paymentTypeFilter,
    filters.customerFilter,
    filters.pickupBoyFilter,
    filters.deliveryBoyFilter,
    filters.branchFilter,
    filters.start_date,
    filters.end_date,
  ]);

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

  const handleDownloadInvoice = (order: any) => {
    const fileUrl = order?.order_invoice?.fileUrl;

    if (fileUrl) {
      window.open(fileUrl, "_blank");
    } else {
      toast.error("Please generate the invoice before downloading.");
    }
  };

  const handleUpdateOrder = (order_id: number) => {
    navigate(`/order/edit/${order_id}`, {
      state: { prevUrl: location.pathname },
    });
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

  const getActionDoenBy = (log: any, key: string) => {
    const data = log.find((item: any) => item?.type === key);
    if (!log.length || !key || !data) {
      return "";
    }
    return `${data.user.first_name} ${data.user.last_name}`;
  };

  if (loading) {
    return (
      <TableShimmerEd2
        isFilters={true}
        isPagination={true}
        columns={5}
        records={10}
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
          <div className="scrollable-x-auto scrollable-y-auto max-h-[500px]">
            <table
              className="table table-auto table-border"
              data-datatable-table="true"
            >
              <thead>
                <tr>
                  <th className="min-w-[100px]">
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
                      <span className="sort-label">Order Number</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="w-[75px]">Print</th>

                  <th className="min-w-[200px]">
                    <span
                      className={`sort ${
                        sortColumn === "branch_name"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("branch_name")}
                    >
                      <span className="sort-label">Branch</span>
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
                      <span className="sort-label">Customer Name</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[280px]">Current Status</th>

                  <th className="min-w-[120px]">Qty</th>

                  <th className="min-w-[180px]">
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
                      <span className="sort-label">Booking Amount</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[150px]">
                    <span
                      className={`sort ${
                        sortColumn === "total"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("paid_amount")}
                    >
                      <span className="sort-label">Paid Amount</span>
                      <span className="sort-icon"></span>
                    </span>
                  </th>

                  <th className="min-w-[155px]">
                    <span
                      className={`sort ${
                        sortColumn === "total"
                          ? sortOrder === "ASC"
                            ? "asc"
                            : "desc"
                          : ""
                      }`}
                      onClick={() => handleSort("kasar_amount")}
                    >
                      <span className="sort-label">Kasar Amount</span>
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
                      <span className="sort-label">Pickup Date</span>
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

                  <th className="min-w-[150px]">
                    <span className="sort-label">Confirmed By</span>
                  </th>

                  <th className="min-w-[150px]">
                    <span className="sort-label">Workshop By</span>
                  </th>

                  <th className="min-w-[150px]">
                    <span className="sort-label">Delivered By</span>
                  </th>

                  {(hasPermission(3, "read") ||
                    hasPermission(3, "update") ||
                    hasPermission(3, "delete")) && (
                    <th className="w-[170px]">Actions</th>
                  )}
                </tr>
              </thead>
              {orders?.length > 0 ? (
                <tbody>
                  <tr className="bg-blue-50 text-blue-900 font-semibold border-t border-blue-100">
                    <td colSpan={3}>Total Count : {count}</td>
                    <td></td>
                    <td></td>
                    <td>{total_quantity}</td>
                    <td>{total_amount}</td>
                    <td>{paid_amount}</td>
                    <td>{kasar_amount}</td>
                    <td colSpan={8}></td>
                  </tr>

                  {orders?.map((order) => {
                    const adminStatusClass = getOrderStatusLabel(
                      order?.order_status_details?.admin_label
                    );

                    return (
                      <tr key={order?.order_id}>
                        <td
                          className="cursor-pointer text-blue-600 hover:underline"
                          onClick={() => navigate(`/order/${order?.order_id}`)}
                        >
                          #{order?.order_id}
                        </td>

                        <td>
                          {hasPermission(3, "read") && (
                            <button
                              className="p-3 rounded-full bg-teal-100 hover:bg-teal-200"
                              onClick={() => handleDownloadInvoice(order)}
                            >
                              <IoPrint className="text-teal-600 h-4.5 w-4.5" />
                            </button>
                          )}
                        </td>

                        <td>{order?.branch?.branch_name}</td>

                        <td>
                          {order?.user?.first_name +
                            " " +
                            order?.user?.last_name}
                        </td>

                        <td>
                          <span
                            className={`${adminStatusClass} relative badge-outline badge-xl rounded-[30px]`}
                          >
                            {order?.order_status_details?.admin_label}
                          </span>
                        </td>

                        <td>
                          {order?.items?.reduce(
                            (total, item) => total + item?.quantity,
                            0
                          )}
                        </td>

                        <td>{order?.total}</td>

                        <td>{order?.paid_amount}</td>

                        <td>{order?.kasar_amount}</td>

                        <td>
                          <div className="flex items-center gap-2.5">
                            {dayjs(order?.created_at).format("DD-MM-YYYY")}
                            <br />
                            {dayjs(order?.created_at).format("hh:mm:ss A")}
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-2.5">
                            {dayjs(order?.estimated_pickup_time).format(
                              "DD-MM-YYYY"
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-2.5">
                            {order?.delivery_date
                              ? dayjs(order?.delivery_date).format(
                                  "DD-MM-YYYY hh:mm:ss A"
                                )
                              : dayjs(order?.estimated_delivery_time).format(
                                  "DD-MM-YYYY"
                                )}
                          </div>
                        </td>
                        <td>
                          {
                            PaymentType[
                              order?.payment_type as keyof typeof PaymentType
                            ]
                          }
                        </td>

                        <td>
                          {getActionDoenBy(order?.orderLogs, "confirmed_by")}
                        </td>

                        <td>
                          {getActionDoenBy(order?.orderLogs, "workshop_by")}
                        </td>

                        <td>
                          {getActionDoenBy(order?.orderLogs, "delivered_by")}
                        </td>

                        {(hasPermission(3, "read") ||
                          hasPermission(3, "update") ||
                          hasPermission(3, "delete")) && (
                          <td>
                            <div className="flex">
                              {hasPermission(3, "read") && (
                                <button
                                  className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full"
                                  onClick={() =>
                                    handleViewOrder(order?.order_id)
                                  }
                                >
                                  <FaEye size={18} className="text-gray-600" />
                                </button>
                              )}

                              {hasPermission(3, "update") && (
                                <button
                                  className="mr-3 p-3 bg-yellow-100 hover:bg-yellow-200 rounded-full"
                                  onClick={() =>
                                    handleUpdateOrder(order?.order_id)
                                  }
                                >
                                  <FaPencilAlt className="text-yellow-600 h-4 w-4" />
                                </button>
                              )}

                              {hasPermission(3, "delete") && (
                                <button
                                  className="mr-3 p-3 bg-red-100 hover:bg-red-200 rounded-full"
                                  onClick={() =>
                                    handleDeleteOrder(order?.order_id)
                                  }
                                >
                                  <FaTrash className="text-red-500 h-4 w-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={17} className="text-center">
                      No Order available
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>

          <Pagination
            count={count}
            currentPage={currentPage}
            totalRecords={orders?.length}
            perPage={perPage}
            onPageChange={handlePageChange}
            label="orders"
          />
        </div>
      </div>
    </>
  );
};

export default DeliveredOrderTable;
