import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PaymentStatus, PaymentType, RefundStatus } from "../../../types/enums";
import useGetOrder from "../../hooks/order/useGetOrder";
import { BiRefresh } from "react-icons/bi";
import dayjs from "dayjs";
import { RxCross2 } from "react-icons/rx";
import { IoIosAttach } from "react-icons/io";
import {
  useAddNote,
  useDeleteNote,
  useGenerateInvoice,
  usePermissions,
  useUpdateOrderStatus,
} from "../../hooks";
import toast from "react-hot-toast";
import * as Yup from "yup";
import Swal from "sweetalert2";
import PickupBoyModal from "./PickupBoyModal";
import WorkshopModal from "./AssignWorkshopModal";
import { getOrderStatusLabel } from "../../utils/orderStatusClasses";
import OrderCalcelModal from "./OrderCancelModal";
import { MdCancel } from "react-icons/md";
import { HiReceiptRefund } from "react-icons/hi2";
import OrderRefundModal from "./OrderRefundModal";
import { getPaymentStatusLabel } from "../../utils/paymentStatusClasses";
import { RiFilePaper2Fill, RiFilePaperLine } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/store";
import Loading from "../shimmer/Loading";
import PickUpBoyModelEd2 from "./PickUpBoyModelEd2";
import DueDetailsModel from "./DueDetailsModel";
import useReGenerateInvoice from "../../hooks/invoice/useRegenerateInvoice";
import { BASE_URL } from "../../utils/constant";

