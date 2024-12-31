import { useEffect, useRef, useState } from "react";
import { useCancelOrder } from "../../hooks";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { BiImageAlt } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

interface OrderCalcelModalProps {
  onClose: () => void;
  orderCancelModalOpen: boolean;
  orderId: any;
  userId: any;
}

const schema = Yup.object().shape({
  text_note: Yup.string().required("Please enter text to add note"),
});

const OrderCalcelModal: React.FC<OrderCalcelModalProps> = ({
  onClose,
  orderCancelModalOpen,
  orderId,
  userId,
}) => {
  const { cancelOrder, loading } = useCancelOrder();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [formData, setFormData] = useState({
    user_id: userId,
    order_id: orderId,
    text_note: "",
    images: [] as (string | File)[],
  });

  useEffect(() => {
    setFormData({
      user_id: null,
      order_id: null,
      text_note: "",
      images: [],
    });
    setErrorMessage("");
  }, [onClose]);

  const handleCancelOrder = async (e: React.FormEvent) => {
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

      const success = await cancelOrder(formDataObj);
      if (success) {
        setErrorMessage("");
        onClose();
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrorMessage(error.errors[0]);
      } else {
        toast.error("Failed to Cancel Order");
      }
    }
  };

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

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
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
            <div className="relative border border-gray-300 rounded-md p-2">
              <textarea
                className="w-full h-[50px] p-3 border-none focus:outline-none focus:ring-0"
                placeholder="Write a text note..."
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
