import { useEffect, useRef, useState } from "react";
import { useCancelOrder } from "../../hooks";
import * as Yup from "yup";
import toast from "react-hot-toast";

interface OrderCalcelModalProps {
  onClose: () => void;
  orderCancelModalOpen: boolean;
  orderId: number;
  userId: number;
  setRefetch: (value: boolean) => void;
}

const schema = Yup.object().shape({
  text_note: Yup.string().required("Please enter text to add note"),
});

const OrderCalcelModal: React.FC<OrderCalcelModalProps> = ({
  onClose,
  orderCancelModalOpen,
  orderId,
  userId,
  setRefetch,
}) => {
  const { cancelOrder, loading } = useCancelOrder();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [formData, setFormData] = useState({
    user_id: userId,
    order_id: orderId,
    text_note: "",
  });

  useEffect(() => {
    if (orderCancelModalOpen) {
      setFormData({
        user_id: userId,
        order_id: orderId,
        text_note: "",
      });
    } else {
      setFormData({
        user_id: null,
        order_id: null,
        text_note: "",
      });
      setErrorMessage("");
    }
  }, [orderCancelModalOpen]);

  const handleCancelOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await schema.validate(formData, { abortEarly: false });

      const success = await cancelOrder(formData);
      if (success) {
        setErrorMessage("");
        onClose();
        setRefetch(true);        
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrorMessage(error.errors[0]);
      } else {
        toast.error("Failed to Cancel Order");
      }
    }
  };

  if (!orderCancelModalOpen) return;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] z-10 relative">
        <button
          className="btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default"
          data-modal-dismiss="true"
          onClick={onClose}
        >
          <i className="ki-filled ki-cross"></i>
        </button>
        <h1 className="text-xl font-semibold text-gray-900">
          Cancel Order #{orderId}
        </h1>

        <div className="mt-2 p-3">
          <h2 className="text-lg font-medium text-gray-700 mb-4">
            Reason for Cancellation
          </h2>

          <div>
            <textarea
              className="h-20 input border border-gray-300 rounded-md p-2"
              rows={5}
              placeholder="Write a text note..."
              value={formData.text_note || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  text_note: e.target.value,
                })
              }
            />
            <p className="text-red-500 text-sm">{errorMessage || "\u00A0"}</p>
          </div>
        </div>

        <button
          type="submit"
          className={`btn btn-primary ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleCancelOrder}
          disabled={loading}
        >
          {loading ? "Cancelling." : "Submit"}
        </button>
        <button type="button" className="btn btn-light ml-2" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OrderCalcelModal;
