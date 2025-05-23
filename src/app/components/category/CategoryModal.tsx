import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useAddCategory } from "../../hooks";

const schema = Yup.object().shape({
  name: Yup.string()
    .required("Category name is required")
    .max(30, "Maximum length of 30 characters exceeded"),
});

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsSubmit: (value: boolean) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  setIsSubmit,
}) => {
  const { addCategory, loading: adding } = useAddCategory();
  const [formData, setFormData] = useState({
    name: "",
    name_hindi: "",
    name_gujarati: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        name_hindi: "",
        name_gujarati: "",
      });
      setErrors({});
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      await addCategory(formData);
      setIsSubmit(true);
      onClose();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const formErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) formErrors[err.path] = err.message;
        });
        setErrors(formErrors);
      } else {
        toast.error("Failed to submit the form. Please try again.");
      }
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>
        <div className="bg-white p-6 rounded-lg shadow-lg min-w-96 z-10 zx:min-w-[85%] relative">
          <button
            className="btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default"
            data-modal-dismiss="true"
            onClick={onClose}
          >
            <i className="ki-filled ki-cross"></i>
          </button>
          <h1 className="text-2xl font-bold mb-6">Add Category</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="mb-2 font-semibold" htmlFor="name">
                English Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="off"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input border border-gray-300 rounded-md p-2"
                disabled={adding}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name || "\u00A0"}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold" htmlFor="name_gujarati">
                Gujarati Name
              </label>
              <input
                type="text"
                id="name_gujarati"
                name="name_gujarati"
                autoComplete="off"
                value={formData.name_gujarati}
                onChange={(e) =>
                  setFormData({ ...formData, name_gujarati: e.target.value })
                }
                className="input border border-gray-300 rounded-md p-2"
                disabled={adding}
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold" htmlFor="name_hindi">
                Hindi Name
              </label>
              <input
                type="text"
                id="name_hindi"
                name="name_hindi"
                autoComplete="off"
                value={formData.name_hindi}
                onChange={(e) =>
                  setFormData({ ...formData, name_hindi: e.target.value })
                }
                className="input border border-gray-300 rounded-md p-2"
                disabled={adding}
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className={`btn btn-primary ${
                  adding ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={adding}
              >
                {adding ? "Adding..." : "Add Category"}
              </button>
              <button
                type="button"
                className="btn btn-light"
                onClick={onClose}
                disabled={adding}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CategoryModal;
