import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import useAddChooseUs from "../../../hooks/web-content/choose-us/useAddChooseUs";
import useUpdateChooseUs from "../../../hooks/web-content/choose-us/useUpdateChooseUs";
import { ourServiceSchema } from "./validation/ourServiceSchema";

interface Data {
  why_choose_us_id: number;
  title: string;
  description: string;
}

interface BannerModalProps {
  isOpen: boolean;
  isEdit: boolean;
  onClose: () => void;
  data: Data | null;
  setIsSubmit: (value: boolean) => void;
}

const BannerModal: React.FC<BannerModalProps> = ({
  isOpen,
  isEdit,
  onClose,
  data,
  setIsSubmit,
}) => {
  const { updateChooseUs, loading: updating } = useUpdateChooseUs();
  const { addChooseUs, loading: adding } = useAddChooseUs();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [initialFormData, setInitialFormData] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen && data && isEdit) {
      const fetchedData = {
        title: data.title,
        description: data.description,
      };
      setFormData(fetchedData);
      setInitialFormData(fetchedData);
    }
  }, [isOpen, data, isEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isDataChanged = () => {
    return (
      formData.title !== initialFormData.title ||
      formData.description !== initialFormData.description
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ourServiceSchema.validate(formData, {
        abortEarly: false,
      });
      setErrors({});

      if (!isDataChanged()) {
        onClose();
        return;
      }

      const payload = {
        title: formData.title,
        description: formData.description,
      };

      if (isEdit) {
        const result = await updateChooseUs(data?.why_choose_us_id, payload);
        if (result) {
          setIsSubmit(true);
          onClose();
        }
      } else {
        const result = await addChooseUs(payload);
        if (result) {
          setIsSubmit(true);
          onClose();
        } else {
          return;
        }
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 grid overflow-auto items-center justify-center z-50 p-4">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="bg-white p-6 rounded-lg shadow-lg min-w-[400px] smobile:min-w-[87%] z-10 relative">
        <button
          className="btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0  mr-5 mt-5 lg:mr-5 shadow-default"
          data-modal-dismiss="true"
          onClick={onClose}
        >
          <i className="ki-filled ki-cross"></i>
        </button>
        <h1 className="text-2xl font-bold mb-6">
          {isEdit ? "Edit Card" : "Add Card"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-2">
            <div className="col-span-1">
              <label className="mb-2 font-semibold" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                autoComplete="off"
                value={formData.title}
                onChange={handleChange}
                className="input border border-gray-300 rounded-md p-2"
              />
              <p className="text-red-500 text-sm">{errors.title || "\u00A0"}</p>
            </div>

            <div className="col-span-1">
              <label className="mb-2 font-semibold" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="h-20 input border border-gray-300 rounded-md p-2"
                rows={5}
              />
              <p className="text-red-500 text-sm">
                {errors.description || "\u00A0"}
              </p>
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
                  : isEdit
                  ? "Update Card"
                  : "Add Card"}
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

export default BannerModal;
