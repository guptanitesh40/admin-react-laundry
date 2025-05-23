/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAddService, useUpdateService } from "../../hooks";
import { productSchema } from "../../validation/productSchema";
import * as Yup from "yup";
import useGetService from "../../hooks/services/useGetService";
import ModelLoadingTag from "../shimmer/ModelLoadingTag";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service_id?: number;
  setIsSubmit: (value: boolean) => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onClose,
  service_id,
  setIsSubmit,
}) => {
  const { addService, loading: adding } = useAddService();
  const { updateService, loading: updating } = useUpdateService();

  const { service, fetchService, loading: loadingService } = useGetService();

  const [formData, setFormData] = useState({
    name: "",
    name_gujarati: "",
    name_hindi: "",
    is_visible: true,
    image: "" as string | File,
  });

  const [initialFormData, setInitialFormData] = useState({
    name: "",
    name_gujarati: "",
    name_hindi: "",
    is_visible: true,
    image: "" as string | File,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen && service_id) {
      fetchService(service_id);
    }
  }, [isOpen, service_id]);

  useEffect(() => {
    if (isOpen && service && service_id) {
      const fetchedData = {
        name: service.name,
        name_gujarati: service.name_gujarati,
        name_hindi: service.name_hindi,
        is_visible: service.is_visible,
        image: service.image,
      };

      setFormData(fetchedData);
      setInitialFormData(fetchedData);
    } else {
      setFormData({
        name: "",
        name_gujarati: "",
        name_hindi: "",
        is_visible: true,
        image: "",
      });
      setInitialFormData({
        name: "",
        name_gujarati: "",
        name_hindi: "",
        is_visible: true,
        image: "",
      });
      setErrors({});
    }
  }, [isOpen, service]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const schema = productSchema(!!service_id);
      await schema.validate(formData, { abortEarly: false });
      setErrors({});

      const isDataChanged = () => {
        return (Object.keys(formData) as (keyof typeof formData)[]).some(
          (key) => {
            if (key === "image") {
              return (
                formData.image instanceof File ||
                formData.image !== initialFormData.image
              );
            }
            return formData[key] !== initialFormData[key];
          }
        );
      };

      if (!isDataChanged()) {
        onClose();
        return;
      }

      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("name_gujarati", formData.name_gujarati);
      formDataObj.append("name_hindi", formData.name_hindi);
      formDataObj.append("is_visible", String(formData.is_visible));
      if (formData.image instanceof File) {
        formDataObj.append("image", formData.image);
      }

      if (service_id) {
        await updateService(service_id, formDataObj);
      } else {
        await addService(formDataObj);
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
    <div className="fixed inset-0 grid place-items-center z-50 overflow-auto">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[25rem] z-10 zx:min-w-[85%] relative">
        {service_id && loadingService && isOpen && <ModelLoadingTag />}
        <button
          className="btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default"
          data-modal-dismiss="true"
          onClick={onClose}
        >
          <i className="ki-filled ki-cross"></i>
        </button>
        <h1 className="text-2xl font-bold mb-6">
          {service_id ? "Edit Service" : "Add Service"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-semibold" htmlFor="name">
              English Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="off"
              value={formData.name}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name || "\u00A0"}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label className="mb-2 font-semibold" htmlFor="name_gujarati">
              Gujarati Name
            </label>
            <input
              type="text"
              id="name_gujarati"
              name="name_gujarati"
              autoComplete="off"
              value={formData.name_gujarati}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="mb-2 font-semibold" htmlFor="name_hindi">
              Hindi Name
            </label>
            <input
              type="text"
              id="name_hindi"
              name="name_hindi"
              autoComplete="off"
              value={formData.name_hindi}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col mb-4">
            <div className="flex items-center gap-2 mb-2">
              <label className="font-semibold" htmlFor="image">
                Image
              </label>
              <span className="text-sm text-gray-500">
                (JPG, JPEG, PNG | 85×85 px)
              </span>
            </div>
            <div className="relative">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="input border border-gray-300 rounded-md p-2"
              />
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image || "\u00A0"}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label className="form-label flex items-center gap-1 text-sm !font-semibold">
              <input
                className="checkbox checkbox-lg"
                name="check"
                type="checkbox"
                checked={formData.is_visible}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    is_visible: e.target.checked,
                  }));
                }}
              />
              Visible on web and mobile
            </label>
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
                : service_id
                ? "Update Service"
                : "Add Service"}
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
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;
