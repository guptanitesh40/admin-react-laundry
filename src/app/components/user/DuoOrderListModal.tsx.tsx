import { useEffect, useState } from "react";
import useGetUser from "../../hooks/user/useGetuser";
import useClearDueAmount from "../../hooks/order/useClearDueAmount";
import { getPaymentStatusLabel } from "../../utils/paymentStatusClasses";

interface DuoOrderListModalProps {
  modalOpen: boolean;
  onClose: () => void;
  userId: number;
  setRefetch: (value: boolean) => void;
  count: number;
}

interface Order {
  order_id: number | null;
  total: number | null;
  paid_amount: number | null;
  kasar_amount: number | null;
  payment_status: number | null;
  current_paid: number | null;
  current_total: number | null;
  order_status: number | null;
}

const DuoOrderListModal: React.FC<DuoOrderListModalProps> = ({
  modalOpen,
  onClose,
  userId,
  setRefetch,
  count,
}) => {
  const { userData, fetchUser, loading: loadingOrders } = useGetUser();
  const { clearDueAmount, loading } = useClearDueAmount();
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [updatedOrders, setUpdatedOrders] = useState<Order[]>([]);
  const [fullPayment, setFullPayment] = useState<boolean>();
  const page = 1;

  const user = userData?.user;

  useEffect(() => {
    if (modalOpen) {
      fetchUser(userId, page, count);
    }
  }, [modalOpen, userId]);

  useEffect(() => {
    if (user?.orders) {
      const paymentDueOrders = user.orders.filter(
        (order: Order) =>
          ![2].includes(order.payment_status) &&
          ![12, 13].includes(order.order_status)
      );
      paymentDueOrders.map((order: Order) => ({
        ...order,
        kasar_amount: order.kasar_amount || null,
        payment_status: order.payment_status || null,
        current_total: 0,
      }));
      setFilteredOrders(paymentDueOrders);
    }
  }, [user]);

  const handleInputChange = (orderId: number, field: string, value: number) => {
    const updated = filteredOrders.map((order) => {
      if (order.order_id === orderId) {
        const updatedOrder = {
          ...order,
          [field]: value,
        };

        updatedOrder.current_total =
          (updatedOrder.current_paid || 0) + (updatedOrder.kasar_amount || 0) ||
          0;

        if (updatedOrder.current_total === 0) {
          updatedOrder.payment_status = 1;
        } else if (
          updatedOrder.current_total === order.total ||
          updatedOrder.current_total === order.total - order.paid_amount
        ) {
          setFullPayment(true);
          updatedOrder.payment_status = 2;
        } else {
          setFullPayment(false);
          updatedOrder.payment_status = 3;
        }

        return updatedOrder;
      }
      return order;
    });

    setFilteredOrders(updated);
    const updatedOrder = updated.find((order) => order.order_id === orderId);

    if (updatedOrder) {
      setUpdatedOrders((prev) => {
        const existingIndex = prev.findIndex((o) => o.order_id === orderId);

        if (existingIndex > -1) {
          const updatedPrev = [...prev];
          updatedPrev[existingIndex] = updatedOrder;
          return updatedPrev;
        }
        return [...prev, updatedOrder];
      });
    }
  };

  const handleSave = async () => {
    if (updatedOrders.length === 0) {
      onClose();
      return;
    }

    const payload = {
      user_id: userId,
      filteredOrders: updatedOrders.map(
        ({ order_id, payment_status, kasar_amount, current_paid }) => ({
          order_id,
          paid_amount: current_paid || 0,
          payment_status,
          kasar_amount,
        })
      ),
    };

    const success = await clearDueAmount(userId, payload.filteredOrders);
    if (success) {
      onClose();
      setUpdatedOrders([]);
    }
    setRefetch(true);
  };

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-[1000px] z-10 relative max-h-[80vh] overflow-auto">
        <button
          className="btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default"
          data-modal-dismiss="true"
          onClick={onClose}
        >
          <i className="ki-filled ki-cross"></i>
        </button>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Orders</h1>
          <button
            className="btn btn-primary btn-lg flex flex-end mt-10"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
        <div className="grid gap-5 lg:gap-5.5">
          <div className="card card-grid min-w-full">
            <div className="card-body">
              <div className="scrollable-x-auto">
                <table className="table table-auto table-border">
                  <thead>
                    <tr>
                      <th className="min-w-[30px]">Id</th>
                      <th className="min-w-[120px]">Total</th>
                      <th className="min-w-[120px]">Paid Amount</th>
                      <th className="min-w-[120px]">Kasar Amount</th>
                      <th className="min-w-[120px]">Current Paid</th>
                      <th className="min-w-[190px]">Current Total</th>
                      <th className="min-w-[120px]">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => {
                      const currentTotal =
                        (order.paid_amount || 0) +
                        (order.kasar_amount || 0) +
                        (order.current_paid || 0);

                      const paymentStatusClass = getPaymentStatusLabel(
                        order.payment_status,
                        true
                      );

                      return (
                        <tr key={order.order_id} className="custom-row">
                          <td>#{order.order_id}</td>
                          <td>₹{order.total || 0}</td>
                          <td>₹{order.paid_amount || 0}</td>
                          <td>
                            <input
                              type="text"
                              className="input input-bordered"
                              value={order.kasar_amount || 0}
                              onChange={(e) =>
                                handleInputChange(
                                  order.order_id,
                                  "kasar_amount",
                                  Number(e.target.value)
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input input-bordered"
                              value={order.current_paid || 0}
                              onChange={(e) =>
                                handleInputChange(
                                  order.order_id,
                                  "current_paid",
                                  Number(e.target.value)
                                )
                              }
                            />
                          </td>
                          <td
                            className={
                              currentTotal > (order.total || 0)
                                ? "text-red-500"
                                : ""
                            }
                          >
                            <span>₹{order.current_total || 0}</span>
                            {currentTotal > (order.total || 0) ? (
                              <span className="flex mt-1 font-serif">
                                greater then pending amount
                              </span>
                            ) : (
                              ""
                            )}
                          </td>
                          <td>
                            <div>
                              <select
                                className={`select select-lg w-[170px] text-sm ${paymentStatusClass}`}
                                data-datatable-size="true"
                                data-tooltip="#custom_tooltip"
                                value={order.payment_status}
                                onChange={(e) =>
                                  handleInputChange(
                                    order.order_id,
                                    "payment_status",
                                    Number(e.target.value)
                                  )
                                }
                              >
                                <option
                                  value="1"
                                  className={`${paymentStatusClass}`}
                                  disabled={fullPayment || !fullPayment}
                                >
                                  Pending
                                </option>
                                <option value="2" disabled={!fullPayment || order.paid_amount === 0}>
                                  Received
                                </option>
                                <option value="3" disabled={fullPayment}>
                                  Partial Received
                                </option>
                              </select>
                              <div
                                className="hidden rounded-xl shadow-default p-3 bg-light border border-gray-200 text-gray-700 text-xs font-normal"
                                id="custom_tooltip"
                              >
                                Change Payment Status
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
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

export default DuoOrderListModal;
