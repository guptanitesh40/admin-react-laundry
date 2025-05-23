import Multiselect from "multiselect-react-dropdown";
import {
  useGetPriceContent,
  useGetServices,
  useUpdatePriceContent,
} from "../../hooks";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import useAddPriceContent from "../../hooks/price-content/useAddPriceContent";
import toast from "react-hot-toast";
import { priceSchema } from "../../validation/priceSchema";
import ModelLoadingTag from "../shimmer/ModelLoadingTag";

interface PriceContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  price_content_id: number;
  setIsSubmit: (value: boolean) => void;
}

interface FormData {
  category_name: string;
  service_names: any[];
  price: number;
}

const PriceContentModal: React.FC<PriceContentModalProps> = ({
  isOpen,
  onClose,
  price_content_id,
  setIsSubmit,
}) => {
  const { services } = useGetServices(1, 1000);
  const {
    priceContent,
    fetchPriceContent,
    loading: loadingPriceContent,
  } = useGetPriceContent();
  const { addPriceContent, loading: adding } = useAddPriceContent();
  const { updatePriceContent, loading: updating } = useUpdatePriceContent();

  const [formData, setFormData] = useState<FormData>({
    category_name: "",
    service_names: [],
    price: null,
  });

  const [initialFormData, setInitialFormData] = useState<FormData>({
    category_name: "",
    service_names: [],
    price: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const serviceOptions = services.map((service) => ({
    name: service.name,
  }));

  useEffect(() => {
    if (isOpen && price_content_id) {
      fetchPriceContent(price_content_id);
    }
  }, [isOpen, price_content_id]);

  useEffect(() => {
    if (isOpen && priceContent && price_content_id) {
      const fetchedData = {
        category_name: priceContent.category_name,
        service_names: priceContent.service_names,
        price: priceContent.price,
      };

      setFormData(fetchedData);
      setInitialFormData(fetchedData);
    } else {
      setFormData({
        category_name: "",
        service_names: [],
        price: null,
      });
      setInitialFormData({
        category_name: "",
        service_names: [],
        price: null,
      });
      setErrors({});
    }
  }, [isOpen, priceContent, price_content_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await priceSchema.validate(formData, { abortEarly: false });

      const isDataChanged = () => {
        return (Object.keys(formData) as (keyof typeof formData)[]).some(
          (key) => {
            return formData[key] !== initialFormData[key];
          }
        );
      };

      if (!isDataChanged()) {
        onClose();
        return;
      }

      if (price_content_id) {
        await updatePriceContent(price_content_id, formData);
      } else {
        await addPriceContent(formData);
      }
      setIsSubmit(true);
      onClose();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-[480px] ban:w-[85%] z-10 relative">
        {price_content_id && loadingPriceContent && isOpen && (
          <ModelLoadingTag />
        )}
        <button
          className="btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default"
          data-modal-dismiss="true"
          onClick={onClose}
        >
          <i className="ki-filled ki-cross"></i>
        </button>
        <h1 className="text-2xl font-bold mb-6">
          {price_content_id ? "Update Price" : "Add Price"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-2">
            <div className="col-span-1">
              <label
                htmlFor="category"
                className="mb-1 block text-gray-700 font-semibold"
              >
                Category name
              </label>
              <input
                type="text"
                id="category"
                name="category"
                autoComplete="off"
                className="input border border-gray-300 rounded-md p-2 w-full"
                value={formData.category_name ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category_name: e.target.value,
                  })
                }
              />
              <p className="text-red-500 text-sm">
                {errors.category_name || "\u00A0"}
              </p>
            </div>

            <div className="col-span-1">
              <label
                htmlFor="service"
                className="mb-1 block text-gray-700 font-semibold"
              >
                Service name
              </label>
              <Multiselect
                options={serviceOptions}
                displayValue="name"
                selectedValues={serviceOptions.filter((option) =>
                  formData.service_names.includes(option.name)
                )}
                onSelect={(selectedList) => {
                  setFormData({
                    ...formData,
                    service_names: selectedList.map(
                      (service: { name: string }) => service.name
                    ),
                  });
                }}
                onRemove={(selectedList) => {
                  setFormData({
                    ...formData,
                    service_names: selectedList.map(
                      (service: { name: string }) => service.name
                    ),
                  });
                }}
                isObject={true}
              />
              <p className="text-red-500 text-sm">
                {errors.service_names || "\u00A0"}
              </p>
            </div>

            <div className="col-span-1">
              <label
                htmlFor="price"
                className="mb-1 block text-gray-700 font-semibold"
              >
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                autoComplete="off"
                className="input border border-gray-300 rounded-md p-2 w-full"
                value={formData.price ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: Number(e.target.value),
                  })
                }
              />
              <p className="text-red-500 text-sm">{errors.price || "\u00A0"}</p>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className={`btn btn-primary ${
                  adding || updating ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={adding || updating}
              >
                {adding || updating
                  ? adding
                    ? "Adding..."
                    : "Updating..."
                  : price_content_id
                  ? "Update Price"
                  : "Add Price"}
              </button>
              <button
                type="button"
                className="btn btn-light"
                onClick={onClose}
                disabled={adding || updating}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PriceContentModal;
