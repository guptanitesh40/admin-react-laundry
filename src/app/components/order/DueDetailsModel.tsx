/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import usePayDue from "../../hooks/due/useReviewDue";
import { useNavigate } from "react-router-dom";

interface User {
  first_name: string;
  last_name: string;
  mobile_number: string;
}

interface Order {
  order_id: number;
  user: User;
  total: number;
  paid_amount: number;
  kasar_amount: number;
  payment_status: number;
  user_id: number;
  items: any;
}

interface DueDetailsModelProps {
  orders: Order[];
  onClose: () => void;
  onSuccess: (value: boolean) => void;
}

interface OrderFormData {
  user: User;
  user_id: number;
  order_id: number;
  total: number;
  paid_amount: number;
  kasar_amount: number;
  current_paid: number;
  payment_status: number;
  total_items: number;
  total_quantity: number;
}

const DueDetailsModel: React.FC<DueDetailsModelProps> = ({
  orders,
  onClose,
  onSuccess,
}) => {
  const navigate = useNavigate();
  const { payDue, loading } = usePayDue();
  const [formData, setFormData] = useState<OrderFormData[]>([]);
  const [errors, setErrors] = useState<{ [key: number]: string }>({});

  const handleSubmit = async () => {
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix errors before submitting.");
      return;
    }

    const order_status = 11;
    const ordersToSubmit = formData.map(
      ({ order_id, current_paid, payment_status, kasar_amount, user_id }) => ({
        order_id,
        paid_amount: current_paid,
        payment_status,
        kasar_amount,
        order_status: order_status,
        user_id,
      })
    );

    const result = await payDue(ordersToSubmit);
    if (result) {
      onSuccess(true);
    }
  };

  const handleInputChange = (
    orderId: number,
    field: keyof OrderFormData,
    value: number
  ) => {
    setFormData((prev) =>
      prev.map((order) => {
        if (order.order_id !== orderId) return order;

        const updatedOrder = { ...order };

        if (field === "kasar_amount") {
          const maxKasar = order.total - order.paid_amount;
          const clampedKasar = Math.min(value, maxKasar - 1);

          if (order.current_paid === 0) {
            updatedOrder.kasar_amount = clampedKasar;
          } else {
            updatedOrder.kasar_amount = clampedKasar;
            const newCurrentPaid =
              order.total - (order.paid_amount + clampedKasar);
            updatedOrder.current_paid = Math.max(newCurrentPaid, 0);
          }
        } else {
          updatedOrder[field] = value;
        }

        const totalPaid =
          updatedOrder.current_paid +
          updatedOrder.kasar_amount +
          updatedOrder.paid_amount;

        if (totalPaid > updatedOrder.total) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [orderId]: "Paid amount cannot exceed total amount.",
          }));
        } else {
          setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[orderId];
            return newErrors;
          });
        }

        if (totalPaid === updatedOrder.total) {
          updatedOrder.payment_status = 2;
        } else if (totalPaid > 0) {
          updatedOrder.payment_status = 3;
        } else {
          updatedOrder.payment_status = 1;
        }

        return updatedOrder;
      })
    );
  };

  useEffect(() => {
    if (orders.length > 0) {
      setFormData(
        orders.map((order) => {
          const remainingDue =
            order.total - (order.paid_amount + order.kasar_amount);

          return {
            user: order.user,
            user_id: order.user_id,
            order_id: order.order_id,
            total: order.total,
            paid_amount: order.paid_amount,
            kasar_amount: order.kasar_amount,
            current_paid: remainingDue,
            payment_status: 2,
            total_items: order.items?.length || 0,
            total_quantity:
              order.items?.reduce(
                (accumulator: number, currentValue: any) =>
                  accumulator + currentValue.quantity,
                0
              ) || 0,
          };
        })
      );
    }
  }, [orders]);

  if (!orders.length) {
    toast.error("Order not found.");
    onClose();
    return;
  }

  return (
    <div className="fixed inset-0 z-50 p-4 grid place-items-center overflow-y-auto">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-[700px] z-10 relative">
        <button
          className="btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default"
          onClick={onClose}
        >
          <i className="ki-filled ki-cross"></i>
        </button>
        <h2 className="text-xl font-bold mb-6">Order Due Summary</h2>
        <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto">
          {formData.map((order) => {
            const {
              order_id,
              user_id,
              user,
              total,
              paid_amount,
              total_items,
              total_quantity,
              kasar_amount,
              current_paid,
              payment_status,
            } = order;
            const { first_name, last_name, mobile_number } = user;
            return (
              <div className="card" key={order_id}>
                <div className="py-2 px-4 border-b border-gray-200 flex justify-between gap-4 items-center">
                  <div className="flex flex-col gap-1">
                    <a
                      href={`/order/${order_id}`}
                      target="__blank"
                      className="text-base font-bold link"
                    >
                      #{order_id}
                    </a>
                    <a
                      href={`/customer/${user_id}`}
                      target="_blank"
                      className="text-primary text-sm font-semibold cursor-pointer"
                    >{`${first_name} ${last_name} (${mobile_number})`}</a>
                  </div>

                  <div className="flex flex-col gap-1">
                    {total === paid_amount + kasar_amount ? (
                      <p className="badge-outline badge badge-info justify-self-start">
                        Payement Received
                      </p>
                    ) : (
                      <>
                        <p className="form-label !text-red-500 !font-bold">
                          Total Due Amount
                        </p>
                        <p className="form-label justify-center !text-red-500 !font-bold">
                          {total - paid_amount - kasar_amount}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="py-3 px-4">
                  <div>
                    <div className="flex items-stretch gap-3">
                      <div className="basis-[225px] grid grid-cols-2 gap-y-2 items-center gap-x-4">
                        <p className="form-label">Total Amount</p>
                        <p className="form-label justify-center">{total}</p>

                        <p className="form-label">Paid Amount</p>
                        <p className="form-label justify-center">
                          {paid_amount}
                        </p>

                        <p className="form-label">Total Items</p>
                        <p className="form-label justify-center">
                          {total_items}
                        </p>

                        <p className="form-label">Total Quantity</p>
                        <p className="form-label justify-center">
                          {total_quantity}
                        </p>
                      </div>

                      <div className="grow grid grid-cols-2 gap-y-2 items-center">
                        <label htmlFor="kasar_amount" className="form-label">
                          Kasar Amount
                        </label>
                        <input
                          id="kasar_amount"
                          className="form-control border border-gray-400 rounded px-3 py-2 input"
                          type="text"
                          value={kasar_amount}
                          autoComplete="off"
                          disabled={total === paid_amount + kasar_amount}
                          onChange={(e) =>
                            handleInputChange(
                              order_id,
                              "kasar_amount",
                              Number(e.target.value)
                            )
                          }
                        />

                        <label
                          htmlFor="current_paid_amount"
                          className="form-label"
                        >
                          Current Paid
                        </label>
                        <div>
                          <input
                            id="current_paid_amount"
                            className="form-control border border-gray-400 rounded px-3 py-2 input"
                            type="text"
                            value={current_paid}
                            autoComplete="off"
                            disabled={total === kasar_amount + paid_amount}
                            onChange={(e) =>
                              handleInputChange(
                                order_id,
                                "current_paid",
                                Number(e.target.value)
                              )
                            }
                          />
                        </div>

                        <label htmlFor="payement_status" className="form-label">
                          Payment Status
                        </label>
                        <select
                          id="payement_status"
                          className="form-select border border-gray-400 rounded px-3 py-2 select"
                          value={payment_status}
                          disabled={
                            total === kasar_amount + paid_amount ? true : false
                          }
                          onChange={(e) =>
                            handleInputChange(
                              order_id,
                              "payment_status",
                              Number(e.target.value)
                            )
                          }
                        >
                          <option value={1}>Pending</option>
                          <option value={2}>Received</option>
                          <option value={3}>Partial received</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      {errors[order_id] && (
                        <p className="text-red-500 text-sm mt-1 text-right">
                          {errors[order_id]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 space-x-4">
          <button
            type="button"
            className="btn btn-primary relative"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "loading..." : "Submit"}
          </button>
          <button type="button" className="btn btn-light" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DueDetailsModel;
