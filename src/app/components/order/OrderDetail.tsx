import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PaymentStatus, PaymentType } from "../../../types/enums"; // Ensure these enums are defined
import useGetOrder from "../../hooks/order/useGetOrder";
import { BiImageAlt } from "react-icons/bi";
import dayjs from "dayjs";
import { RxCross2 } from "react-icons/rx";
import { useAddNote, useDeleteNote, useUpdateOrderStatus } from "../../hooks";
import toast from "react-hot-toast";
import * as Yup from "yup";
import Swal from "sweetalert2";
import PickupBoyModal from "./PickupBoyModal";
import WorkshopModal from "./AssignWorkshopModal";

const schema = Yup.object().shape({
  text_note: Yup.string().required("Please enter text to add note"),
});

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const order_id = Number(id);

  const { order, fetchOrder } = useGetOrder();
  const { addNote, loading } = useAddNote();
  const { deleteNote } = useDeleteNote();
  const { updateOrderStatus } = useUpdateOrderStatus();

  const [formData, setFormData] = useState({
    user_id: null,
    order_id: null,
    text_note: "",
    images: [] as (string | File)[],
  });

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [workshopModalOpen, setWorkshopModalOpen] = useState<boolean>(false);
  const [assigned, setAssigned] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [confirm, setConfirm] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchOrder(order_id);
    setAssigned(false);
  }, [assigned]);

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
      formDataObj.append("user_id", formData.user_id);
      formDataObj.append("order_id", formData.order_id);
      formDataObj.append("text_note", formData.text_note);

      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((image) => {
          formDataObj.append("images", image);
        });
      }

      const success = await addNote(formDataObj);
      if (success) {
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
        text: "Want to change order status!",
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
    switch (order?.order_status_name) {
      case "Assign Pickup Boy":
      case "Assign Delivery Boy":
        setModalOpen(true);
        break;
      case "Received By Pickup Boy":
        await handleStatusChange(3);
        break;
      case "Work Completed":
        await handleStatusChange(7);
        break;
      case "Items Received At Branch":
      case "Pickup Complete":
        await handleStatusChange(4);
        break;
      case "Ready For Delivery":
        await handleStatusChange(10);
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

  const handleWorkshopStatus = async () => {
    switch (order?.workshop_status_name) {
      case "Order Received":
        await handleStatusChange(5);
        setConfirm(false);
        break;
      case "In Progress":
        await handleStatusChange(6);
        setConfirm(false);
        break;
      case "Completed":
        await handleStatusChange(7);
        setConfirm(false);
        navigate("/workshop-order");
        break;
      default:
        break;
    }
  };

  const handleStatusClick = async () => {
    if (location?.state?.from === "OrderTable") {
      await handleOrderTableStatus();
    } else {
      await handleWorkshopStatus();
    }
  };

  const getOrderStatusLabel = () => {
    return location.state?.from === "OrderTable"
      ? order?.order_status_name
      : order?.workshop_status_name;
  };

  const handleEditOrder = () => {
    navigate(`/order/edit/${order_id}`);
  };

  if (!order) return null;

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between bg-gray-100 p-7 rounded-md shadow">
        <div className="flex">
          <h1 className="mt-2 text-xl font-semibold leading-none text-gray-900">
            Order Details - #{order_id}
          </h1>
          <button
            className="btn btn-primary ml-3 bg-blue-200 rounded-md"
            onClick={handleEditOrder}
          >
            <i className="ki-filled ki-pencil mr-1"></i>Edit Order
          </button>
        </div>

        <button
          className="px-4 py-2 rounded-full text-white bg-orange-500"
          onClick={handleStatusClick}
        >
          {getOrderStatusLabel()}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-md shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Order Items</h2>
              <span className="text-gray-700 text-sm font-semibold px-3 py-1 rounded-lg ">
                Total Items: {order.items.length}
              </span>
            </div>
            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div
                  key={item.item_id}
                  className="border border-gray-200 rounded-xl gap-2 px-4 py-4 bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <img
                        alt={item.product.name}
                        className="w-10 shrink-0 object-cover rounded"
                        src={item.product.image}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900 mb-px">
                          {item.product.name}
                        </span>
                        <span className="text-2sm font-medium text-gray-600">
                          Category: {item.category.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <span className="badge badge-lg badge-success badge-outline text-xs font-medium mr-2 px-2.5">
                        Service: {item.service.name}
                      </span>
                    </div>
                  </div>
                  {item.description && (
                    <div className="mt-2 p-3 bg-gray-100 rounded-md">
                      <p className="text-sm text-gray-600">
                        <span className="text-sm font-medium text-gray-600">
                          Description :
                        </span>{" "}
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

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
                        ₹{order.sub_total}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                        Shipping Charges:
                      </td>
                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        ₹{order.shipping_charges}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                        Express Delivery Charges:
                      </td>
                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        ₹{order.express_delivery_charges}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                        Kasar Amount:
                      </td>
                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        ₹{order.kasar_amount}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                        Coupon Code:
                      </td>
                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        {order.coupon_code}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                        Coupon Discount
                      </td>
                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        ₹{order.coupon_discount}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                        Total:
                      </td>
                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        ₹{order.total}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="card grow">
            <div className="card-header">
              <h3 className="card-title">Estimated Delivery & Pickup</h3>
            </div>
            <div className="card-body pt-4 pb-3">
              <table className="table-auto">
                <tbody>
                  <tr>
                    <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                      Estimated Pickup Time:
                    </td>
                    <td className="text-sm font-medium text-gray-700">
                      {new Date(
                        order.estimated_pickup_time
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                      Estimated Delivery Time:
                    </td>
                    <td className="text-sm font-medium text-gray-700">
                      {new Date(
                        order.estimated_delivery_time
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="col-span-2 lg:col-span-1 flex">
            <div className="card grow">
              <div className="card-header">
                <h3 className="card-title">Customer Information</h3>
              </div>
              <div className="card-body pt-4 pb-3">
                <table className="table-auto">
                  <tbody>
                    <tr>
                      <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                        Name:
                      </td>
                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        {order.user.first_name} {order.user.last_name}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                        Email:
                      </td>
                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        {order.user.email}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                        Mobile Number:
                      </td>
                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        {order.user.mobile_number}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {order.branch && (
            <div className="card rounded-xl">
              <div className="flex items-center justify-between grow gap-5 p-5 bg-[center_right_-8rem] bg-no-repeat bg-[length:700px] upgrade-bg">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2.5">
                      <h3 className="card-title">Branch Information</h3>
                    </div>
                    <div className="text-2sm font-medium text-gray-700">
                      {order.branch.branch_name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {order.pickup_boy && (
            <div className="card rounded-xl">
              <div className="flex items-center justify-between grow gap-5 p-5 bg-[center_right_-8rem] bg-no-repeat bg-[length:700px] upgrade-bg">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2.5">
                      <h3 className="card-title">Pickup Boy Information</h3>
                    </div>
                    <div className="text-2sm font-medium text-gray-700">
                      {order.pickup_boy.pickup_boy_name}
                    </div>
                    {order.pickup_comment && (
                      <div className="mt-2 p-3 bg-gray-100 rounded-md">
                        <p className="text-sm text-gray-600">
                          {order.pickup_comment}
                        </p>
                      </div>
                    )}
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
                    {order.address_details !== "null" &&
                    order.address_details.trim() !== ""
                      ? order.address_details
                      : "Address not provided."}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2 lg:col-span-1 flex">
            <div className="card grow">
              <div className="card-header">
                <h3 className="card-title">Payment Information</h3>
              </div>
              <div className="card-body pt-4 pb-3">
                <table className="table-auto">
                  <tbody>
                    <tr>
                      <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                        Payment Type:
                      </td>
                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        {PaymentType[order.payment_type]}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                        Payment Status:
                      </td>
                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        {PaymentStatus[order.payment_status]}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                        Transaction ID:
                      </td>
                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        {order.transaction_id || "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-md shadow">
        <h2 className="text-lg font-medium text-gray-700 mb-4">Order Notes</h2>

        <div>
          <div className="relative border border-gray-300 rounded-md p-2">
            <textarea
              className="w-full h-[100px] p-3 border-none focus:outline-none focus:ring-0"
              placeholder="Add a new note..."
              value={formData.text_note || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  text_note: e.target.value,
                })
              }
            />
            <div className="flex items-center mt-2">
              <button
                className="text-gray-600 hover:text-gray-700 hover:bg-gray-200 rounded-full p-1 transition-all ease-in-out duration-200"
                title="Attach image"
                onClick={handleIconClick}
              >
                <BiImageAlt size={23} />
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
          </div>
          <p className="text-red-500 text-sm">{errorMessage || "\u00A0"}</p>
        </div>

        <div>
          {formData.images.map((image, index) => (
            <div key={index} className="relative inline-block mr-2 mb-2 group">
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

        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600
          ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={hanldeAddNote}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Note"}
        </button>

        <ul className="mt-6 space-y-4">
          {order.notes?.map((note, index) => {
            const formattedDate = dayjs(note.created_at).format(
              "HH:mm, DD/MM/YYYY"
            );

            return (
              <div key={index} className="relative">
                <div className="flex justify-between items-center mb-2">
                  <span className="block text-sm text-gray-600">
                    • {note.user.first_name} {note.user.last_name}
                  </span>

                  <span className="text-xs text-gray-500">{formattedDate}</span>
                </div>

                <li className="p-4 border rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 transition duration-200 relative">
                  <p className="text-gray-800 mb-2">{note.text_note}</p>

                  {note.images && note.images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-3">
                      {note.images.map((image: string, index: number) => (
                        <img
                          key={index}
                          src={image}
                          className="w-full h-auto rounded-md border shadow-sm"
                          alt={`Note Attachment ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  <div className="menu absolute top-1 right-2" data-menu="true">
                    <div
                      className="menu-item"
                      data-menu-item-offset="0, 10px"
                      data-menu-item-placement="bottom-end"
                      data-menu-item-toggle="dropdown"
                      data-menu-item-trigger="click|lg:click"
                    >
                      <button className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                        <i className="ki-filled ki-dots-vertical"></i>
                      </button>
                      <div
                        className="menu-dropdown menu-default w-full max-w-[175px]"
                        data-menu-dismiss="true"
                      >
                        <div className="menu-item">
                          <button
                            className="menu-link"
                            onClick={() => hanldeDeleteNote(note.note_id)}
                          >
                            <span className="menu-icon">
                              <i className="ki-filled ki-trash"></i>
                            </span>
                            <span className="menu-title">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </div>

      <PickupBoyModal
        orderStatus={
          order?.order_status_name === "Assign Pickup Boy" ||
          order?.order_status_name === "Assign Delivery Boy"
            ? order?.order_status_name
            : undefined
        }
        modelOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        orderId={order_id}
        setAssigned={setAssigned}
      />

      <WorkshopModal
        orderStatus={
          order?.order_status_name === "Assign Branch" ||
          order?.order_status_name === "Assign Workshop"
            ? order?.order_status_name
            : undefined
        }
        orderId={order_id}
        workshopModalOpen={workshopModalOpen}
        onClose={() => setWorkshopModalOpen(false)}
        setAssigned={setAssigned}
      />
    </div>
  );
};

export default OrderDetails;
