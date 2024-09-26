import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useAddCategory } from "../../hooks";

const schema = Yup.object().shape({
  name: Yup.string().required("Category name is required"),
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
  const [formData, setFormData] = useState({ name: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: "" });
      setErrors({});
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      await addCategory(formData.name);
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
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg z-10 relative">
          <h1 className="text-2xl font-bold mb-6">Add Category</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-semibold" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input border border-gray-300 rounded-md p-2"
                disabled={adding} 
              />
              <p className="text-red-500 text-sm">{errors.name || "\u00A0"}</p>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className={`btn btn-primary ${adding ? "opacity-50 cursor-not-allowed" : ""}`}
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
