import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAddBanner, useUpdateBanner } from "../../hooks";
import { bannerSchema } from "../../validation/bannerSchema";
import * as Yup from "yup";

interface BannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  bannerData?: {
    title: string;
    description: string;
    image: string;
  };
  banner_id?: number;
}

const BannerModal: React.FC<BannerModalProps> = ({
  isOpen,
  onClose,
  refetch,
  bannerData,
  banner_id,
}) => {
  const { addBanner, loading: adding } = useAddBanner();
  const { updateBanner, loading: updating } = useUpdateBanner();


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "" as string | File,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      if (bannerData) {
        setFormData({
          title: bannerData.title,
          description: bannerData.description,
          image: bannerData.image,
        });
      } else {
        setFormData({
          title: "",
          description: "",
          image: "",
        });
      }
    } else {
      setErrors({});
    }
  }, [isOpen, bannerData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
  
    if (target instanceof HTMLInputElement) {
      const { name, value, files } = target;
  
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
    } else if (target instanceof HTMLTextAreaElement) {
      const { name, value } = target;
      
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const schema = bannerSchema(!!banner_id);

      await schema.validate(formData, {
        abortEarly: false,
      });

      const formDataObj = new FormData();
      formDataObj.append("title", formData.title);
      formDataObj.append("description", formData.description);
      if (formData.image instanceof File) {
        formDataObj.append("image", formData.image); 
      }

      if (banner_id) { 
         await updateBanner(banner_id, formDataObj);
      } else {
         await addBanner(formDataObj);
      }
      refetch();
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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg z-10 relative">
      <button className="btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0  mr-5 mt-5 lg:mr-5 shadow-default" data-modal-dismiss="true"
      onClick={onClose}
      >
          <i className="ki-filled ki-cross">
          </i>
         </button>
        <h1 className="text-2xl font-bold mb-6">
          {banner_id ? "Edit Banner" : "Add Banner"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-semibold" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">{errors.title || "\u00A0"}</p>
          </div>

          <div className="flex flex-col mb-4">
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

          
          <div className="flex flex-col">
            <label className="mb-2 font-semibold" htmlFor="image">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">
              {errors.image ? errors.image : "\u00A0"}
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
                : banner_id
                  ? "Update Banner"
                  : "Add Banner"}               
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

export default BannerModal;
