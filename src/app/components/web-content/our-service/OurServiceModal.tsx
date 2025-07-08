import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
// import { useAddBanner, useGetBanner, useUpdateBanner } from "../../hooks";
// import { bannerSchema } from "../../validation/bannerSchema";
import * as Yup from "yup";
import useAddOurService from "../../../hooks/web-content/our-service/useAddOurService";
// import ModelLoadingTag from "../shimmer/ModelLoadingTag";

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
  // const { addBanner, loading: adding } = useAddBanner();
  // const { updateBanner, loading: updating } = useUpdateBanner();
  // const { banner, fetchBanner, loading: loadingBanner } = useGetBanner();

  const { addOurService, loading } = useAddOurService();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "" as string | File,
  });

  const [initialFormData, setInitialFormData] = useState({
    title: "",
    description: "",
    image: "" as string | File,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // useEffect(() => {
  //   if (isOpen && banner_id) {
  //     fetchBanner(banner_id);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isOpen, banner_id]);

  // useEffect(() => {
  //   if (isOpen && banner && banner_id) {
  //     const fetchedData = {
  //       title: banner.title,
  //       description: banner.description,
  //       image: banner.image,
  //       banner_type: banner.banner_type,
  //     };

  //     setFormData(fetchedData);
  //     setInitialFormData(fetchedData);
  //   } else {
  //     setFormData({
  //       title: "",
  //       description: "",
  //       image: "",
  //       banner_type: null,
  //     });
  //     setInitialFormData({
  //       title: "",
  //       description: "",
  //       image: "",
  //       banner_type: null,
  //     });
  //     setErrors({});
  //   }
  // }, [isOpen, banner, banner_id]);

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
      // const schema = bannerSchema(!!banner_id);

      // await schema.validate(formData, {
      //   abortEarly: false,
      // });

      // const isDataChanged = () => {
      //   return (Object.keys(formData) as (keyof typeof formData)[]).some(
      //     (key) => {
      //       if (key === "image") {
      //         return (
      //           formData.image instanceof File ||
      //           formData.image !== initialFormData.image
      //         );
      //       }
      //       return formData[key] !== initialFormData[key];
      //     }
      //   );
      // };

      // if (!isDataChanged()) {
      //   onClose();
      //   return;
      // }

      const formDataObj = new FormData();
      formDataObj.append("title", formData.title);
      formDataObj.append("description", formData.description);
      if (formData.image instanceof File) {
        formDataObj.append("image", formData.image);
      }

      await addOurService(formDataObj);
      setIsSubmit(true);

      // if (banner_id) {
      //   await updateBanner(banner_id, formDataObj);
      //   setIsSubmit(true);
      // } else {
      //   await addBanner(formDataObj);
      //   setIsSubmit(true);
      // }

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

  useEffect(() => {
    console.log("FormData : ", formData);
  }, [formData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 grid overflow-auto items-center justify-center z-50 p-4">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="bg-white p-6 rounded-lg shadow-lg min-w-[400px] smobile:min-w-[87%] z-10 relative">
        {/* {banner_id && loadingBanner && isOpen && <ModelLoadingTag />} */}
        <button
          className="btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0  mr-5 mt-5 lg:mr-5 shadow-default"
          data-modal-dismiss="true"
          onClick={onClose}
        >
          <i className="ki-filled ki-cross"></i>
        </button>
        <h1 className="text-2xl font-bold mb-6">
          {banner_id ? "Edit Our Service" : "Add Our Service"}
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
              <p className="text-red-500 text-sm">
                {errors.image ? errors.image : "\u00A0"}
              </p>
            </div>

            <div className="flex gap-4 mt-4">
              <button type="submit" className={`btn btn-primary`}>
                Add Banner
              </button>
              <button type="button" className="btn btn-light" onClick={onClose}>
                Cancel
              </button>
            </div>

            {/* <div className="flex gap-4 mt-4">
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
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerModal;
