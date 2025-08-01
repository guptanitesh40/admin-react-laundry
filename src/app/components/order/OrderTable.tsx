/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  useDeleteOrder,
  useGenerateInvoice,
  useGetOrders,
  usePermissions,
} from "../../hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import { PaymentType } from "../../../types/enums";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import * as Yup from "yup";
import { searchSchema } from "../../validation/searchSchema";
import { getOrderStatusLabel } from "../../utils/orderStatusClasses";
import Pagination from "../pagination/Pagination";
import TableShimmerEd2 from "../shimmer/TableShimmerEd2";
import PickupBoyModal from "./PickupBoyModal";
import toast from "react-hot-toast";
import useChangeOrderStatus from "../../hooks/order/useChangeOrderStatus";
import WorkshopModal from "./AssignWorkshopModal";
import DueDetailsModel from "./DueDetailsModel";
import { useLocation } from "react-router-dom";
import { IoPrint } from "react-icons/io5";

interface OrderTableProps {
  filters: {
    paymentStatusFilter: number[];
    orderStatusFilter: number[];
    paymentTypeFilter: number | undefined;
    customerFilter: number[];
    pickupBoyFilter: number[];
    deliveryBoyFilter: number[];
    branchFilter: number[];
    start_date: string;
    end_date: string;
  };
  selectedOrderIds: number[];
  setSelectedOrderIds: React.Dispatch<React.SetStateAction<number[]>>;
  setNextStatus: React.Dispatch<React.SetStateAction<string | null>>;
  selectedStatus: number;
  setSelectedStatus: React.Dispatch<React.SetStateAction<number | null>>;
  nextStatus: string;
  trackingState: number | null;
  setTrackingState: React.Dispatch<React.SetStateAction<number | null>>;
  isEarlyDelivery: boolean;
  setIsEarlyDelivery: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderTable: React.FC<OrderTableProps> = ({
  filters,
  selectedOrderIds,
  setSelectedOrderIds,
  setNextStatus,
  selectedStatus,
  setSelectedStatus,
  nextStatus,
  trackingState,
  setTrackingState,
  isEarlyDelivery,
  setIsEarlyDelivery,
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

  const [dueDTModelIsOpen, setDueDTModelIsOpen] = useState<boolean>(false);
  const [selectedOrders, setSelectedOrders] = useState<any>([]);
  const [remainingPaidOrders, setRemainingPaidOrders] = useState<any>([]);
  const [previewOrders, setPreviewOrders] = useState<any>([]);

  const location = useLocation();

  const pathMappings = [
    { path: "/orders", list: "", orderList: "" },
    { path: "/pickup-orders", list: "order_list", orderList: "pickup_order" },
    {
      path: "/redy-to-deliver",
      list: "order_list",
      orderList: "ready_for_delivery",
    },
    {
      path: "/confirmed-orders",
      list: "order_list",
      orderList: "confirm_order",
    },
  ];

  const pathToParam = pathMappings.find(
    (item) => item.path === location.pathname
  );

  const list = pathToParam.list;
  const orderList = pathToParam.orderList;

  const { changeOrderStatus, loading: changingStatus } = useChangeOrderStatus();
  const [PbBoyModelIsOpen, setPbBoyModelIsOpen] = useState<boolean>(false);
  const [WorkshopModelIsOpen, setWorkshopModelIsOpen] =
    useState<boolean>(false);

  const handleCheckboxChange = (order: object) => {
    const { order_id } = order;

    setSelectedOrderIds((prevSelectedOrderIds) => {
      const isSelected = prevSelectedOrderIds.includes(order_id);
      const updatedSelection = isSelected
        ? prevSelectedOrderIds.filter((id) => id !== order_id)
        : [...prevSelectedOrderIds, order_id];
      return updatedSelection;
    });
  };

  const clearSelection = () => {
    setSelectedOrderIds([]);
    setSelectedStatus(null);
    setNextStatus(null);
    setTrackingState(null);
  };

  useEffect(() => {
    if (selectedOrderIds.length === 0) {
      setSelectedStatus(null);
      setNextStatus(null);
    } else if (selectedOrderIds.length === 1) {
      const order = orders.find((order) =>
        selectedOrderIds.includes(order.order_id)
      );
      if (order) {
        setSelectedStatus(order.order_status);
        setNextStatus(order.order_status_details.next_step);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrderIds]);

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
            (order: { order_id: number }) => order.order_id !== order_id
          );
          if (updatedOrders?.length === 0 && currentPage > 1) {
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

  const handleGenerateInvoice = async (order_id: number) => {
    setInvoiceId(order_id);
    await generateInvoice(order_id);
  };

  const handleDeliveryStatus = () => {
    const ordersList = orders.filter((order: { order_id: number }) =>
      selectedOrderIds.includes(order.order_id)
    );
    setPreviewOrders(ordersList);
    setDueDTModelIsOpen(true);

    // const pendingOrPartialOrders = ordersList.filter(
    //   (order) => order.payment_status !== 2
    // );
    // const fullyPaidOrders = ordersList.filter(
    //   (order) => order.payment_status === 2
    // );
    // const fullyPaidOrdersIds = fullyPaidOrders.map((order) => {
    //   return order.order_id;
    // });
    // setRemainingPaidOrders(fullyPaidOrdersIds);
    // setSelectedOrders(pendingOrPartialOrders);
  };

  const changeStatus = async () => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        html: `Want to change order status to <span style="color: #1B84FF; font-weight: 500;">"${nextStatus}"</span> ?`,
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        icon: undefined,
        didClose: () => {
          setTrackingState(null);
        },
      });

      if (isConfirmed) {
        const next = selectedStatus + 1;
        const success = await changeOrderStatus(selectedOrderIds, next);

        if (success) {
          clearSelection();
          await fetchOrders();
        }
      }
    } catch {
      toast.error("Error while changing status");
    }
  };

