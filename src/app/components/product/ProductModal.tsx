import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAddProduct, useUpdateProduct } from "../../hooks";
import { productSchema } from "../../validation/productSchema";
import * as Yup from "yup";
import useGetProduct from "../../hooks/products/useGetProduct";
import ModelLoadingTag from "../shimmer/ModelLoadingTag";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product_id?: number;
  setIsSubmit: (value: boolean) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  product_id,
  setIsSubmit,
}) => {
  const { addProduct, loading: adding } = useAddProduct();
  const { updateProduct, loading: updating } = useUpdateProduct();

  const { product, fetchProduct, loading: loadingProduct } = useGetProduct();

  const [formData, setFormData] = useState({
    name: "",
    name_gujarati: "",
    name_hindi: "",
    image: "" as string | File,
  });

  const [initialFormData, setInitialFormData] = useState({
    name: "",
    name_gujarati: "",
    name_hindi: "",
    image: "" as string | File,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen && product_id) {
      fetchProduct(product_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, product_id]);

  useEffect(() => {
    if (isOpen && product && product_id) {
      const fetchedData = {
        name: product.name,
        name_gujarati: product.name_gujarati,
        name_hindi: product.name_hindi,
        image: product.image,
      };

      setFormData(fetchedData);
      setInitialFormData(fetchedData);
    } else {
      setFormData({
        name: "",
        name_gujarati: "",
        name_hindi: "",
        image: "",
      });
      setInitialFormData({
        name: "",
        name_gujarati: "",
        name_hindi: "",
        image: "",
      });
      setErrors({});
    }
  }, [isOpen, product, product_id]);

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
      const schema = productSchema(!!product_id);
      await schema.validate(formData, { abortEarly: false });

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
      if (formData.image instanceof File) {
        formDataObj.append("image", formData.image);
      }

      if (product_id) {
        await updateProduct(product_id, formDataObj);
      } else {
        await addProduct(formDataObj);
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
    <div className="fixed inset-0 grid place-items-center overflow-auto z-50 p-4">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[25rem] z-10 relative">
        {product_id && loadingProduct && isOpen && <ModelLoadingTag />}
        <button
          className="btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default"
          data-modal-dismiss="true"
          onClick={onClose}
        >
          <i className="ki-filled ki-cross"></i>
        </button>
        <h1 className="text-2xl font-bold mb-6">
          {product_id ? "Edit Product" : "Add Product"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div className="col-span-1">
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
                <p className="text-red-500 text-sm">
                  {errors.name || "\u00A0"}
                </p>
              )}
            </div>

            <div className="col-span-1">
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

            <div className="col-span-1">
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

            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-2">
                <label className="font-semibold" htmlFor="image">
                  Image
                </label>
                <span className="text-sm text-gray-500">
                  (JPG, JPEG, PNG | 85×85 px)
                </span>
              </div>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="input border border-gray-300 rounded-md p-2"
              />
              {errors.image && (
                <p className="text-red-500 text-sm">
                  {errors.image || "\u00A0"}
                </p>
              )}
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
                  : product_id
                  ? "Update Product"
                  : "Add Product"}
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

export default ProductModal;