const schema = Yup.object().shape({
  text_note: Yup.string().required("Please enter text to add note"),
});

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const order_id = Number(id);

  const userId = useSelector((state: RootState) => state.user.user_id);

  const { order, fetchOrder, loading: fetchingData } = useGetOrder();
  const { addNote, loading } = useAddNote();
  const { deleteNote } = useDeleteNote();
  const { updateOrderStatus } = useUpdateOrderStatus();
  const { generateInvoice, loading: generating } = useGenerateInvoice();
  const { reGenerateInvoice, loading: reGenerating } = useReGenerateInvoice();
  const { hasPermission } = usePermissions();

  const [formData, setFormData] = useState({
    user_id: null,
    order_id: null,
    text_note: "",
    images: [] as (string | File)[],
    is_visible: true,
  });

  const [pbModel2IsOpen, setPbModel2IsOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [workshopModalOpen, setWorkshopModalOpen] = useState<boolean>(false);
  const [orderCancelModalOpen, setOrderCancelModalOpen] =
    useState<boolean>(false);
  const [orderRefundModalOpen, setOrderRefundModalOpen] =
    useState<boolean>(false);
  const [assigned, setAssigned] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [confirm, setConfirm] = useState<boolean>(false);
  const [refetch, setRefetch] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updatingNote, setUpdatingNote] = useState<boolean>(false);

  const [dueDTModelIsOpen, setDueDTModelIsOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchOrder(order_id);
    setAssigned(false);
    setRefetch(false);
  }, [assigned, refetch]);

  useEffect(() => {
    if (order) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        user_id: order.user_id,
        order_id: order.order_id,
      }));
    }
  }, [order]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement) {
      const { name, value, files } = target;

      if (name === "images" && files && files.length > 0) {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...Array.from(files)],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };

  const hanldeDeleteNote = async (note_id: number) => {
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
        const { success, message } = await deleteNote(note_id);
        if (success) {
          await fetchOrder(order_id);
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

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const hanldeAddNote = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await schema.validate(formData, { abortEarly: false });

      const formDataObj = new FormData();
      formDataObj.append("user_id", userId.toString());
      formDataObj.append("order_id", formData.order_id);
      formDataObj.append("text_note", formData.text_note);
      formDataObj.append("is_visible", formData.is_visible.toString());

      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((image) => {
          formDataObj.append("images", image);
        });
      }

      const success = await addNote(formDataObj);
      if (success) {
        setFormData({
          user_id: null,
          order_id: null,
          text_note: "",
          images: [] as (string | File)[],
          is_visible: true,
        });
        setErrorMessage("");
        await fetchOrder(formData.order_id);
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrorMessage(error.errors[0]);
      } else {
        toast.error("Failed to add note");
      }
    }
  };

  const handleSweetAlertOpen = async () => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        html: `Want to change order status to <span style="color: #4e00ff; font-weight: 500;">"${order.order_status_details.next_step}"</span> ?`,
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });
      return isConfirmed;
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
      return false;
    }
  };

  const updateAndFetchOrder = async (status: number) => {
    const success = await updateOrderStatus(order_id, status);
    if (success) {
      await fetchOrder(order_id);
    }
  };

  const handleStatusChange = async (status: number) => {
    const success = await handleSweetAlertOpen();
    if (success) {
      await updateAndFetchOrder(status);
    }
  };

  const handleOrderTableStatus = async () => {
    switch (order?.order_status_details?.next_step) {
      case "Assign Pickup Boy":
        setModalOpen(true);
        break;
      case "Assign Delivery boy":
        setModalOpen(true);
        break;
      case "Received by pickup boy":
        await handleStatusChange(3);
        break;
      case "Order Received at Workshop":
        await handleStatusChange(6);
        break;
      case "Workshop Marks Order In Progress":
        await handleStatusChange(7);
        break;
      case "Work Completed by Workshop":
        await handleStatusChange(8);
        if (location.state?.from === "WorkshopOrderTable") {
          navigate("/workshop-order");
        }
        break;
      case "Mark as Received at Branch":
        await handleStatusChange(9);
        break;
      case "Items Received at Branch":
      case "Pickup Complete":
        await handleStatusChange(4);
        break;
      case "Ready For Delivery":
        await handleStatusChange(10);
        break;
      case "Delivered":
        setDueDTModelIsOpen(true);
        break;
      case "Assign Workshop":
      case "Assign Branch":
        setWorkshopModalOpen(true);
        break;
      case "Branch Received Items":
        await handleStatusChange(8);
        setConfirm(false);
        break;
      default:
        break;
    }
  };

  const handleStatusClick = async () => {
    await handleOrderTableStatus();
  };

  const handleEditOrder = () => {
    navigate(`/order/edit/${order_id}`, {
      state: { prevUrl: location.pathname },
    });
  };

  const handleOrderCancel = () => {
    setOrderCancelModalOpen(true);
  };

  const handleOrderRefund = () => {
    setOrderRefundModalOpen(true);
  };

  const handleGenerateInvoice = async () => {
    if (order?.order_invoice !== "") {
      const url = order?.order_invoice?.fileUrl;
      window.open(url, "_blank");
    } else {
      await generateInvoice(order_id);
      setRefetch(true);
    }
  };

  const hadleUserNameClick = (userId: number) => {
    navigate(`/customer/${userId}`);
  };

  if (fetchingData) return <Loading />;

  if (!order) return null;

  const adminStatusLabel = getOrderStatusLabel(
    order?.order_status_details?.admin_label
  );

  const nextStepLabel = getOrderStatusLabel(
    order?.order_status_details?.next_step
  );

  const paymentStatusLabel =
    PaymentStatus[
      order?.payment_status as unknown as keyof typeof PaymentStatus
    ];

  const handlePrintLabel = (index: number) => {
    const url = order?.order_label[index];
    window.open(url, "_blank");
  };

  const handlePrintGeneralLabel = () => {
    const url = order?.general_order_label;
    window.open(url, "_blank");
  };

  const handleViewRefundReceipt = () => {
    const url = order?.refund_receipt_url?.fileUrl;
    window.open(url, "_blank");
  };

  const handleChangeDbclick = () => {
    setPbModel2IsOpen(true);
  };

  const handleSpecialCase = async () => {
    setDueDTModelIsOpen(true);
  };

  const handleRegenerateClick = () => {
    reGenerateInvoice(order.order_id);
  };

  const handleToggleNoteVisibility = async (
    noteId: number,
    isVisible: boolean
  ) => {
    const token = localStorage.getItem("authToken");

    setUpdatingNote(true);
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
        method: "PUT",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ is_visible: isVisible }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to update note visibility");
        return false;
      }

      await fetchOrder(order_id);
      toast.success(data.message || "Visibility updated");
      return true;
    } catch (error) {
      toast.error("Network Error: Failed to update note visibility");
      return false;
    } finally {
      setUpdatingNote(false);
    }
  };

  const openCamera = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container mx-auto p-6">
      <div className="card rounded-xl relative">
        <span
          className="flex justify-center items-center h-6 w-6 absolute top-4 right-1/2 -translate-x-1/2 text-base font-medium border border-primary rounded-full"
          style={{ display: "none" }}
        >
          {order?.order_status}
        </span>
        <div className="flex flex-col gap-4 p-5 rounded-md shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-xl font-semibold text-gray-900">
              Order Details - #{order_id}
            </h1>
            <div className="flex gap-2 mobile:flex-wrap">
              {(order?.order_status === 2 || order?.order_status == 10) && (
                <button
                  className="flex items-center btn-info sm:btn smmobile:btn-sm bg-gray-700 text-white hover:!bg-gray-800 focus:!bg-gray-800"
                  onClick={handleChangeDbclick}
                  aria-label={
                    order?.order_status === 2
                      ? "Change Pickup Boy"
                      : "Change Delivery Boy"
                  }
                  title={
                    order?.order_status === 2
                      ? "Change Pickup Boy"
                      : "Change Delivery Boy"
                  }
                >
                  <i className="ki-filled ki-arrows-loop"></i>{" "}
                  {order?.order_status === 2
                    ? "Change Pickup Boy"
                    : "Change Delivery Boy"}
                </button>
              )}

              <button
                className="flex items-center btn-light sm:btn smmobile:btn-sm smmobile:btn text-gray-700"
                onClick={handleGenerateInvoice}
                disabled={generating}
              >
                {generating ? (
                  <span className="inline-block h-5 w-5 border-3 border-black/10 border-t-primary animate-spin rounded-full"></span>
                ) : (
                  <RiFilePaper2Fill className="h-5 w-5" />
                )}
                View Invoice
              </button>

              <button
                className="flex items-center btn-light sm:btn smmobile:btn-sm smmobile:btn text-gray-700"
                onClick={handleRegenerateClick}
                disabled={reGenerating}
              >
                {reGenerating ? (
                  <span className="inline-block h-6 w-6 p-0.5">
                    <span className="inline-block h-full w-full border-3 border-black/10 border-t-primary animate-spin rounded-full"></span>
                  </span>
                ) : (
                  <BiRefresh className="h-6 w-6" />
                )}
                Refresh Invoice
              </button>

              {((order?.order_status > 0 && order?.order_status < 7) ||
                order?.order_status === 9 ||
                order?.order_status === 10) &&
                hasPermission(3, "update") && (
                  <button
                    className="flex items-center font-medium sm:btn btn-primary smmobile:btn-sm smmobile:btn"
                    onClick={handleEditOrder}
                  >
                    <i className="ki-filled ki-pencil mr-2"></i>Edit Order
                  </button>
                )}

              {order?.order_status > 0 &&
                order?.order_status < 7 &&
                order?.refund_status !== 1 &&
                hasPermission(3, "update") && (
                  <button
                    className="flex items-center font-semibold btn-danger sm:btn smmobile:btn-sm smmobile:btn"
                    onClick={handleOrderCancel}
                  >
                    <MdCancel size={20} />
                    Cancel Order
                  </button>
                )}

              {location?.state?.from !== "WorkshopOrderTable" &&
                hasPermission(3, "update") &&
                order?.payment_status !== 1 &&
                order?.refund_status === 3 &&
                order?.order_status !== 11 && (
                  <button
                    className="flex items-center sm:btn smmobile:btn-sm smmobile:btn font-semibold btn-success"
                    onClick={handleOrderRefund}
                  >
                    <HiReceiptRefund size={20} />
                    Refund Order
                  </button>
                )}
            </div>
          </div>

          {order.refund_status === 3 ? (
            <div className="flex border border-gray-200 rounded-xl bg-gray-50 items-center justify-between bg-gray-00 p-4 shadow-sm mobile:flex mobile:flex-col gap-5">
              <div className="flex items-center mobile:flex-col desktop:flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Current Status:
                </span>
                <span
                  className={`${adminStatusLabel} badge-outline badge-xl rounded-[30px]`}
                >
                  {order?.order_status_details?.admin_label}
                </span>
              </div>

              <div className="flex-1 px-6">
                <p className="text-sm text-gray-600 mt-1">
                  {order?.order_status_details?.description}
                </p>
              </div>

              {order?.order_status_details?.next_step !== null && (
                <div className="flex items-center mobile:flex-col desktop:flex-col gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    Next Step:
                  </span>
                  <button
                    className={`${nextStepLabel} badge-outline badge-xl rounded-[30px]`}
                    onClick={handleStatusClick}
                    disabled={
                      !hasPermission(3, "update") &&
                      !hasPermission(16, "update")
                    }
                  >
                    {order?.order_status_details?.next_step}
                  </button>
                  {order?.order_status === 9 && (
                    <button
                      className={`badge badge-delivered badge-outline badge-xl rounded-[30px]`}
                      onClick={handleSpecialCase}
                      disabled={
                        !hasPermission(3, "update") &&
                        !hasPermission(16, "update")
                      }
                    >
                      Delivered
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex border flex-wrap border-gray-200 rounded-xl bg-gray-50 items-center bg-gray-00 p-4 shadow-sm mobile:flex mobile:flex-col gap-5">
              <div>
                <span className="badge badge-secondary badge-text rounded-xl badge-outline text-sm font-medium text-gray-700">
                  Order Refunded
                </span>
              </div>

              <div className="flex-shrink: 1 items-center px-10">
                <span className="text-sm font-medium text-gray-700">
                  Reason of Refund :
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  {order?.refund_descriptions}
                </p>
              </div>

              <div className="flex items-center flex-col mr-4 gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Refund Amount :{" "}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  ₹{order?.refund_amount}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Refund Status :
                </span>
                <span
                  className={`${
                    order.refund_status === 1
                      ? "badge badge-primary"
                      : "badge badge-warning"
                  } badge-outline badge-sm`}
                >
                  {RefundStatus[order?.refund_status]}{" "}
                </span>
              </div>

              <button
                className="btn btn-secondary flex items-center gap-2 ml-auto"
                onClick={handleViewRefundReceipt}
              >
                <RiFilePaperLine size={20} color="gray" /> Refund Receipt
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="space-y-6">
          <div className="card p-2">
            <div className="card-header border-none p-2 mb-2 ml-2">
              <div className="card-title align-items-start flex-column">
                <div className="flex items-baseline justify-start flex-wrap sm:!gap-2 gap-1">
                  <h3 className="card-title text-lg">Order Items</h3>
                  <span className="text-gray-700 text-sm font-bold rounded-lg flex">
                    Total Items : {order?.items.length}
                  </span>
                  <span className="text-gray-700 text-sm font-bold rounded-lg flex">
                    Total Quantity :
                    {order?.items?.reduce((accumulator, currentValue) => {
                      return accumulator + currentValue.quantity;
                    }, 0)}
                  </span>
                </div>
              </div>

              <div className="flex flex-end">
                <button
                  className="flex items-center btn-light btn-sm sm:btn smmobile:btn-sm smmobile:btn"
                  onClick={handlePrintGeneralLabel}
                >
                  <p className="text-gray-700">Print General Label</p>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="card-body p-0 ml-4">
                <div className="scrollable-y-hover pe-4 pb-4 max-h-[400px] mb-4">
                  <div className="space-y-4">
                    {order?.items?.length > 0 ? (
                      order?.items?.map((item: any, index) => (
                        <div
                          key={item?.item_id}
                          className="border border-gray-200 rounded-xl gap-2 px-4 py-4 bg-gray-50"
                        >
                          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 justify-between xmobile:flex-col">
                            <div className="flex items-center gap-3.5 xmobile:flex-col">
                              <img
                                alt={item?.product.name}
                                className="w-16 h-16 shrink-0 object-cover rounded"
                                src={item?.product.image}
                              />
                              <div className="flex flex-col ">
                                <span className="text-sm font-semibold text-gray-900 mb-px xmobile:ml-8">
                                  {item?.product?.name} ({item?.quantity})
                                </span>
                                <span className="text-2sm font-medium text-gray-600">
                                  Category: {item?.category?.name}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center flex-row gap-2">
                              <div className="badge badge-sm flex gap-1 badge-success badge-outline text-xs">
                                <span className="mobile:hidden">
                                  Service :{" "}
                                </span>
                                <span>{item?.service?.name}</span>
                              </div>
                              <div>
                                <button
                                  className="flex items-center btn-light btn-sm sm:btn smmobile:btn-sm smmobile:btn"
                                  onClick={() => handlePrintLabel(index)}
                                >
                                  <p className="text-gray-700">Print Label</p>
                                </button>
                              </div>
                            </div>
                          </div>
                          {item?.description && (
                            <div className="mt-2 p-3 bg-gray-100 rounded-md">
                              <p className="text-sm text-gray-600">
                                <span className="text-sm font-medium text-gray-600">
                                  Description :
                                </span>{" "}
                                {item?.description}
                              </p>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm font-semibold text-gray-900 mb-px xmobile:ml-8">
                        No item found for this order
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {order?.description && (
            <div className="card rounded-xl">
              <div className="flex items-center justify-between grow gap-5 p-5 bg-[center_right_-8rem] bg-no-repeat bg-[length:700px] upgrade-bg">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2.5">
                      <h3 className="card-title">Customer Instruction</h3>
                    </div>
                    <div className="text-2sm font-medium text-gray-700">
                      {order.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="col-span-2 lg:col-span-1 flex">
            <div className="card grow">
              <div className="card-header">
                <h3 className="card-title">Order Summary</h3>
              </div>
              <div className="card-body pt-4 pb-3">
                <table className="table-auto">
                  <tbody>
                    <tr>
                      <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                        Sub Total:
                      </td>
                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        ₹{order?.sub_total}
                      </td>
                    </tr>

                    {order?.normal_delivery_charges !== 0 && (
                      <tr>
                        <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                          Normal Delivery Charge:
                        </td>
                        <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                          ₹{order?.normal_delivery_charges}
                        </td>
                      </tr>
                    )}

                    {order?.express_delivery_charges !== 0 && (
                      <tr>
                        <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                          Express Delivery Charge:
                        </td>
                        <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                          ₹{order?.express_delivery_charges}
                        </td>
                      </tr>
                    )}

                    {order?.express_delivery_hour ? (
                      <tr>
                        <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                          Express Delivery Hours:
                        </td>
                        <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                          {order?.express_delivery_hour} Hours
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}

                    {order?.kasar_amount !== 0 && (
                      <tr>
                        <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                          Kasar Amount:
                        </td>
                        <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                          ₹{order?.kasar_amount}
                        </td>
                      </tr>
                    )}

                    {order?.coupon_code !== "" && (
                      <tr>
                        <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                          Coupon Code:
                        </td>
                        <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                          {order?.coupon_code}
                        </td>
                      </tr>
                    )}

                    {order?.coupon_discount !== 0 && (
                      <tr>
                        <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                          Coupon Discount
                        </td>
                        <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                          ₹{order?.coupon_discount}
                        </td>
                      </tr>
                    )}

                    <tr>
                      <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                        Total:
                      </td>
                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        ₹{order?.total}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {order?.gst_company_name && order?.gstin && (
            <div className="col-span-2 lg:col-span-1 flex">
              <div className="card min-w-full">
                <div className="card-header">
                  <h3 className="card-title">GST Information</h3>
                </div>
                <div className="card-body pt-4 pb-3">
                  <div className="scrollable-x-auto">
                    <table className="table-auto">
                      <tbody>
                        <tr>
                          <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                            GSTIN :
                          </td>
                          <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                            {order?.gstin || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                            Customer Company Name :
                          </td>
                          <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                            {order?.gst_company_name || "N/A"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="card grow">
            <div className="card-header">
              <h3 className="card-title">Estimated Delivery & Pickup</h3>
            </div>
            <div className="card-body pt-4 pb-3">
              <table className="table-auto">
                <tbody className="flex flex-col gap-2">
                  <tr className="">
                    <td className="text-sm font-medium text-gray-500 min-w-36 pe-9">
                      Estimated Pickup Time:
                    </td>
                    <td className="text-sm font-medium text-gray-700">
                      {dayjs(order?.estimated_pickup_time).format("DD/MM/YYYY")}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm font-medium text-gray-500 min-w-36 pe-6">
                      Estimated Delivery Time:
                    </td>
                    <td className="text-sm font-medium text-gray-700">
                      {dayjs(order?.estimated_delivery_time).format(
                        "DD/MM/YYYY"
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="col-span-2 lg:col-span-1 flex">
            <div className="card min-w-full">
              <div className="card-header">
                <h3 className="card-title">Customer Information</h3>
              </div>
              <div className="card-body pt-4 pb-2">
                <div className="scrollable-x-auto">
                  <table className="table-auto">
                    <tbody>
                      <tr>
                        <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                          Name:
                        </td>
                        <td
                          className="flex items-center gap-2.5 text-sm font-medium text-primary cursor-pointer underline"
                          onClick={() => hadleUserNameClick(order?.user_id)}
                        >
                          {order?.user?.first_name} {order?.user?.last_name}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                          Email:
                        </td>
                        <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                          {order?.user?.email}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                          Mobile Number:
                        </td>
                        <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                          {order?.user?.mobile_number}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {order?.company && Object.keys(order.company).length > 0 && (
            <div className="col-span-2 lg:col-span-1 flex">
              <div className="card min-w-full">
                <div className="card-header">
                  <h3 className="card-title">Company Information</h3>
                </div>
                <div className="card-body pt-4 pb-2">
                  <div className="scrollable-x-auto">
                    <table className="table-auto">
                      <tbody>
                        <tr>
                          <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                            Company Name:
                          </td>
                          <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                            {order?.company?.company_name}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                            Email:
                          </td>
                          <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                            {order?.company.email}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                            Phone Number:
                          </td>
                          <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                            <span>{order?.company?.mobile_number}</span>
                            {order?.company?.phone_number && (
                              <>
                                <span>|</span>
                                <span>{order?.company?.phone_number}</span>
                              </>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {order?.branch && (
            <div className="col-span-2 lg:col-span-1 flex">
              <div className="card min-w-full">
                <div className="card-header">
                  <h3 className="card-title">Branch Information</h3>
                </div>
                <div className="card-body pt-4 pb-2">
                  <div className="scrollable-x-auto">
                    <table className="table-auto">
                      <tbody>
                        <tr>
                          <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                            Branch Name:
                          </td>
                          <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                            {order?.branch?.branch_name}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                            Email:
                          </td>
                          <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                            {order?.branch?.branch_email}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                            Phone Number:
                          </td>
                          <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                            {order?.branch?.branch_phone_number}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {order?.pickup_boy && (
            <div className="card rounded-xl">
              <div className="flex items-center justify-between grow gap-5 p-5 bg-[center_right_-8rem] bg-no-repeat bg-[length:700px] upgrade-bg">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2.5">
                      <h3 className="card-title">Pickup Boy Information</h3>
                    </div>
                    <div className="text-2sm font-medium text-gray-700">
                      {order?.pickup_boy?.pickup_boy_name}
                    </div>
                    {order?.pickup_comment && (
                      <div className="mt-2 p-3 bg-gray-100 rounded-md">
                        <p className="text-sm text-gray-600">
                          {order?.pickup_comment}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {order?.delivery_boy && (
            <div className="card rounded-xl">
              <div className="flex items-center justify-between grow gap-5 p-5 bg-[center_right_-8rem] bg-no-repeat bg-[length:700px] upgrade-bg">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2.5">
                      <h3 className="card-title">Delivery Boy Information</h3>
                    </div>
                    <div className="text-2sm font-medium text-gray-700">
                      {order?.delivery_boy?.delivery_boy_name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="card rounded-xl">
            <div className="flex items-center justify-between grow gap-5 p-5 bg-[center_right_-8rem] bg-no-repeat bg-[length:700px] upgrade-bg">
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <h3 className="card-title">Shipping Address</h3>
                  </div>
                  <div className="text-2sm font-medium text-gray-700">
                    {order?.address_details !== "null" &&
                    order?.address_details.trim() !== ""
                      ? order?.address_details
                      : "Address not provided."}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2 lg:col-span-1 flex">
            <div className="card min-w-full">
              <div className="card-header">
                <h3 className="card-title">Payment Information</h3>
              </div>
              <div className="card-body pt-4 pb-3">
                <div className="scrollable-x-auto">
                  <table className="table-auto">
                    <tbody>
                      <tr>
                        <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                          Payment Type:
                        </td>
                        <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                          {PaymentType[order?.payment_type]}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                          Payment Status:
                        </td>
                        <td
                          className={`badge-outline ${getPaymentStatusLabel(
                            order?.payment_status
                          )}`}
                        >
                          {paymentStatusLabel}
                        </td>
                      </tr>
                      {order?.paid_amount > 0 && (
                        <tr>
                          <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                            Paid amount:
                          </td>
                          <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                            {order?.paid_amount}
                          </td>
                        </tr>
                      )}
                      {order?.kasar_amount > 0 && (
                        <tr>
                          <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                            kasar amount:
                          </td>
                          <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                            {order?.kasar_amount}
                          </td>
                        </tr>
                      )}
                      {order?.pending_due_amount > 0 && (
                        <tr>
                          <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                            Pending amount:
                          </td>
                          <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                            {order?.pending_due_amount}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                          Transaction ID:
                        </td>
                        <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                          {order?.transaction_id || "N/A"}
                        </td>
                      </tr>
                      <tr style={{ display: "none" }}>
                        <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                          GSTIN :
                        </td>
                        <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                          {order?.gstin || "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {(hasPermission(3, "update") || hasPermission(16, "update")) && (
        <div className="mt-6 card rounded-xl p-6 shadow">
          <h2 className="text-lg font-medium text-gray-700 mb-4">
            Order Notes
          </h2>

          <div>
            <div className="relative border border-gray-300 rounded-md p-2">
              <textarea
                className="w-full h-16 p-3 border-none focus:outline-none focus:ring-0"
                placeholder="Add a new note..."
                value={formData.text_note || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    text_note: e.target.value,
                  })
                }
                rows={5}
              />
              <div className="flex items-center mt-2 gap-4">
                <div>
                  <button
                    className="btn btn-light"
                    title="Attach image"
                    onClick={handleIconClick}
                  >
                    Attach image <IoIosAttach size={20} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    multiple
                    onChange={handleChange}
                    name="images"
                  />
                </div>

                {/* <div>
                  <button
                    className="btn btn-light"
                    title="Take Photo"
                    onClick={openCamera}
                  >
                    Take Photo <MdLinkedCamera size={20} />
                  </button>

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    capture="user" // front camera
                    style={{ display: "none" }}
                    onChange={handleChange}
                    name="images"
                  />
                </div> */}
              </div>
            </div>
            <p className="text-red-500 text-sm">{errorMessage || "\u00A0"}</p>
          </div>

          <div>
            {formData.images.map((image, index) => (
              <div
                key={index}
                className="relative inline-block mr-2 mb-2 group"
              >
                <img
                  src={URL.createObjectURL(image as File)}
                  alt={`Preview ${index}`}
                  className="w-32 h-32 object-cover rounded-md border"
                />
                <button
                  className="absolute top-0 right-0 rounded-full p-1 shadow-md text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  onClick={() => handleRemoveImage(index)}
                >
                  <RxCross2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex relative justify-start pt-2.5">
            <button
              className={`px-4 py-2 btn btn-primary 
          ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={hanldeAddNote}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Note"}
            </button>
          </div>

          <ul className="mt-4 space-y-4">
            {order?.notes?.map((note: any, index: any) => {
              const formattedDate = dayjs(note.created_at).format(
                "HH:mm, DD/MM/YYYY"
              );

              return (
                <div key={index} className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="block text-sm text-gray-600">
                      • {note?.user?.first_name} {note?.user?.last_name}
                    </span>

                    <span className="text-xs text-gray-500">
                      {formattedDate}
                    </span>
                  </div>

                  <li className="p-4 border rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 transition duration-200 relative">
                    <p className="text-gray-800 mb-2">{note?.text_note}</p>

                    {note?.images && note?.images?.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-3">
                        {note?.images?.map((image: string, index: number) => (
                          <img
                            key={index}
                            src={image}
                            className="w-full h-auto rounded-md border shadow-sm"
                            alt={`Note Attachment ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}

                    {note?.user_id === userId && (
                      <div className="flex items-center justify-between mt-4">
                        <label className="flex items-center space-x-2 text-sm text-gray-700">
                          <input
                            type="checkbox"
                            className="checkbox"
                            checked={note?.is_visible}
                            disabled={updatingNote}
                            onChange={(e) =>
                              handleToggleNoteVisibility(
                                note?.note_id,
                                e.target.checked
                              )
                            }
                          />
                          <span>Visible on website</span>
                        </label>

                        <button
                          className="bg-red-100 hover:bg-red-200 p-2 rounded-full"
                          onClick={() => hanldeDeleteNote(note?.note_id)}
                        >
                          <FaTrash className="text-red-500" />
                        </button>
                      </div>
                    )}
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      )}

      {pbModel2IsOpen && (
        <PickUpBoyModelEd2
          order={order}
          setModelOpen={setPbModel2IsOpen}
          setAssigned={setAssigned}
        />
      )}

      <PickupBoyModal
        orderStatus={
          order?.order_status_details.next_step === "Assign Pickup Boy" ||
          order?.order_status_details.next_step === "Assign Delivery boy"
            ? order?.order_status_details.next_step
            : undefined
        }
        modelOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        orderId={[order_id]}
        setAssigned={setAssigned}
      />

      <WorkshopModal
        orderStatus={
          order?.order_status_details.next_step === "Assign Branch" ||
          order?.order_status_details.next_step === "Assign Workshop"
            ? order?.order_status_details.next_step
            : undefined
        }
        orderIds={[order_id]}
        workshopModalOpen={workshopModalOpen}
        onClose={() => setWorkshopModalOpen(false)}
        setAssigned={(value) => {
          if (value) {
            fetchOrder(order_id);
          }
        }}
      />

      <OrderCalcelModal
        orderId={order?.order_id}
        orderCancelModalOpen={orderCancelModalOpen}
        onClose={() => setOrderCancelModalOpen(false)}
        setRefetch={setRefetch}
      />

      <OrderRefundModal
        orderId={order?.order_id}
        TotalAmount={order?.total}
        PaidAmount={order?.paid_amount}
        orderRefundModalOpen={orderRefundModalOpen}
        onClose={() => setOrderRefundModalOpen(false)}
        setRefetch={setRefetch}
      />

      {dueDTModelIsOpen && (
        <DueDetailsModel
          orders={[order]}
          onClose={() => setDueDTModelIsOpen(false)}
          onSuccess={(value) => {
            if (value) {
              setDueDTModelIsOpen(false);
              fetchOrder(order_id);
            }
          }}
        />
      )}
    </div>
  );
};

export default OrderDetails;
