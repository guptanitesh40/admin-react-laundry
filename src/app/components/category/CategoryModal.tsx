import React, { useEffect } from "react";
import Modal from "react-modal";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Category name is required"),
});

interface CategoryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  addCategory: (name: string) => Promise<{ success: boolean }>;
  refetch: () => void;
  saving: boolean;
}

interface FormValues {
  name: string;
}

Modal.setAppElement("#root");

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onRequestClose,
  addCategory,
  refetch,
  saving,
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
      reset({ name: "" });
    }
  }, [isOpen, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const result = await addCategory(data.name);
      if (result.success) {
        toast.success("Category added successfully!", {
          position: "top-center",
        });
        refetch();
        onRequestClose();
      } else {
        toast.error("Failed to add category. Please try again.", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Category Modal"
      className="fixed inset-1/3 bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className={`border px-4 py-2 rounded-lg w-full text-gray-800 placeholder-gray-500 focus:outline-none ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Category Name"
              />
            )}
          />
          <p
            className={`text-sm mt-1 ${
              errors.name ? "text-red-500" : "text-transparent"
            }`}
          >
            {errors.name?.message || "\u00A0"}
          </p>
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="submit"
            className={`bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg ${
              saving ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CategoryModal;
