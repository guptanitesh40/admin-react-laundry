import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetUser from "../../hooks/user/useGetuser";
import { getPaymentStatusLabel } from "../../utils/paymentStatusClasses";
import { PaymentStatus, PaymentType, Role } from "../../../types/enums";
import { getOrderStatusLabel } from "../../utils/orderStatusClasses";
import { LiaRupeeSignSolid } from "react-icons/lia";
import OrderListModal from "./OrderListModal";
import { getRoleClass } from "../../utils/roleClasses";
import { BASE_URL } from "../../utils/constant";

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const user_id = Number(id);

  const [modalOpen, setModalOpen] = useState<boolean>();
  const [refetch, setRefetch] = useState<boolean>(false);

  const { userData, fetchUser } = useGetUser();

  const user = userData?.user;

  useEffect(() => {
    fetchUser(user_id);
    setRefetch(false);
  }, [user_id, refetch]);

  const handleViewOrder = (order_id: number) => {
    window.open(`/order/${order_id}`, "_blank");
  };

  if (!user) return;

  const totalKasarAmount = user.orders.reduce(
    (sum: any, order: { kasar_amount: any }) => sum + order.kasar_amount,
    0
  );
  const totalOrderAmount = user.orders.reduce(
    (sum: any, order: { total: any }) => sum + order.total,
    0
  );

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col bg-gray-50 p-6 rounded-md shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">
            {user.first_name} {user.last_name}
          </h1>
          {userData?.total_pending_amount !== 0 && (
            <div>
              <span className="text-sm font-medium text-green-700 mr-3">
                Total Pending Amount: ₹{userData.total_pending_amount}
              </span>
              <button
                className="font-extralight btn btn-lg btn-light"
                onClick={handleModalOpen}
              >
                Pay <LiaRupeeSignSolid size={20} />
              </button>
            </div>
          )}
          {user?.role_id !== 5 && (
            <span
              className={`mt-1 p-2 rounded-md text-sm ${getRoleClass(
                user.role_id
              )}`}
            >
              {Role[user.role_id as unknown as keyof typeof Role]}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-7.5 mt-5">

        <div className="col-span-1">
          <div className="card pb-2.5">
            
            <div className="card-header">
              <h3 className="card-title">Personal Information</h3>
            </div>

            <div className="card-body pt-4 pb-3">
              <table className="table-auto">
                <tbody>
                  <tr>
                    <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                      Name:
                    </td>
                    <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                      {user.first_name} {user.last_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                      Email:
                    </td>
                    <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                      email
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                      Mobile Number:
                    </td>
                    <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                      {user.mobile_number}
                    </td>
                  </tr>

                  {user.role_id === 5 ? (
                    <tr>
                      <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                        Profile Photo :
                      </td>
                      <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                        <span className="">
                          <img
                            className="h-14 w-14 rounded-full"
                            src={`${BASE_URL}/images/user/1735042941768.jpeg`}
                          />
                        </span>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                        Role:
                      </td>
                      <span
                        className={`mt-1 p-2 rounded-md text-sm ${getRoleClass(
                          user.role_id
                        )}`}
                      >
                        {Role[user.role_id as unknown as keyof typeof Role]}
                      </span>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {user.role_id === 5 && (
        <div className="card rounded-lg mt-6">
          <div className="card-header">
            <h3 className="text-xl font-semibold mb-1">Orders</h3>
            <span className="text-gray-700 text-lg font-semibold px-3 py-1 rounded-lg">
              Total Orders: {user?.orders?.length}
            </span>
          </div>

          <div className="scrollable-x-auto">
            <table className="table table-auto table-border">
              <thead>
                <tr>
                  <th>Id</th>
                  <th className="min-w-[220px]">Status</th>
                  <th className="min-w-[80px]">Item Count</th>
                  <th>Total</th>
                  <th className="min-w-[80px]">Paid Amount</th>
                  <th className="">Kasar Amount</th>
                  <th className="min-w-[140px]">Payment Type</th>
                  <th className="min-w-[135px]">Payment Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {user.orders.length > 0 ? (
                <tbody>
                  {user.orders.map((order: any) => {
                    const paymentStatusClass = getPaymentStatusLabel(
                      order.payment_status
                    );
                    const orderStatusLabel = getOrderStatusLabel(
                      order.admin_order_status.admin_label
                    );
                    const itemCount = order.items.length;

                    return (
                      <tr key={order.order_id}>
                        <td>#{order.order_id}</td>
                        <td>
                          <span
                            className={`${orderStatusLabel} badge-outline badge-xl rounded-[30px]`}
                          >
                            {order.admin_order_status.admin_label}
                          </span>
                        </td>
                        <td>{itemCount}</td>
                        <td>₹{order.total}</td>
                        <td>
                          ₹
                          {order.paid_amount === "" || 0
                            ? 0
                            : order.paid_amount}
                        </td>
                        <td>
                          ₹
                          {order.kasar_amount === "" || 0
                            ? 0
                            : order.kasar_amount}
                        </td>
                        <td>
                          <span className="badge badge-outline">
                            {
                              PaymentType[
                                order.payment_type as unknown as keyof typeof PaymentType
                              ]
                            }
                          </span>
                        </td>
                        <td>
                          <span
                            className={`${paymentStatusClass} badge-outline`}
                          >
                            {
                              PaymentStatus[
                                order.payment_status as unknown as keyof typeof PaymentStatus
                              ]
                            }
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleViewOrder(order.order_id)}
                          >
                            View Order
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={9} className="text-center">
                      No Orders available
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      )}

      {user?.orders.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="space-y-6">
            <div className="col-span-2 lg:col-span-1 flex">
              <div className="card grow">
                <div className="card-header">
                  <h3 className="card-title">Orders Summary</h3>
                </div>
                <div className="card-body pt-4 pb-3">
                  <table className="table-auto">
                    <tbody>
                      <tr>
                        <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                          Total Kasar Amount:
                        </td>
                        <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                          ₹{totalKasarAmount}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                          Total Order Amount:
                        </td>
                        <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                          ₹{totalOrderAmount}
                        </td>
                      </tr>
                      {userData.total_pending_amount > 0 && (
                        <tr>
                          <td className="text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6">
                            Total Pending Amount:
                          </td>
                          <td className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                            ₹{userData.total_pending_amount}
                          </td>
                          <td>
                            <button
                              className="relative bottom-3 left-4 font-extralight btn btn-lg btn-light"
                              onClick={handleModalOpen}
                            >
                              Pay <LiaRupeeSignSolid size={20} />
                            </button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <OrderListModal
        modalOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        userId={user_id}
        setRefetch={setRefetch}
      />
    </div>
  );
};

export default UserProfile;
