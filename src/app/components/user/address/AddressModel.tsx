import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAddAddress from "../../../hooks/address/useAddAddress";
import * as Yup from "yup";
import { addressSchema } from "../../../validation/addressSchema";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useUpdateAddress } from "../../../hooks/address/useUpdateAddress";

interface Address {
  address_id: number;
  address_type: number;
  area?: string;
  building_number?: string;
  landmark?: string;
  city?: string;
  country?: string;
  full_name?: string;
  phone_number?: string;
  pincode?: number;
  state?: string;
  user_id: number;
  lat: string;
  long: string;
}

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: number;
  setIsSubmit: (value: boolean) => void;
  onAddressAdded: (address: any) => void;
  fullname: string;
  address?: Address | null;
}

const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  userId,
  setIsSubmit,
  onAddressAdded,
  fullname,
  address,
}) => {
  const isEditMode = Boolean(address);

  const { addAddress, loading } = useAddAddress();
  const { updateAddress, loading: updatingAddress } = useUpdateAddress();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [addressData, setAddressData] = useState({
    building_number: "",
    area: "",
    lat: null,
    long: null,
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    user_id: null,
    address_type: null,
    full_name: "",
  });
  const [initialAddressData, setInitialAddressData] = useState({
    building_number: "",
    area: "",
    lat: null,
    long: null,
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    user_id: null,
    address_type: null,
    full_name: "",
  });

  const [suggesionIsOpen, setSuggesionIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (userId) {
        setAddressData((prevData) => ({
          ...prevData,
          user_id: userId,
          full_name: fullname,
        }));
      }

      if (isEditMode && address) {
        const newData = {
          building_number: address?.building_number || "",
          area: address.area || "",
          landmark: address.landmark || "",
          pincode: address.pincode?.toString() || "",
          city: address.city || "",
          state: address.state || "",
          country: address.country || "",
          lat: address.lat || "",
          long: address.long || "",
          user_id: address.user_id,
          address_type: address.address_type,
          full_name: address.full_name || "",
        };
        setAddressData(newData);
        setInitialAddressData(newData);
      }
    } else {
      setAddressData({
        building_number: "",
        area: "",
        landmark: "",
        pincode: "",
        city: "",
        lat: null,
        long: null,
        state: "",
        country: "",
        user_id: null,
        address_type: null,
        full_name: "",
      });
      setErrors({});
    }
  }, [isOpen, userId]);

  const handleAddressChange = (newAddress: any) => {
    setAddressData({ ...addressData, area: newAddress });
    setSuggesionIsOpen(true);
  };

  const handleAddressSelect = async (selectedAddress: string) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      const addressComponents = results[0].address_components;

      const getComponent = (types: string[]) => {
        const component = addressComponents.find((c) =>
          types.some((t) => c.types.includes(t))
        );
        return component?.long_name || "";
      };

      const city =
        getComponent(["locality"]) ||
        getComponent(["administrative_area_level_2"]) ||
        getComponent(["postal_town"]);

      const state = getComponent(["administrative_area_level_1"]);
      const country = getComponent(["country"]);
      const pincode = getComponent(["postal_code"]);

      setAddressData((prev) => ({
        ...prev,
        area: results[0].formatted_address,
        lat: latLng.lat,
        long: latLng.lng,
        city,
        state,
        country,
        pincode,
      }));
    } catch {
      toast.error("Failed to fetch full address details", {
        className: "toast-error",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      isEditMode &&
      JSON.stringify(addressData) === JSON.stringify(initialAddressData)
    ) {
      onClose();
      return;
    }

    const cleanedAddressData = { ...addressData };

    if (!cleanedAddressData.pincode) {
      delete cleanedAddressData.pincode;
    }
    if (!cleanedAddressData.landmark) {
      delete cleanedAddressData.landmark;
    }

    if (cleanedAddressData.lat && cleanedAddressData.long) {
      cleanedAddressData.lat = Number(cleanedAddressData.lat);
      cleanedAddressData.long = Number(cleanedAddressData.long);
    }

    try {
      await addressSchema.validate(addressData, { abortEarly: false });
      setErrors({});
      if (!cleanedAddressData.lat && !cleanedAddressData.long) {
        toast.error("Please search your address and  select it from dropdown");
        return;
      }
      if (userId) {
        if (isEditMode && address?.address_id) {
          const updated = await updateAddress(
            address.address_id,
            cleanedAddressData
          );
          if (updated.statusCode === 200) {
            onAddressAdded(updated);
            onClose();
            setIsSubmit(true);
          }
        } else {
          const created = await addAddress(cleanedAddressData);
          if (created) {
            onAddressAdded(created);
            onClose();
            setIsSubmit(true);
          }
        }
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

  if (!isOpen) return;

  return (
    <div className="fixed inset-0 z-50 grid items-center justify-center p-4 overflow-auto">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="bg-white p-5 rounded-lg shadow-lg min-w-[450px] !max-w-full z-10 relative">
        <button
          className="absolute top-0 right-0 mt-5 mr-5 btn btn-sm btn-icon btn-light btn-outline lg:mr-5 shadow-default"
          onClick={onClose}
        >
          <i className="ki-filled ki-cross"></i>
        </button>
        <h2 className="mb-6 text-2xl font-bold">
          {isEditMode ? "Edit Address" : "Add New Address"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="country"
                className="block font-semibold text-gray-700"
              >
                Address Type
              </label>
              <select
                className="text-sm select select-lg"
                value={addressData?.address_type ?? ""}
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    address_type: Number(e.target.value),
                  })
                }
              >
                <option value={null} className="badge-danger badge-outline">
                  Select Address Type
                </option>
                <option value="1">Home</option>
                <option value="2">Office</option>
                <option value="3">Other</option>
              </select>
              <p className="w-full text-sm text-red-500">
                {errors.address_type || "\u00A0"}
              </p>
            </div>

            <div>
              <label
                htmlFor="area"
                className="block font-semibold text-gray-700"
              >
                Search Address
              </label>

              <div className="relative">
                <div className="relative">
                  <PlacesAutocomplete
                    value={addressData.area}
                    onChange={handleAddressChange}
                    onSelect={handleAddressSelect}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <>
                        <input
                          {...getInputProps({
                            className:
                              "w-full input border border-gray-300 rounded-md p-2",
                            id: "area",
                            type: "text",
                            onFocus: () => setSuggesionIsOpen(true),
                            onBlur: () => setSuggesionIsOpen(false),
                          })}
                        />
                        {suggesionIsOpen && suggestions.length > 0 && (
                          <div className="absolute bg-white border z-10 border-gray-200 rounded-lg w-full text-sm max-h-[150px] overflow-y-auto">
                            <ul className="custom-ul">
                              {loading && (
                                <li className="block px-4 py-[0.8rem] hover:bg-gray-100 w-full">
                                  Loading...
                                </li>
                              )}
                              {!loading &&
                                suggestions.map((suggestion, index) => {
                                  const { ...props } =
                                    getSuggestionItemProps(suggestion);
                                  return (
                                    <li
                                      key={index}
                                      {...props}
                                      className="block px-2 py-[0.8rem] hover:bg-gray-100 w-full cursor-pointer font-style"
                                    >
                                      {suggestion?.description}
                                    </li>
                                  );
                                })}
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                  </PlacesAutocomplete>
                </div>
                {errors.area && (
                  <p className="w-full text-sm text-red-500">
                    {errors.area || "\u00A0"}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="building_number"
                className="block font-semibold text-gray-700"
              >
                House Number and Society
              </label>
              <input
                type="text"
                id="building_number"
                name="building_number"
                autoComplete="off"
                value={addressData.building_number}
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    building_number: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-md input"
              />
              <p className="w-full text-sm text-red-500">
                {errors.building_number || "\u00A0"}
              </p>
            </div>

            <div>
              <label
                htmlFor="landmark"
                className="block font-semibold text-gray-700"
              >
                Landmark
              </label>
              <input
                type="text"
                id="landmark"
                name="landmark"
                autoComplete="off"
                value={addressData.landmark}
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    landmark: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-md input"
              />
              <p className="w-full text-sm text-red-500">
                {errors.landmark || "\u00A0"}
              </p>
            </div>

            <div>
              <label
                htmlFor="city"
                className="block font-semibold text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                autoComplete="off"
                value={addressData.city}
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-md input"
              />
              <p className="w-full text-sm text-red-500">
                {errors.city || "\u00A0"}
              </p>
            </div>

            <div>
              <label
                htmlFor="pincode"
                className="block font-semibold text-gray-700"
              >
                Pin code
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                autoComplete="off"
                value={addressData.pincode}
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    pincode: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-md input"
              />
              <p className="w-full text-sm text-red-500">
                {errors.pincode || "\u00A0"}
              </p>
            </div>

            <div>
              <label
                htmlFor="state"
                className="block font-semibold text-gray-700"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                autoComplete="off"
                value={addressData.state}
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    state: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-md input"
              />
              <p className="w-full text-sm text-red-500">
                {errors.state || "\u00A0"}
              </p>
            </div>

            <div>
              <label
                htmlFor="country"
                className="block font-semibold text-gray-700"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                autoComplete="off"
                value={addressData.country}
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    country: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-md input"
              />
              <p className="w-full text-sm text-red-500">
                {errors.country || "\u00A0"}
              </p>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 btn btn-light"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isEditMode
                ? loading
                  ? "updating..."
                  : "update"
                : loading
                ? "submitting..."
                : "submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
