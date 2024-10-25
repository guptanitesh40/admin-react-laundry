import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAddBanner, useGetBanner, useUpdateBanner } from "../../hooks";
import { bannerSchema } from "../../validation/bannerSchema";
import * as Yup from "yup";

interface BannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  banner_id?: number;
  setIsSubmit: (value: boolean) => void;
}

const BannerModal: React.FC<BannerModalProps> = ({
  isOpen,
  onClose,
  banner_id,
  setIsSubmit,
}) => {
  const { addBanner, loading: adding } = useAddBanner();
  const { updateBanner, loading: updating } = useUpdateBanner();
  const { banner, fetchBanner } = useGetBanner();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "" as string | File,
    banner_type:null,
  });

  const [initialFormData, setInitialFormData] = useState({
    title: "",
    description: "",
    image: "" as string | File,
    banner_type: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen && banner_id) {
      fetchBanner(banner_id);
    }
  }, [isOpen, banner_id]);

  useEffect(() => {
    if (isOpen && banner && banner_id) {
      const fetchedData = {
        title: banner.title,
        description: banner.description,
        image: banner.image,
        banner_type: banner.banner_type,
      };
  
      setFormData(fetchedData);
      setInitialFormData(fetchedData);
    } else {
      setFormData({
        title: "",
        description: "",
        image: "",
        banner_type: null,
      });
      setInitialFormData({
        title: "",
        description: "",
        image: "",
        banner_type: null,
      });
      setErrors({});
    }
  }, [isOpen, banner, banner_id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

      const isDataChanged = () => {
        return (Object.keys(formData) as (keyof typeof formData)[]).some((key) => {
          if (key === "image") {
            return formData.image instanceof File || formData.image !== initialFormData.image;
          }
          return formData[key] !== initialFormData[key];
        });
      };
            
      if (!isDataChanged()) {             
        onClose();
        return; 
      }

      const formDataObj = new FormData();
      formDataObj.append("title", formData.title);
      formDataObj.append("description", formData.description);
      if (formData.image instanceof File) {
        formDataObj.append("image", formData.image);
      }
      formDataObj.append("banner_type", formData.banner_type);

      if (banner_id) {
        await updateBanner(banner_id, formDataObj);
        setIsSubmit(true);
      } else {
        await addBanner(formDataObj);
        setIsSubmit(true);
      }

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
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-10 relative">
        <button
          className="btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0  mr-5 mt-5 lg:mr-5 shadow-default"
          data-modal-dismiss="true"
          onClick={onClose}
        >
          <i className="ki-filled ki-cross"></i>
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

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">
                Banner type
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="banner_type"
                    value={1}
                    checked={formData.banner_type === 1}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        banner_type: parseInt(e.target.value),
                      })
                    }
                    className="radio radio-primary"
                  />
                  <span className="text-sm">Website</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="banner_type"
                    value={2}
                    checked={formData.banner_type === 2}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        banner_type: parseInt(e.target.value),
                      })
                    }
                    className="radio radio-primary"
                  />
                  <span className="text-sm">App</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="banner_type"
                    value={3}
                    checked={formData.banner_type === 3}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        banner_type: parseInt(e.target.value),
                      })
                    }
                    className="radio radio-primary"
                  />
                  <span className="text-sm">Both</span>
                </label>
              </div>
              <p className="text-red-500 text-sm">
                {errors.banner_type || "\u00A0"}
              </p>
            </div>            
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
