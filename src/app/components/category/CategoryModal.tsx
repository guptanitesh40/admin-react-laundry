import React, { useEffect } from "react";
import Modal from "react-modal";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import * as yup from "yup"; // Import yup for validation

// Define your validation schema
const schema = yup.object().shape({
  name: yup.string().required("Category name is required"),
});

interface CategoryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  editMode: boolean;
  currentCategory?: { id: number; name: string } | null;
  addCategory: (name: string) => Promise<boolean>;
  updateCategory: (id: number, name: string) => Promise<boolean>;
  refetch: () => void;
  saving: boolean;
  onCancelClick: () => void;
}

interface FormValues {
  name: string;
}

Modal.setAppElement("#root");

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  editMode,
  currentCategory,
  addCategory,
  updateCategory,
  refetch,
  saving,
  onCancelClick,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: editMode && currentCategory ? currentCategory.name : "",
      });
    }
  }, [isOpen, editMode, currentCategory, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (editMode && currentCategory) {
        await updateCategory(currentCategory.id, data.name);
      } else {
        await addCategory(data.name);
      }
      refetch();
      onCancelClick();
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancelClick}
      contentLabel="Category Modal"
      className="fixed inset-1/3 bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <h2 className="text-2xl font-semibold mb-4">
        {editMode ? "Edit Category" : "Add New Category"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-gray-700">Category Name</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="border border-gray-300 px-4 py-2 rounded-lg w-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Category Name"
              />
            )}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg"
            disabled={saving}
          >
            {editMode ? "Update" : "Save"}
          </button>
          <button
            type="button"
            onClick={onCancelClick}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CategoryModal;
