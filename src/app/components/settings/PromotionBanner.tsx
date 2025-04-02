/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  useAddSettings,
  useGetSettings,
  usePermissions,
  useUpdatePromotionBanner,
} from "../../hooks";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FaPencilAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import * as Yup from "yup";
import LoadingSpinner from "../shimmer/LoadingSpinner";
import { promotionBannerSchema } from "../../validation/promotionBannerSchema";

const PromotionBanner: React.FC = () => {
  const { settingsData, fetchSetting, loading: loadingData } = useGetSettings();
  const { addSetting, loading: adding } = useAddSettings();
  const { updatePromotionBanner, loading: updating } =
    useUpdatePromotionBanner();
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [refetch, setRefetch] = useState<boolean>(false);
  const { hasPermission } = usePermissions();

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
      await promotionBannerSchema.validate(formData, { abortEarly: false });

      let success;

      const formDataToSend = new FormData();

      if (preview !== null) {
        formDataToSend.append("home_banner_image", formData.image);
        formDataToSend.append("setting_key", "home_banner_image");

        success = await updatePromotionBanner(formDataToSend);
        if (success) {
          setErrors({});
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

  if (loadingData) {
    return (
      <div className="col-span-1">
        <div className="card pb-2.5 min-w-full !border-gray-200">
          <div className="card-header">
            <span className="inline-block h-[31px] min-w-32 bg-gray-200 rounded-md animate-pulse"></span>
          </div>
          <div>
            <div className="card-body grid gap-4">
              <div className="flex items-center flex-wrap gap-2.5">
                <div className="flex justify-end bnmobile:justify-center flex-wrap grow gap-2.5">
                  <div className="w-full max-w-[300px] h-[200px] rounded-md bg-gray-200 animate-pulse mdmobile:h-[150px]"></div>
                </div>
              </div>
              {Array.from({ length: 4 }).map((_, index) => {
                return (
                  <div key={index} className="w-full py-2">
                    <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                      <span className="grow inline-block w-56 h-9 bg-gray-200 animate-pulse rounded-md"></span>
                      <span className="grow inline-block w-56 h-9 bg-gray-200 animate-pulse rounded-md"></span>
                    </div>
                  </div>
                );
              })}
              <div className="flex relative justify-end pt-2.5">
                <span className="inline-block w-32 h-12 bg-gray-200 animate-pulse rounded-md"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                <div className="flex justify-end bnmobile:justify-center flex-wrap grow gap-2.5">
                  <div className="image-input relative" data-image-input="true">
                    <label
                      htmlFor="image-upload"
                      className={`btn btn-icon btn-icon-2xl btn-light absolute z-1 size-8 -top-0.5 -right-0.5 rounded-full ${
                        !hasPermission(2, "update") ? "hidden" : ""
                      }`}
                    >
                      {hasPermission(2, "update") && (
                        <FaPencilAlt className="text-blue-600" />
                      )}
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleBannerImageChange}
                    />
                    <div className="flex flex-col items-center max-w-[300px] bnmobile:w-[95%]">
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
                      <p className="text-red-500 text-sm min-h-[20px] block w-full text-center">
                        {errors.image || "\u00A0"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label
                    className="form-label flex items-center gap-1 max-w-56"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <div className="flex flex-col w-full">
                    <input
                      className={`input ${
                        !hasPermission(2, "update")
                          ? "border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"
                          : ""
                      }`}
                      type="text"
                      id="title"
                      autoComplete="off"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title: e.target.value,
                        })
                      }
                      readOnly={!hasPermission(2, "update")}
                    />
                    <p className="text-red-500 text-sm">
                      {errors.title || "\u00A0"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label
                    className="form-label flex items-center gap-1 max-w-56"
                    htmlFor="price"
                  >
                    Price (Rs)
                  </label>
                  <div className="flex flex-col w-full">
                    <input
                      className={`input ${
                        !hasPermission(2, "update")
                          ? "border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"
                          : ""
                      }`}
                      type="text"
                      id="price"
                      autoComplete="off"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: e.target.value,
                        })
                      }
                      readOnly={!hasPermission(2, "update")}
                    />
                    <p className="text-red-500 text-sm">
                      {errors.price || "\u00A0"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label
                    className="form-label flex items-center gap-1 max-w-56"
                    htmlFor="promotion_code"
                  >
                    Promotion code
                  </label>
                  <div className="flex flex-col w-full">
                    <input
                      className={`input ${
                        !hasPermission(2, "update")
                          ? "border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"
                          : ""
                      }`}
                      type="text"
                      id="promotion_code"
                      autoComplete="off"
                      value={formData.promotion_code}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          promotion_code: e.target.value,
                        })
                      }
                      readOnly={!hasPermission(2, "update")}
                    />
                    <p className="text-red-500 text-sm">
                      {errors.promotion_code || "\u00A0"}
                    </p>
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
                      disabled={!hasPermission(2, "update")}
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
                      disablePast
                    />
                  </LocalizationProvider>
                </div>
              </div>

              {hasPermission(2, "update") && (
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
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PromotionBanner;