  const getActionDoenBy = (log: any, key: string) => {
    const data = log.find((item: any) => item?.type === key);
    if (!log.length || !key || !data) {
      return "";
    }
    return `${data.user.first_name} ${data.user.last_name}`;
  };

  useEffect(() => {
    if (isEarlyDelivery) {
      handleDeliveryStatus();
    }
  }, [isEarlyDelivery]);

  useEffect(() => {
    if (trackingState !== null) {
      switch (trackingState) {
        case 1:
          setPbBoyModelIsOpen(true);
          break;
        case 2:
          changeStatus();
          break;
        case 3:
          changeStatus();
          break;
        case 4:
          setWorkshopModelIsOpen(true);
          break;
        case 5:
          changeStatus();
          break;
        case 6:
          changeStatus();
          break;
        case 7:
          changeStatus();
          break;
        case 8:
          changeStatus();
          break;
        case 9:
          setPbBoyModelIsOpen(true);
          break;
        case 10:
          handleDeliveryStatus();
          break;
        default:
          toast("Invalid order status...");
      }
    }
  }, [trackingState]);

  const currentPath = location.pathname;
  const isConfirmedOrderRoute = currentPath === "/confirmed-orders";

  const columnsConfig: Record<
    string,
    {
      showCurrentStatus: boolean;
      showPickupDate: boolean;
      showPaymentType: boolean;
      showConfirmedBy: boolean;
      showDeliveredBy: boolean;
      showWorkshopBy: boolean;
    }
  > = {
    "/orders": {
      showCurrentStatus: true,
      showPickupDate: true,
      showPaymentType: true,
      showConfirmedBy: true,
      showDeliveredBy: true,
      showWorkshopBy: true,
    },
    "/pickup-orders": {
      showCurrentStatus: true,
      showPickupDate: true,
      showPaymentType: true,
      showConfirmedBy: true,
      showDeliveredBy: true,
      showWorkshopBy: true,
    },
    "/confirmed-orders": {
      showCurrentStatus: false,
      showPickupDate: true,
      showPaymentType: false,
      showConfirmedBy: true,
      showDeliveredBy: false,
      showWorkshopBy: false,
    },
    "/redy-to-deliver": {
      showCurrentStatus: true,
      showPickupDate: false,
      showPaymentType: false,
      showConfirmedBy: true,
      showDeliveredBy: false,
      showWorkshopBy: true,
    },
  };

