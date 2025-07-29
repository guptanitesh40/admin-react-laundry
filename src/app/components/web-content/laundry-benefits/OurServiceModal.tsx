import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import useAddLaundryBenefit from "../../../hooks/web-content/laundry-benefits/useAddLaundryBenefit";
import useUpdateLaundryBenefit from "../../../hooks/web-content/laundry-benefits/useUpdateLaundryBenefit";
import { ourServiceSchema } from "./validation/ourServiceSchema";

interface Data {
  benefit_id: number;
  title: string;
  image: string | File;
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
  const { addLaundryBenefit, loading: adding } = useAddLaundryBenefit();
  const { updateLaundryBenefit, loading: updating } = useUpdateLaundryBenefit();

  const [formData, setFormData] = useState({
    title: "",
    image: "" as string | File,
  });

  const [initialFormData, setInitialFormData] = useState({
    title: "",
    image: "" as string | File,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen && data && isEdit) {
      const fetchedData = {
        title: data.title,
        image: data.image,
      };
      setFormData(fetchedData);
      setInitialFormData(fetchedData);
    }
  }, [isOpen, data, isEdit]);

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
      const schema = ourServiceSchema(isEdit);
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
      formDataObj.append("title", formData.title);
      if (formData.image instanceof File) {
        formDataObj.append("image", formData.image);
      }

      const result = isEdit
        ? await updateLaundryBenefit(data?.benefit_id, formDataObj)
        : await addLaundryBenefit(formDataObj);

      if (result) {
        setIsSubmit(true);
        onClose();
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

      <div className="bg-white p-6 rounded-lg shadow-lg min-w-[375px] smobile:min-w-[87%] z-10 relative">
        <button
          className="btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default"
          onClick={onClose}
        >
          <i className="ki-filled ki-cross"></i>
        </button>

        <h1 className="text-2xl font-bold mb-6">
          {isEdit ? "Edit Benefit" : "Add Benefit"}
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
              <div className="flex items-center gap-2">
                <label className="font-semibold" htmlFor="image">
                  Image
                </label>
                <span className="text-sm text-gray-500">
                  (JPG, JPEG, PNG | 80×80 px)
                </span>
              </div>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="input border border-gray-300 rounded-md mt-1 file-input"
              />
              <p className="text-red-500 text-sm">{errors.image || "\u00A0"}</p>
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
                  ? "Update Benefit"
                  : "Add Benefit"}
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
