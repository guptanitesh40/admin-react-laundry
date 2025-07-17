import { useEffect, useState } from "react";
import { useGetWorkshopOrders } from "../../hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import TableShimmer from "../shimmer/TableShimmer";
import { PaymentType } from "../../../types/enums";
import dayjs from "dayjs";
import { FaEye } from "react-icons/fa";
import * as Yup from "yup";
import { searchSchema } from "../../validation/searchSchema";
import { getOrderStatusLabel } from "../../utils/orderStatusClasses";
import Pagination from "../pagination/Pagination";
import TableShimmerEd2 from "../shimmer/TableShimmerEd2";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useChangeOrderStatus from "../../hooks/order/useChangeOrderStatus";
import { IoPrint } from "react-icons/io5";

interface WorkshopOrderTableProps {
  filters: {
    end_date: string;
    start_date: string;
    paymentStatusFilter: number[];
    workshopOrderStatusFilter: number[];
    paymentTypeFilter: number | undefined;
    customerFilter: number[];
    branchFilter: number[];
    workshopFilter: number[];
    workshopManagerFilter: number[];
  };
  selectedOrderIds: number[];
  setSelectedOrderIds: React.Dispatch<React.SetStateAction<number[]>>;
  selectedStatus: number | null;
  setSelectedStatus: React.Dispatch<React.SetStateAction<number | null>>;
  nextStatus: string | null;
  setNextStatus: React.Dispatch<React.SetStateAction<string | null>>;
  trackingState: number | null;
  setTrackingState: React.Dispatch<React.SetStateAction<number | null>>;
}

const WorkshopOrderTable: React.FC<WorkshopOrderTableProps> = ({
  filters,
  selectedOrderIds,
  setSelectedOrderIds,
  selectedStatus,
  setSelectedStatus,
  nextStatus,
  setNextStatus,
  trackingState,
  setTrackingState,
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

  const { changeOrderStatus, loading: changingStatus } = useChangeOrderStatus();

  const { workshopOrderData, loading, count, fetchWorkshopOrders } =
    useGetWorkshopOrders(
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
      filters.workshopManagerFilter,
      filters.start_date,
      filters.end_date
    );

  const navigate = useNavigate();

  const totalPages = Math.ceil(count / perPage);

  const {
    workshopOrders = [],
    total_amount = 0,
    total_quantity = 0,
  } = workshopOrderData || {};

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
      const order = workshopOrders.find((item: any) =>
        selectedOrderIds.includes(item?.order_id)
      );

      if (order) {
        setSelectedStatus(order.order_status);
        setNextStatus(order.order_status_details.next_step);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrderIds]);

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
    filters.workshopOrderStatusFilter,
    filters.customerFilter,
    filters.branchFilter,
    filters.paymentTypeFilter,
    filters.paymentStatusFilter,
    filters.workshopFilter,
    filters.workshopManagerFilter,
  ]);

  const handleViewOrder = (order_id: number) => {
    navigate(`/order/${order_id}`, { state: { from: "WorkshopOrderTable" } });
  };

  const handleDownloadInvoice = (order: any) => {
    const fileUrl = order?.order_invoice?.fileUrl;

    if (fileUrl) {
      window.open(fileUrl, "_blank");
    } else {
      toast.error("Please generate the invoice before downloading.");
    }
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
          await fetchWorkshopOrders();
        }
      }
    } catch {
      toast.error("Error while changing status");
    }
  };

  useEffect(() => {
    if (trackingState !== null) {
      switch (trackingState) {
        case 5:
          changeStatus();
          break;
        case 6:
          changeStatus();
          break;
        case 7:
          changeStatus();
          break;
        // case 8:
        //   changeStatus();
        //   break;
        // case 9:
        //   setPbBoyModelIsOpen(true);
        //   break;
        // case 10:
        //   handleDeliveryStatus();
        //   break;
        default:
          toast("Invalid order status...");
      }
    }
  }, [trackingState]);

  if (loading) {
    return (
      <TableShimmerEd2
        isFilters={true}
        columns={12}
        records={10}
        isPagination={true}
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

                  <th className="min-w-[200px]">Workshop Manager</th>

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

                  <th className="min-w-[165px]">Payment type</th>

                  <th className="min-w-[150px]">
                    <span className="sort-label">Confirmed By</span>
                  </th>

                  <th className="min-w-[150px]">
                    <span className="sort-label">Delivered By</span>
                  </th>

                  <th className="min-w-[150px]">
                    <span className="sort-label">Workshop By</span>
                  </th>

                  <th className="min-w-[50px]">Action</th>
                </tr>
              </thead>
              {loading ? (
                <TableShimmer />
              ) : workshopOrders?.length > 0 ? (
                <tbody>
                  <tr className="bg-blue-50 text-blue-900 font-semibold border-t border-blue-100">
                    <td colSpan={2}>Total Count : {count}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{total_quantity}</td>
                    <td>{total_amount}</td>
                    <td colSpan={10}></td>
                  </tr>

                  {workshopOrders?.map((order: any) => {
                    const isDisabled =
                      (selectedStatus !== null &&
                        order.order_status !== selectedStatus) ||
                      [11, 12, 13].includes(order.order_status);
                    const adminStatusClass = getOrderStatusLabel(
                      order?.order_status_details?.admin_label
                    );

                    const nextStepClass = getOrderStatusLabel(
                      order?.order_status_details?.next_step
                    );

                    return (
                      <tr key={order?.order_id}>
                        <th>
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
                        </th>
                        <td
                          className="cursor-pointer text-blue-600 hover:underline"
                          onClick={() => navigate(`/order/${order?.order_id}`)}
                        >
                          #{order?.order_id}
                        </td>
                        <td>{order?.branch.branch_name}</td>
                        <td>
                          {order?.user?.first_name} {order?.user?.last_name}
                        </td>

                        <td>
                          <span
                            className={`${adminStatusClass} relative badge-outline badge-xl rounded-[30px]`}
                          >
                            {order?.order_status_details?.admin_label}
                          </span>
                        </td>

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

                        <td>{order?.total_quantity}</td>
                        <td>{order?.total}</td>

                        <td>
                          {order?.workshop?.workshopManagerMappings
                            .map(
                              (mapping: any) =>
                                `${mapping?.user?.first_name} ${mapping?.user?.last_name}`
                            )
                            .join(", ")}
                        </td>
                        <td>{order?.workshop?.workshop_name}</td>
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
                            {dayjs(order?.estimated_delivery_time).format(
                              "DD-MM-YYYY"
                            )}
                            <br />
                          </div>
                        </td>
                        <td>
                          {
                            PaymentType[
                              order?.payment_type as keyof typeof PaymentType
                            ]
                          }
                        </td>

                        <td></td>
                        <td></td>
                        <td></td>

                        <td>
                          <div className="flex">
                            <button
                              className="mr-3 bg-yellow-100 hover:bg-yellow-200 p-[11px] rounded-full"
                              onClick={() => handleViewOrder(order?.order_id)}
                            >
                              <FaEye size={18} className="text-gray-600" />
                            </button>

                            <button
                              className="p-3 rounded-full bg-teal-100 hover:bg-teal-200"
                              onClick={() => handleDownloadInvoice(order)}
                              title="Download Invoice"
                            >
                              <IoPrint className="text-teal-600 h-4.5 w-4.5" />
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
                    <td colSpan={18} className="text-center">
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
            totalRecords={workshopOrders?.length}
            perPage={perPage}
            onPageChange={handlePageChange}
            label="orders"
          />
        </div>
      </div>
    </>
  );
};

export default WorkshopOrderTable;