  const {
    showCurrentStatus,
    showPickupDate,
    showPaymentType,
    showConfirmedBy,
    showDeliveredBy,
    showWorkshopBy,
  } = columnsConfig[currentPath] || {};

  const getRouteSpeColumn = () => {
    if (currentPath === "/orders") {
      return (
        <>
          <td>{paid_amount}</td>
          <td>{kasar_amount}</td>
          <td colSpan={8}></td>
        </>
      );
    } else if (currentPath === "/confirmed-orders") {
      return (
        <>
          <td>{paid_amount}</td>
          <td colSpan={5}></td>
        </>
      );
    } else if (currentPath === "/redy-to-deliver") {
      return (
        <>
          <td>{paid_amount}</td>
          <td colSpan={5}></td>
        </>
      );
    } else {
      return <td colSpan={8}></td>;
    }
  };

  const getCols = () => {
    if (currentPath === "/orders") {
      return 19;
    } else if (currentPath === "/pickup-orders") {
      return 17;
    } else if (currentPath === "/confirmed-orders") {
      return 14;
    } else {
      return 15;
    }
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
          <div className="scrollable-x-auto scrollable-y-auto max-h-[500px]">
            <table
              className="table table-auto table-border"
              data-datatable-table="true"
            >
              <thead>
                <tr>
                  <th className="!px-3">
                    <label className="flex items-center justify-center">
                      <input className="checkbox" type="checkbox" disabled />
                    </label>
                  </th>

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

                  {showCurrentStatus && (
                    <th className="min-w-[280px]">Current Status</th>
                  )}

                  <th className="min-w-[280px]">Next Status</th>

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

                  {location.pathname !== "/pickup-orders" && (
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
                  )}

                  {location.pathname === "/orders" && (
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
                  )}

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

                  {showPickupDate && (
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
                  )}

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

                  {showPaymentType && (
                    <th className="min-w-[165px]">Payment type</th>
                  )}

                  {showConfirmedBy && (
                    <th className="min-w-[150px]">
                      <span className="sort-label">Confirmed By</span>
                    </th>
                  )}

                  {showWorkshopBy && (
                    <th className="min-w-[150px]">
                      <span className="sort-label">Workshop By</span>
                    </th>
                  )}

                  {showDeliveredBy && (
                    <th className="min-w-[150px]">
                      <span className="sort-label">Delivered By</span>
                    </th>
                  )}

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
                    <td></td>
                    {!isConfirmedOrderRoute && <td></td>}
                    <td>{total_quantity}</td>
                    <td>{total_amount}</td>
                    {getRouteSpeColumn()}
                  </tr>

                  {orders?.map((order: any) => {
                    const isDisabled =
                      (selectedStatus !== null &&
                        order.order_status !== selectedStatus) ||
                      [11, 12, 13].includes(order.order_status);

                    const adminStatusClass = getOrderStatusLabel(
                      order.order_status_details.admin_label
                    );

                    const nextStepClass = getOrderStatusLabel(
                      order.order_status_details.next_step
                    );

                    return (
                      <tr key={order?.order_id}>
                        <td>
                          <label className="flex items-center justify-center">
                            <input
                              className="checkbox"
                              type="checkbox"
                              disabled={isDisabled}
                              checked={selectedOrderIds.includes(
                                order.order_id
                              )}
                              onChange={() => handleCheckboxChange(order)}
                            />
                          </label>
                        </td>
                        <td
                          className="cursor-pointer text-blue-600 hover:underline"
                          onClick={() => navigate(`/order/${order?.order_id}`)}
                        >
                          #{order.order_id}
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

                        {showCurrentStatus && (
                          <td>
                            <span
                              className={`${adminStatusClass} relative badge-outline badge-xl rounded-[30px]`}
                            >
                              {order?.order_status_details?.admin_label}
                            </span>
                          </td>
                        )}

                        <td>
                          {order?.order_status_details?.next_step !==
                            "NULL" && (
                            <div className="tooltip-custom">
                              <span
                                className={`${nextStepClass} badge-outline badge-xl rounded-[30px]`}
                              >
                                {order?.order_status_details?.next_step}
                              </span>
                              <div className="tooltip-text">
                                {order?.order_status_details?.description}
                              </div>
                            </div>
                          )}
                        </td>

                        <td>
                          {order?.items?.reduce(
                            (total: any, item: { quantity: any }) =>
                              total + item?.quantity,
                            0
                          )}
                        </td>

                        <td>{order?.total}</td>

                        {location.pathname !== "/pickup-orders" && (
                          <td>{order?.paid_amount}</td>
                        )}

                        {location.pathname === "/orders" && (
                          <td>{order?.kasar_amount}</td>
                        )}

                        <td>
                          <div className="flex items-center gap-2.5">
                            {dayjs(order?.created_at).format("DD-MM-YYYY")}
                            <br />
                            {dayjs(order?.created_at).format("hh:mm:ss A")}
                          </div>
                        </td>

                        {showPickupDate && (
                          <td>
                            <div className="flex items-center gap-2.5">
                              {dayjs(order?.estimated_pickup_time).format(
                                "DD-MM-YYYY"
                              )}
                            </div>
                          </td>
                        )}

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

                        {showPaymentType && (
                          <td>
                            {
                              PaymentType[
                                order?.payment_type as keyof typeof PaymentType
                              ]
                            }
                          </td>
                        )}

                        {showConfirmedBy && (
                          <td>
                            {getActionDoenBy(order?.orderLogs, "confirmed_by")}
                          </td>
                        )}

                        {showWorkshopBy && (
                          <td>
                            {getActionDoenBy(order?.orderLogs, "workshop_by")}
                          </td>
                        )}

                        {showDeliveredBy && (
                          <td>
                            {getActionDoenBy(order?.orderLogs, "delivered_by")}
                          </td>
                        )}

                        {(hasPermission(3, "update") ||
                          hasPermission(3, "delete") ||
                          hasPermission(3, "read")) && (
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
                                  className="mr-3 p-3 rounded-full bg-yellow-100 hover:bg-yellow-200"
                                  onClick={() =>
                                    handleUpdateOrder(order?.order_id)
                                  }
                                >
                                  <FaPencilAlt className="text-yellow-600 h-4 w-4" />
                                </button>
                              )}

                              {hasPermission(3, "delete") && (
                                <button
                                  className="mr-3 p-3 bg-red-100 hover:bg-red-200  rounded-full"
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
                    <td colSpan={getCols()} className="text-center">
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

      <PickupBoyModal
        orderId={selectedOrderIds}
        modelOpen={PbBoyModelIsOpen}
        onClose={() => {
          setPbBoyModelIsOpen(false);
          setTrackingState(null);
        }}
        orderStatus={nextStatus}
        setAssigned={(value) => {
          if (value) {
            clearSelection();
            fetchOrders();
          }
        }}
      />
      <WorkshopModal
        orderIds={selectedOrderIds}
        workshopModalOpen={WorkshopModelIsOpen}
        onClose={() => {
          setTrackingState(null);
          setWorkshopModelIsOpen(false);
        }}
        setAssigned={(status) => {
          if (status) {
            clearSelection();
            fetchOrders();
          }
        }}
        orderStatus={nextStatus}
      />

      {dueDTModelIsOpen && (
        <DueDetailsModel
          orders={previewOrders}
          onClose={() => {
            setDueDTModelIsOpen(false);
            setTrackingState(null);
            setIsEarlyDelivery(false);
          }}
          onSuccess={async (value) => {
            if (value) {
              clearSelection();
              await fetchOrders();
              setTrackingState(null);
              setDueDTModelIsOpen(false);
              setIsEarlyDelivery(false);
            }
          }}
        />
      )}
    </>
  );
};

export default OrderTable;
