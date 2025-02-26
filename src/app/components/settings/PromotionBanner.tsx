import React, { useEffect, useState } from "react";
import {
  useAddSettings,
  useGetSettings,
  useUpdatePromotionBanner,
} from "../../hooks";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FaPencilAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import * as Yup from "yup";
import LoadingSpinner from "../shimmer/Loading";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  price: Yup.number()
    .required("Please enter price")
    .typeError("Price must be a number")
    .min(0, "Price must be a positive number"),
});

const PromotionBanner: React.FC = () => {
  const { settingsData, fetchSetting, loading } = useGetSettings();
  const { addSetting, loading: adding } = useAddSettings();
  const { updatePromotionBanner, loading: updating } =
    useUpdatePromotionBanner();
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [refetch, setRefetch] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    image: null,
    title: "",
    price: "",
    promotion_code: "",
    offer_validity: dayjs(),
  });

  const [initialFormData, setInitialFormData] = useState({
    image: null,
    title: "",
    price: "",
    promotion_code: "",
    offer_validity: dayjs(),
  });

  useEffect(() => {
    fetchSetting();
    setRefetch(false);
  }, [refetch]);

  useEffect(() => {
    if (settingsData) {
      const promotionBannerSettings = JSON.parse(
        settingsData?.data?.home_promotion_banner_website
      );
      const promotionBanner = settingsData?.data?.home_banner_image;

      const fetchedData = {
        ...formData,
        title: promotionBannerSettings.title || "",
        price: promotionBannerSettings.price || "",
        promotion_code: promotionBannerSettings.promotion_code || "",
        offer_validity: dayjs(promotionBannerSettings.offer_validity),
        image: promotionBanner,
      };
      setFormData(fetchedData);
      setInitialFormData(fetchedData);
    }
  }, [settingsData]);

  const handleDateChange = (newDate: Dayjs | null) => {
    setFormData((prev) => ({
      ...prev,
      offer_validity: newDate,
    }));
  };

  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (imageFile) {
      const previewUrl = URL.createObjectURL(imageFile);
      setPreview(previewUrl);
      setFormData((prev) => ({
        ...prev,
        image: imageFile,
      }));
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await schema.validate(formData, { abortEarly: false });

      let success;

      const formDataToSend = new FormData();

      if (preview !== null) {
        formDataToSend.append("home_banner_image", formData.image);
        formDataToSend.append("setting_key", "home_banner_image");

        success = await updatePromotionBanner(formDataToSend);
        if (success) {
          setRefetch(true);
        }
        setPreview(null);
      }

      const isDataChanged = () => {
        return (Object.keys(formData) as (keyof typeof formData)[]).some(
          (key) => {
            if (key === "image") {
              return false;
            }
            return formData[key] !== initialFormData[key];
          }
        );
      };

      if (!isDataChanged()) {
        return;
      }

      const updatedBannerData = {
        title: formData.title,
        price: formData.price,
        promotion_code: formData.promotion_code,
        offer_validity: formData.offer_validity,
      };

      const payload = [
        {
          setting_key: "home_promotion_banner_website",
          setting_value: JSON.stringify(updatedBannerData),
        },
      ];

      success = await addSetting(payload);
      if (success) {
        setErrors({});
        setRefetch(true);
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

  return (
    <>
      <div className="col-span-1">
        <div className="card min-w-full pb-2.5">
          <div className="card-header" id="basic_settings">
            <h3 className="card-title">Promotion Banner</h3>
          </div>
          <form onSubmit={handleSaveSettings}>
            <div className="card-body grid gap-4">
              <div className="flex items-center flex-wrap gap-2.5">
                <div className="flex justify-end flex-wrap grow gap-2.5">
                  <div className="image-input" data-image-input="true">
                    <label
                      htmlFor="image-upload"
                      className="btn btn-icon btn-icon-2xl btn-light absolute z-1 size-8 -top-0.5 -right-0.5 rounded-full"
                    >
                      <FaPencilAlt className="text-blue-600" />
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleBannerImageChange}
                    />
                    <div className="image-input-placeholder rounded-md border-2">
                      <img
                        className="h-[200px] w-[300px] rounded-sm"
                        src={
                          preview ||
                          (typeof formData.image === "string" &&
                            formData.image) ||
                          ""
                        }
                        alt="Promotion Banner"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label className="form-label flex items-center gap-1 max-w-56">
                    Title
                  </label>
                  <div className="flex flex-col w-full">
                    <input
                      className="input"
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title: e.target.value,
                        })
                      }
                    />
                    <p className="text-red-500 text-sm">
                      {errors.title || "\u00A0"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label className="form-label flex items-center gap-1 max-w-56">
                    Price (Rs)
                  </label>
                  <div className="flex flex-col w-full">
                    <input
                      className="input"
                      type="text"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: e.target.value,
                        })
                      }
                    />
                    <p className="text-red-500 text-sm">
                      {errors.price || "\u00A0"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label className="form-label flex items-center gap-1 max-w-56">
                    Promotion code
                  </label>
                  <div className="flex flex-col w-full">
                    <input
                      className="input"
                      type="text"
                      value={formData.promotion_code}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          promotion_code: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 mt-3">
                  <label className="form-label flex items-center gap-1 max-w-56">
                    Offer Validity
                  </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={formData.offer_validity}
                      onChange={handleDateChange}
                      format="DD-MM-YYYY"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          InputProps: {
                            style: {
                              height: "35px",
                              width: "155px",
                              fontSize: "14px",
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              
              <div className="flex relative justify-end pt-2.5">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={adding || updating}
                >
                  {adding || updating ? (
                    <>
                      Saving...
                      <LoadingSpinner />
                    </>
                  ) : (
                    <>Save Changes</>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PromotionBanner;
