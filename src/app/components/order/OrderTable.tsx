import { useEffect, useState } from "react";
import { useDeleteOrder, useGetOrders } from "../../hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import TableShimmer from "../shimmer/TableShimmer";
import { OrderStatus, PaymentStatus, PaymentType } from "../../../types/enums";
import Swal from "sweetalert2";
import dayjs from "dayjs";

interface OrderTableProps {
  search: string;
}

const OrderTable: React.FC<OrderTableProps> = ({ search }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | null>(null);

  const pageParams = searchParams.get("page");
  const perPageParams = searchParams.get("perPage");

  const { orders, loading, totalOrders, fetchOrders } = useGetOrders(
    currentPage,
    perPage,
    search,
    sortColumn,
    sortOrder
  );

  const navigate = useNavigate();

  const totalPages = Math.ceil(totalOrders / perPage);

  const { deleteOrder } = useDeleteOrder();

  const handleViewOrder = (order_id: number) => {
    navigate(`/order/${order_id}`);
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
    navigate(`/order/edit/${order_id}`);
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

  const getOrderStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Pending:
        return "badge badge-pending";
      case OrderStatus["In Process"]:
        return "badge badge-in-process";
      case OrderStatus["Ready to delivery"]:
        return "badge badge-ready-to-deliver";
      case OrderStatus["Delivery complete"]:
        return "badge badge-delivery-complete";
      default:
        return "badge";
    }
  };

  const getPaymentStatusLabel = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.Pending:
        return "badge badge-pending";
      case PaymentStatus["Partial received"]:
        return "badge badge-ready-to-deliver";
      case PaymentStatus["Received"]:
        return "badge badge-delivery-complete";
      default:
        return "badge";
    }
  };

  return (
    <>
      <div className="inline-block">
        <div className="flex mb-3 items-center gap-2">
          Show
          <select
            className="select select-sm w-16"
            value={perPage}
            onChange={handlePerPageChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          per page
        </div>
      </div>

      <div className="grid gap-5 lg:gap-5.5">
        <div className="card card-grid min-w-full">
          <div className="card-body">
            <div className="scrollable-x-auto">
              <table className="table table-auto table-border">
                <thead>
                  <tr>
                    <th className="min-w-[90px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("order_id")}
                      >
                        Id
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "order_id" && sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "order_id" && sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>

                    <th className="min-w-[140px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("first_name")}
                      >
                        Customer
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "first_name" && sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "first_name" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>

                    <th className="min-w-[140px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("email")}
                      >
                        Email
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "email" && sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "email" && sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>

                    <th className="min-w-[140px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("mobile_number")}
                      >
                        Mobile no
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "mobile_number" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "mobile_number" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>

                    <th className="min-w-[230px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("address_details")}
                      >
                        Shipping Address
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "address_details" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "address_details" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>

                    <th className="min-w-[230px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("description")}
                      >
                        Description
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "description" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "description" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>

                    <th className="min-w-[130px]">
                      <div
                        className="flex justify-between cursor-pointer "
                        onClick={() => handleSort("coupon_code")}
                      >
                        Coupon code
                        <div className="flex cursor-pointer mt-2">
                          <FaArrowDownLong
                            color={
                              sortColumn === "coupon_code" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "coupon_code" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>

                    <th className="min-w-[130px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("coupon_discount")}
                      >
                        Coupon discount
                        <div className="flex cursor-pointer mt-2">
                          <FaArrowDownLong
                            color={
                              sortColumn === "coupon_discount" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "coupon_discount" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>

                    <th className="min-w-[160px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("order_statue")}
                      >
                        Order Status
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "order_status" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "order_status" &&
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
                        onClick={() => handleSort("estimated_delivery_time")}
                      >
                        Estimated delivery time
                        <div className="flex cursor-pointer mt-2">
                          <FaArrowDownLong
                            color={
                              sortColumn === "order_status" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "estimated_delivery_time" &&
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
                        onClick={() => handleSort("estimated_pickup_time")}
                      >
                        Estimated pickup time
                        <div className="flex cursor-pointer mt-2">
                          <FaArrowDownLong
                            color={
                              sortColumn === "order_status" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "estimated_pickup_time" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>

                    <th className="min-w-[140px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("shipping_charges")}
                      >
                        Shipping charge
                        <div className="flex cursor-pointer mt-2">
                          <FaArrowDownLong
                            color={
                              sortColumn === "shipping_charges" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "shipping_charges" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>

                    <th className="min-w-[180px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("express_delivery_charges")}
                      >
                        Express delivery charges
                        <div className="flex cursor-pointer mt-2">
                          <FaArrowDownLong
                            color={
                              sortColumn === "express_delivery_charges" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "express_delivery_charges" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>

                    <th className="min-w-[100px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("gst")}
                      >
                        GST
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "gst" && sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "gst" && sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>

                    <th className="min-w-[130px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("kasar_amount")}
                      >
                        Kasar amount
                        <div className="flex cursor-pointer mt-2">
                          <FaArrowDownLong
                            color={
                              sortColumn === "kasar_amount" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "kasar_amount" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>

                    <th className="min-w-[130px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("sub_total")}
                      >
                        Sub total
                        <div className="flex cursor-pointer ">
                          <FaArrowDownLong
                            color={
                              sortColumn === "sub_total" && sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "sub_total" && sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>

                    <th className="min-w-[105px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("total")}
                      >
                        Total
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "total" && sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "total" && sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>

                    <th className="min-w-[165px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("payment_type")}
                      >
                        Payment type
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "payment_type" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "payment_type" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>

                    <th className="min-w-[175px]">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => handleSort("payment_status")}
                      >
                        Payment Status
                        <div className="flex cursor-pointer">
                          <FaArrowDownLong
                            color={
                              sortColumn === "payment_status" &&
                              sortOrder === "ASC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                          <FaArrowUpLong
                            color={
                              sortColumn === "payment_status" &&
                              sortOrder === "DESC"
                                ? "gray"
                                : "lightgray"
                            }
                          />
                        </div>
                      </div>
                    </th>

                    <th className="w-[170px]">Actions</th>
                  </tr>
                </thead>
                {loading ? (
                  <TableShimmer />
                ) : orders.length > 0 ? (
                  <tbody>
                    {orders.map((order) => {
                      const orderStatusLabel =
                        OrderStatus[
                          order.order_status as unknown as keyof typeof OrderStatus
                        ];
                      const orderStatusClass = getOrderStatusLabel(
                        order.order_status
                      );

                      const paymentStatusLabel =
                        PaymentStatus[
                          order.payment_status as unknown as keyof typeof PaymentStatus
                        ];
                      const paymentStatusClass = getPaymentStatusLabel(
                        order.payment_status
                      );

                      return (
                        <tr key={order.order_id}>
                          <td>#{order.order_id}</td>
                          <td>
                            {order.user.first_name + " " + order.user.last_name}
                          </td>
                          <td>{order.user.email}</td>
                          <td>{order.user.mobile_number}</td>
                          <td>{order.address_details}</td>
                          <td>{order.description}</td>
                          <td>{order.coupon_code}</td>
                          <td>{order.coupon_discount}</td>
                          <td>
                            <span
                              className={`${orderStatusClass} badge-outline rounded-[30px]`}
                            >
                              {orderStatusLabel}
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
                          <td>{order.gst}</td>
                          <td>{order.kasar_amount}</td>
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
                            <span
                              className={`${paymentStatusClass} badge-outline rounded-[30px]`}
                            >
                              {paymentStatusLabel}
                            </span>
                          </td>
                          <td>
                            <div className="flex">
                              <button
                                className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full"
                                onClick={() => handleViewOrder(order.order_id)}
                              >
                                <FaEye
                                  size={18}
                                  className="text-gray-600"
                                />
                              </button>
                              <button
                                className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full"
                                onClick={() =>
                                  handleUpdateOrder(order.order_id)
                                }
                              >
                                <FaPencilAlt className="text-yellow-600" />
                              </button>
                              <button
                                className="bg-red-100 hover:bg-red-200 p-3 rounded-full"
                                onClick={() =>
                                  handleDeleteOrder(order.order_id)
                                }
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
                        No Orders available
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>

      {totalOrders > perPage && (
        <div className="flex items-center gap-4 mt-4">
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
                className={`btn ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className={`btn ${currentPage === totalPages ? "disabled" : ""}`}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderTable;
