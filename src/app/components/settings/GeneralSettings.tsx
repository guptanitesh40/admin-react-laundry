import React, { useEffect, useState } from "react";
import { useAddSettings, useGetSettings, usePermissions } from "../../hooks";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { settingSchema } from "../../validation/settingSchema";
import LoadingSpinner from "../shimmer/LoadingSpinner";

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
    normal_delivery_charges: "",
    express_delivery_charge: "",
    express_delivery_24hrs: "",
    express_delivery_48hrs: "",
    express_delivery_72hrs: "",
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
        normal_delivery_charges: generalSettings.normal_delivery_charges || "",
        express_delivery_charge: generalSettings.express_delivery_charge || "",
        express_delivery_24hrs: generalSettings.express_delivery_24hrs || "",
        express_delivery_48hrs: generalSettings.express_delivery_48hrs || "",
        express_delivery_72hrs: generalSettings.express_delivery_72hrs || "",
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

  if (loading) {
    return (
      <div className="col-span-1">
        <div className="card pb-2.5 min-w-full !border-gray-200">
          <div className="card-header">
            <span className="inline-block h-[31px] min-w-32 bg-gray-200 rounded-md animate-pulse"></span>
          </div>
          <div>
            <div className="card-body grid gap-1">
              {Array.from({ length: 7 }).map((_, index) => {
                return (
                  <div key={index} className="w-full py-3">
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
        <div className="card pb-2.5 min-w-full">
          <div className="card-header" id="basic_settings">
            <h3 className="card-title">General Settings</h3>
          </div>
          <form onSubmit={handleSaveSettings}>
            <div className="card-body grid gap-1">
              <div className="w-full">
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label
                    className="form-label flex items-center gap-1 max-w-56"
                    htmlFor="estimate_pickup_normal_hour"
                  >
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
                      id="estimate_pickup_normal_hour"
                      autoComplete="off"
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
                  <label
                    className="form-label flex items-center gap-1 max-w-56"
                    htmlFor="estimate_pickup_express_hour"
                  >
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
                      id="estimate_pickup_express_hour"
                      autoComplete="off"
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
                  <label
                    className="form-label flex items-center gap-1 max-w-56"
                    htmlFor="gst_percentage"
                  >
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
                      id="gst_percentage"
                      autoComplete="off"
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
                  <label
                    className="form-label flex items-center gap-1 max-w-56"
                    htmlFor="estimate_delivery_normal_day"
                  >
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
                      id="estimate_delivery_normal_day"
                      autoComplete="off"
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

              <div className="w-full" style={{ display: "none" }}>
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label
                    className="form-label flex items-center gap-1 max-w-56"
                    htmlFor="estimate_delivery_express_day"
                  >
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
                      id="estimate_delivery_express_day"
                      autoComplete="off"
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
                  <label
                    className="form-label flex items-center gap-1 max-w-56"
                    htmlFor="normal_delivery_charges"
                  >
                    Normal Delivery Charge (Rs)
                  </label>
                  <div className="flex flex-col w-full">
                    <input
                      className={`input ${
                        !hasPermission(2, "update")
                          ? "border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"
                          : ""
                      }`}
                      type="text"
                      id="normal_delivery_charges"
                      autoComplete="off"
                      value={formData.normal_delivery_charges}
                      onChange={(e) =>
                        handleItemChange(
                          "normal_delivery_charges",
                          e.target.value
                        )
                      }
                      readOnly={!hasPermission(2, "update")}
                    />
                    <p className="text-red-500 text-sm">
                      {errors.normal_delivery_charges || "\u00A0"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label
                    className="form-label flex items-center gap-1 max-w-56"
                    htmlFor="express_delivery_24hrs"
                  >
                    Express Delivery 24 Hours (%)
                  </label>
                  <div className="flex flex-col w-full">
                    <input
                      className={`input ${
                        !hasPermission(2, "update")
                          ? "border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"
                          : ""
                      }`}
                      type="text"
                      id="express_delivery_24hrs"
                      autoComplete="off"
                      value={formData.express_delivery_24hrs}
                      onChange={(e) =>
                        handleItemChange(
                          "express_delivery_24hrs",
                          e.target.value
                        )
                      }
                      readOnly={!hasPermission(2, "update")}
                    />
                    <p className="text-red-500 text-sm">
                      {errors.express_delivery_24hrs || "\u00A0"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label
                    className="form-label flex items-center gap-1 max-w-56"
                    htmlFor="express_delivery_48hrs"
                  >
                    Express Delivery 48 Hours (%)
                  </label>
                  <div className="flex flex-col w-full">
                    <input
                      className={`input ${
                        !hasPermission(2, "update")
                          ? "border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"
                          : ""
                      }`}
                      type="text"
                      id="express_delivery_48hrs"
                      autoComplete="off"
                      value={formData.express_delivery_48hrs}
                      onChange={(e) =>
                        handleItemChange(
                          "express_delivery_48hrs",
                          e.target.value
                        )
                      }
                      readOnly={!hasPermission(2, "update")}
                    />
                    <p className="text-red-500 text-sm">
                      {errors.express_delivery_48hrs || "\u00A0"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label
                    className="form-label flex items-center gap-1 max-w-56"
                    htmlFor="express_delivery_72hrs"
                  >
                    Express Delivery 72 Hours (%)
                  </label>
                  <div className="flex flex-col w-full">
                    <input
                      className={`input ${
                        !hasPermission(2, "update")
                          ? "border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"
                          : ""
                      }`}
                      type="text"
                      id="express_delivery_72hrs"
                      autoComplete="off"
                      value={formData.express_delivery_72hrs}
                      onChange={(e) =>
                        handleItemChange(
                          "express_delivery_72hrs",
                          e.target.value
                        )
                      }
                      readOnly={!hasPermission(2, "update")}
                    />
                    <p className="text-red-500 text-sm">
                      {errors.express_delivery_72hrs || "\u00A0"}
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
