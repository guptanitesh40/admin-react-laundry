import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAddPrice } from "../../hooks";

interface PriceModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const PriceModal: React.FC<PriceModalProps> = ({ isOpen, handleClose }) => {
  const [formData, setFormData] = useState({
    category_id: '',
    product_id: '',
    service_id: '',
    price: '',
  });

  const { addPrice, loading: addingPrice } = useAddPrice();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { category_id, product_id, service_id, price } = formData;
    const priceData = {
      category_id: parseInt(category_id, 10),
      product_id: parseInt(product_id, 10),
      service_id: parseInt(service_id, 10),
      price: parseFloat(price),
    };

    try {
      const response = await addPrice(priceData);
      if (response) {
        handleClose();
      }
    } catch (error) {
      toast.error("Error adding price:", error);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <h3 className="text-xl font-semibold">Add New Price</h3>
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={handleClose}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="p-5">

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Category ID
                </label>
                <input
                  type="text"
                  value={formData.category_id}
                  onChange={(e) =>
                    setFormData({ ...formData, category_id: e.target.value })
                  }
                  className="input border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Enter category ID"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Product ID
                </label>
                <input
                  type="text"
                  value={formData.product_id}
                  onChange={(e) =>
                    setFormData({ ...formData, product_id: e.target.value })
                  }
                  className="input border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Enter product ID"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Service ID
                </label>
                <input
                  type="text"
                  value={formData.service_id}
                  onChange={(e) =>
                    setFormData({ ...formData, service_id: e.target.value })
                  }
                  className="input border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Enter service ID"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Price
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="input border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Enter price"
                />
              </div>

              <div className="flex justify-end col-span-2 space-x-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={addingPrice}
                >
                  {addingPrice ? "Adding..." : "Add Price"}
                </button>

                <button
                  type="button"
                  className="btn  btn-light py-5 px-10"
                  onClick={handleClose}
                >
                  Close
                </button>
               
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default PriceModal;
