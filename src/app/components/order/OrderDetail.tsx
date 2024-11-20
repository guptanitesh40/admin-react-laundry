import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { OrderStatus, PaymentStatus, PaymentType } from "../../../types/enums"; // Ensure these enums are defined
import useGetSingleOrder from "../../hooks/order/useGetOrder";
import useGetOrder from "../../hooks/order/useGetOrder";

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const order_id = Number(id);

  const { order, fetchOrder } = useGetOrder();

  useEffect(() => {
    fetchOrder(order_id);
  },[])

  if(!order) return;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center bg-gray-100 p-6 rounded-md shadow">
        <h1 className="text-xl font-semibold leading-none text-gray-900">
          Order Details - #{order_id}
        </h1>
        <span
          className={`px-4 py-2 rounded-full text-white ${
            OrderStatus[order.order_status] === "Pending"
              ? "bg-yellow-500"
              : OrderStatus[order.order_status] === "Processing"
              ? "bg-blue-500"
              : OrderStatus[order.order_status] === "Completed"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {OrderStatus[order.order_status]}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-md shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Order Items</h2>
            </div>
            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div
                  key={item.item_id}
                  className="flex items-center justify-between border border-gray-200 rounded-xl gap-2 px-4 py-4 bg-secondary-clarity"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      alt={item.product.name}
                      className="w-10 shrink-0 object-cover rounded"
                      src={item.product.image}
                    />
                    <div className="flex flex-col">
                      <a
                        className="text-sm font-semibold text-gray-900 hover:text-primary-active mb-px"
                        href="#"
                      >
                        {item.product.name}
                      </a>
                      <span className="text-2sm font-medium text-gray-600">
                        Category: {item.category.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="badge badge-lg badge-success badge-outline">
                      Service: {item.service.name}
                    </span>                    
                  </div>
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
                        Payment Type::
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

          <div className="col-span-2 lg:col-span-1 flex">
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
                        {new Date(order.estimated_pickup_time).toLocaleDateString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                        Estimated Delivery Time:
                      </td>
                      <td className="text-sm font-medium text-gray-700">
                        {new Date(order.estimated_delivery_time).toLocaleDateString()}
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
   
  );
};

export default OrderDetails;
