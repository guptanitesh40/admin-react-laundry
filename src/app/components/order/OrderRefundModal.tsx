import { useEffect, useState } from "react";
import { useRefundOrder } from "../../hooks";
import * as Yup from "yup";
import toast from "react-hot-toast";

interface OrderRefundModalProps {
  orderRefundModalOpen: boolean;
  onClose: () => void;
  orderId: number;
  TotalAmount: number;
  PaidAmount: number;
  setRefetch: (value: boolean) => void;
}

const schema = Yup.object().shape({
  refund_description: Yup.string().required(
    "Please enter text to add description"
  ),
  refund_amount: Yup.number()
    .required("Refund amount is required")
    .typeError("Refund amount must be a number")
    .min(0, "Refund amount must be a positive number")
    .test(
      "max-refund",
      "Refund amount cannot be greater than the paid amount",
      function (value) {
        return value !== undefined && value <= this.options.context?.PaidAmount;
      }
    ),
  refund_status: Yup.number()
    .required("Please choose refund status")
    .test("required", "Please choose refund status", (value) => !!value),
});

const OrderRefundModal: React.FC<OrderRefundModalProps> = ({
  orderRefundModalOpen,
  onClose,
  orderId,
  TotalAmount,
  PaidAmount,
  setRefetch,
}) => {
  const { refundOrder, loading } = useRefundOrder();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    order_id: orderId,
    refund_amount: null,
    refund_status: null,
    refund_description: "",
  });

  useEffect(() => {
    if (orderRefundModalOpen) {
      setFormData({
        order_id: orderId,
        refund_amount: null,
        refund_status: null,
        refund_description: "",
      });
    } else {
      setFormData({
        order_id: orderId,
        refund_amount: null,
        refund_status: null,
        refund_description: "",
      });
      setErrors({});
    }
  }, [orderRefundModalOpen]);

  const handleRefundOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await schema.validate(formData, { abortEarly: false, context: { PaidAmount } });

      const formattedData = {
        ...formData,
        refund_amount: Number(formData.refund_amount),
      };

      const success = await refundOrder(formattedData);
      if (success) {
        onClose();
        setRefetch(true);
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const formErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          formErrors[err.path || ""] = err.message;
        });
        setErrors(formErrors);
      } else {
        toast.error("Failed to submit the form. Please try again.");
      }
    }
  };

  if (!orderRefundModalOpen) return;

  return (
    <div className="fixed inset-0 grid overflow-auto items-center justify-center z-50 p-4">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="bg-white p-6 rounded-lg shadow-lg min-w-[440px] smobile:min-w-[85%] z-10 relative">
        <button
          className="btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default"
          data-modal-dismiss="true"
          onClick={onClose}
        >
          <i className="ki-filled ki-cross"></i>
        </button>
        <h1 className="text-xl font-semibold text-gray-900 mb-4">
          Refund Order #{orderId}
        </h1>

        <div className="flex flex-col p-2">
          <span className="text-gray-700 text-sm font-medium py-1">
            Total Amount : ₹{TotalAmount}
          </span>
          <span className="text-gray-700 text-sm font-medium py-1">
            Paid Amount : ₹{PaidAmount}
          </span>
        </div>

        <div className="p-2">
          <div className="flex flex-col mb-2">
            <label
              htmlFor="refund_amount"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Refund Amount
            </label>
            <input
              type="text"
              id="refund_amount"
              min="0"
              value={formData.refund_amount || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  refund_amount: e.target.value,
                })
              }
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">
              {errors.refund_amount || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col mb-2">
            <label
              className="block text-gray-700 text-base font-bold mb-2"
              htmlFor="refund_description"
            >
              Reason of Refund (Refund Note)
            </label>
            <textarea
              id="refund_description"
              name="refund_description"
              value={formData.refund_description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  refund_description: e.target.value,
                })
              }
              className="h-20 input border border-gray-300 rounded-md p-2"
              rows={5}
            />
            <p className="text-red-500 text-sm">
              {errors.refund_description || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label
              className="block text-gray-700 text-base font-bold mb-2"
              htmlFor="refund_status"
            >
              Refund Status
            </label>
            <select
              id="refund_status"
              className="select select-lg w-[200px] text-sm"
              value={formData.refund_status || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  refund_status: Number(e.target.value),
                })
              }
            >
              <option value="" disabled selected>
                Select Refund Status
              </option>
              <option value={1}>Full</option>
              <option value={2}>Partial</option>
            </select>
            <p className="w-full text-red-500 text-sm">
              {errors.refund_status || "\u00A0"}
            </p>
          </div>
        </div>

        <button
          type="submit"
          className={`btn btn-primary ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleRefundOrder}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        <button type="button" className="btn btn-light ml-2" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OrderRefundModal;
