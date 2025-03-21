import { useEffect, useState } from "react";
import { PaymentStatus, PaymentType } from "../../../types/enums";
import useGetUser from "../../hooks/user/useGetuser";
import { getOrderStatusLabel } from "../../utils/orderStatusClasses";
import { getPaymentStatusLabel } from "../../utils/paymentStatusClasses";
import LoadingSpinner from "../shimmer/LoadingSpinner";

interface CustomerOrdersProps {
  user: any;
  userId: number;
  count: number;
}

const CustomerOrders: React.FC<CustomerOrdersProps> = ({
  user,
  userId,
  count,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(100);

  const { fetchUser, loading } = useGetUser();

  const [customerOrders, setCustomerOrders] = useState([]);

  useEffect(() => {
    setCustomerOrders(user?.orders);
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      const retrivedOrders = await fetchUser(userId, currentPage, perPage);

      if (retrivedOrders) {
        setCustomerOrders((prev) => {
          const existingOrderIds = new Set(prev.map((order) => order.order_id));
          const newOrders = retrivedOrders?.filter(
            (order: { order_id: any }) => !existingOrderIds.has(order.order_id)
          );
          return [...prev, ...newOrders];
        });
      }
    };
    fetchData();
  }, [currentPage]);

  const handleViewOrder = (order_id: number) => {
    window.open(`/order/${order_id}`, "_blank");
  };

  const handleGetOrders = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className="grid gap-5 lg:gap-7.5 mt-5">
        <div className="card card-grid min-w-full">
          <div className="card-header">
            <h3 className="text-xl font-semibold mb-1">Orders</h3>
            <span className="text-gray-700 text-lg font-semibold px-3 py-1 rounded-lg">
              Total Orders: {count}
            </span>
          </div>

          <div className="scrollable-x-auto">
            <table className="table table-auto table-border">
              <thead>
                <tr>
                  <th>Id</th>
                  <th className="min-w-[220px]">Status</th>
                  <th className="min-w-[60px]">Item Count</th>
                  <th>Total</th>
                  <th className="min-w-[80px]">Paid Amount</th>
                  <th className="">Kasar Amount</th>
                  <th className="min-w-[140px]">Payment Type</th>
                  <th className="min-w-[135px]">Payment Status</th>
                  <th className="min-w-[130px]">Actions</th>
                </tr>
              </thead>
              {customerOrders?.length > 0 ? (
                <tbody>
                  {customerOrders?.map((order: any) => {
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
      </div>

      {customerOrders?.length < count && (
        <div className="mt-2 flex justify-center items-center">
          <button
            className="btn btn-primary custom-rounded"
            onClick={handleGetOrders}
            disabled={loading}
          >
            {loading ? (
              <>
                Loading <LoadingSpinner />
              </>
            ) : (
              <>Load More</>
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default CustomerOrders;
