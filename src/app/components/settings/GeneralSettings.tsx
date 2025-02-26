import React, { useEffect, useState } from "react";
import { useAddSettings, useGetSettings, usePermissions } from "../../hooks";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { settingSchema } from "../../validation/settingSchema";
import LoadingSpinner from "../shimmer/Loading";

const GeneralSettings: React.FC = ({}) => {
  const { settingsData, fetchSetting, loading } = useGetSettings();
  const { addSetting, loading: adding } = useAddSettings();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [refetch, setRefetch] = useState<boolean>(false);
  const { hasPermission } = usePermissions();

  const generalSettings = settingsData?.data;

  const [formData, setFormData] = useState({
    estimate_delivery_express_day: "",
    estimate_delivery_normal_day: "",
    estimate_pickup_express_hour: "",
    estimate_pickup_normal_hour: "",
    gst_percentage: "",
    shipping_charge: "",
    express_delivery_charge: "",
  });

  useEffect(() => {
    fetchSetting();
    setRefetch(false);
  }, [refetch]);

  useEffect(() => {
    if (generalSettings) {
      setFormData({
        estimate_delivery_express_day:
          generalSettings.estimate_delivery_express_day || "",
        estimate_delivery_normal_day:
          generalSettings.estimate_delivery_normal_day || "",
        estimate_pickup_express_hour:
          generalSettings.estimate_pickup_express_hour || "",
        estimate_pickup_normal_hour:
          generalSettings.estimate_pickup_normal_hour || "",
        gst_percentage: generalSettings.gst_percentage || "",
        shipping_charge: generalSettings.shipping_charge || "",
        express_delivery_charge: generalSettings.express_delivery_charge || "",
      });
    }
  }, [generalSettings]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await settingSchema.validate(formData, { abortEarly: false });

      const isDataChanged = () => {
        return Object.keys(formData).some(
          (key) => formData[key] !== generalSettings[key]
        );
      };

      if (!isDataChanged()) {
        return;
      }

      const settings = Object.keys(formData).map((key) => ({
        setting_key: key,
        setting_value: formData[key],
      }));

      const success = await addSetting(settings);
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

  const handleItemChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <>
      <div className="col-span-1">
        <div className="card pb-2.5 min-w-full">
          <div className="card-header" id="basic_settings">
            <h3 className="card-title">General Settings</h3>
          </div>
          <form onSubmit={handleSaveSettings}>
            <div className="card-body grid gap-1">
              <div className="w-full">
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label className="form-label flex items-center gap-1 max-w-56">
                    Estimate Pickup Normal Hour (In Hour)
                  </label>
                  <div className="flex flex-col w-full">
                    <input
                      className={`input ${
                        !hasPermission(2, "update")
                          ? "border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"
                          : ""
                      }`}
                      type="text"
                      value={formData.estimate_pickup_normal_hour || ""}
                      onChange={(e) =>
                        handleItemChange(
                          "estimate_pickup_normal_hour",
                          e.target.value
                        )
                      }
                      readOnly={!hasPermission(2, "update")}
                    />
                    <p className="text-red-500 text-sm">
                      {errors.estimate_pickup_normal_hour || "\u00A0"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label className="form-label flex items-center gap-1 max-w-56">
                    Estimate Pickup Express Hour (In Hour)
                  </label>
                  <div className="flex flex-col w-full">
                    <input
                      className={`input ${
                        !hasPermission(2, "update")
                          ? "border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"
                          : ""
                      }`}
                      type="text"
                      value={formData.estimate_pickup_express_hour || ""}
                      onChange={(e) =>
                        handleItemChange(
                          "estimate_pickup_express_hour",
                          e.target.value
                        )
                      }
                      readOnly={!hasPermission(2, "update")}
                    />
                    <p className="text-red-500 text-sm">
                      {errors.estimate_pickup_express_hour || "\u00A0"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label className="form-label flex items-center gap-1 max-w-56">
                    GST Percentage (%)
                  </label>
                  <div className="flex flex-col w-full">
                    <input
                      className={`input ${
                        !hasPermission(2, "update")
                          ? "border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"
                          : ""
                      }`}
                      type="text"
                      value={formData.gst_percentage}
                      onChange={(e) =>
                        handleItemChange("gst_percentage", e.target.value)
                      }
                      readOnly={!hasPermission(2, "update")}
                    />
                    <p className="text-red-500 text-sm">
                      {errors.gst_percentage || "\u00A0"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label className="form-label flex items-center gap-1 max-w-56">
                    Estimate Delivery Normal Day (Day)
                  </label>
                  <div className="flex flex-col w-full">
                    <input
                      className={`input ${
                        !hasPermission(2, "update")
                          ? "border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"
                          : ""
                      }`}
                      type="text"
                      value={formData.estimate_delivery_normal_day}
                      onChange={(e) =>
                        handleItemChange(
                          "estimate_delivery_normal_day",
                          e.target.value
                        )
                      }
                      readOnly={!hasPermission(2, "update")}
                    />
                    <p className="text-red-500 text-sm">
                      {errors.estimate_delivery_normal_day || "\u00A0"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label className="form-label flex items-center gap-1 max-w-56">
                    Estimate Delivery Express Day (Day)
                  </label>
                  <div className="flex flex-col w-full">
                    <input
                      className={`input ${
                        !hasPermission(2, "update")
                          ? "border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"
                          : ""
                      }`}
                      type="text"
                      value={formData.estimate_delivery_express_day}
                      onChange={(e) =>
                        handleItemChange(
                          "estimate_delivery_express_day",
                          e.target.value
                        )
                      }
                      readOnly={!hasPermission(2, "update")}
                    />
                    <p className="text-red-500 text-sm">
                      {errors.estimate_delivery_express_day || "\u00A0"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label className="form-label flex items-center gap-1 max-w-56">
                    Shipping Charge (Rs)
                  </label>
                  <div className="flex flex-col w-full">
                    <input
                      className={`input ${
                        !hasPermission(2, "update")
                          ? "border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"
                          : ""
                      }`}
                      type="text"
                      value={formData.shipping_charge}
                      onChange={(e) =>
                        handleItemChange("shipping_charge", e.target.value)
                      }
                      readOnly={!hasPermission(2, "update")}
                    />
                    <p className="text-red-500 text-sm">
                      {errors.shipping_charge || "\u00A0"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label className="form-label flex items-center gap-1 max-w-56">
                    Express Delivery Charge (Rs)
                  </label>
                  <div className="flex flex-col w-full">
                    <input
                      className={`input ${
                        !hasPermission(2, "update")
                          ? "border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"
                          : ""
                      }`}
                      type="text"
                      value={formData.express_delivery_charge}
                      onChange={(e) =>
                        handleItemChange(
                          "express_delivery_charge",
                          e.target.value
                        )
                      }
                      readOnly={!hasPermission(2, "update")}
                    />
                    <p className="text-red-500 text-sm">
                      {errors.express_delivery_charge || "\u00A0"}
                    </p>
                  </div>
                </div>
              </div>

              {hasPermission(2, "update") && (
                <div className="flex relative justify-end pt-2.5">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={adding}
                  >
                    {adding ? (
                      <>
                        Saving... <LoadingSpinner />
                      </>
                    ) : (
                      <>Save Changes </>
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

export default GeneralSettings;
