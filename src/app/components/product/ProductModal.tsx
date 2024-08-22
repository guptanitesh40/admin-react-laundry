import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addProductSchema, updateProductSchema } from "../../validation/productSchema";

Modal.setAppElement("#root");

interface ProductModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  editMode: boolean;
  currentProduct?: { id: number; name: string; image?: string } | null;
  addProduct: (formData: FormData) => Promise<boolean>;
  updateProduct: (id: number, data: FormData) => Promise<boolean>;
  refetch: () => void;
  loading: boolean;
  handleCancelClick: () => void;
}

interface FormValues {
  name: string;
  image?: FileList;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  editMode,
  currentProduct,
  addProduct,
  updateProduct,
  refetch,
  loading,
  handleCancelClick,
}) => {
  const schema = editMode ? updateProductSchema : addProductSchema;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (isOpen) {
      if (editMode && currentProduct) {
        reset({
          name: currentProduct.name,
          image: undefined 
        });
      } else {
        reset({
          name: "",
          image: undefined
        });
      }
    }
  }, [isOpen, editMode, currentProduct, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setValue("image", e.target.files);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    if (data.name) {
      formData.append("name", data.name);
    }
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      if (editMode && currentProduct) {
        await updateProduct(currentProduct.id, formData);
      } else {
        await addProduct(formData);
      }
      refetch();
      handleCancelClick();
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCancelClick}
      contentLabel="Product Modal"
      className="fixed inset-0 flex bg-black items-center justify-center rounded-lg p-6 mx-auto z-50 bg-opacity-50"
      overlayClassName="fixed inset-0 z-40"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">
          {editMode ? "Edit Product" : "Add Product"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1  ">
          <div>
            <label className="block text-gray-700">Name</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Product Name"
                />
              )}
            />
            <p className={`text-sm transition-opacity duration-300 ${errors.name ? 'text-red-500 opacity-100' : 'text-transparent opacity-0'}`}>
              {errors.name?.message || "\u00A0"}
            </p>
          </div>

          <div>
            <label className="block text-gray-700">Image</label>
            <div className="flex items-center space-x-2">
              <input
                type="file"
                onChange={handleImageChange}
                className="cursor-pointer block border rounded p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <p className={`text-sm transition-opacity duration-300 ${errors.image ? 'text-red-500 opacity-100' : 'text-transparent opacity-0'}`}>
              {errors.image?.message || "\u00A0"}
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg"
              disabled={loading}
            >
              {editMode ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={handleCancelClick}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ProductModal;
