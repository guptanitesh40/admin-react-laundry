import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAddAddress from "../../hooks/address/useAddAddress";
import * as Yup from "yup";
import { addressSchema } from "../../validation/addressSchema";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: number;
  setIsSubmit: (value: boolean) => void;
  onAddressAdded: (address: any) => void;
  fullname: string;
}

const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  userId,
  setIsSubmit,
  onAddressAdded,
  fullname,
}) => {
  const { addAddress, loading } = useAddAddress();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLatLng, setIsLatLng] = useState(false);

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
    setAddressData({ ...addressData, area: selectedAddress });
    try {
      const result = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(result[0]);

      if (latLng) {
        setAddressData((prev) => ({
          ...prev,
          lat: latLng?.lat,
          long: latLng?.lng,
        }));
      }
    } catch {
      toast.error("Failed to fetch address detail", {
        className: "toast-error",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addressSchema.validate(addressData, { abortEarly: false });

      if (userId) {
        const addressResponse = await addAddress(addressData);
        if (addressResponse) {
          onAddressAdded(addressResponse);
          onClose();
          setIsSubmit(true);
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
    <div className="fixed inset-0 grid overflow-auto items-center justify-center z-50 p-4">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="bg-white p-5 rounded-lg shadow-lg max-w-lg smobile:min-w-[85%] z-10 relative">
        <button
          className="btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default"
          onClick={onClose}
        >
          <i className="ki-filled ki-cross"></i>
        </button>
        <h2 className="text-2xl font-bold mb-6">Add New Address</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="country"
                className="block text-gray-700 font-semibold"
              >
                Address Type
              </label>
              <select
                className="select select-lg text-sm"
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    address_type: Number(e.target.value),
                  })
                }
              >
                <option
                  value=""
                  selected
                  disabled
                  className="badge-danger badge-outline"
                >
                  Select Address Type
                </option>
                <option value="1">Home</option>
                <option value="2">Office</option>
                <option value="3">Other</option>
              </select>
              <p className="w-full text-red-500 text-sm">
                {errors.address_type || "\u00A0"}
              </p>
            </div>
            <div>
              <label
                htmlFor="building_number"
                className="block text-gray-700 font-semibold"
              >
                Building Number
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
                className="w-full input border border-gray-300 rounded-md p-2"
              />
              <p className="w-full text-red-500 text-sm">
                {errors.building_number || "\u00A0"}
              </p>
            </div>

            <div>
              <label
                htmlFor="area"
                className="block text-gray-700 font-semibold"
              >
                Area
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
                {(errors.area && (
                  <p className="w-full text-red-500 text-sm">
                    {errors.area || "\u00A0"}
                  </p>
                )) ||
                  (isLatLng && (
                    <p className="aam-error-label">
                      please select valid area from dropdown
                    </p>
                  ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="landmark"
                className="block text-gray-700 font-semibold"
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
                className="w-full input border border-gray-300 rounded-md p-2"
              />
              <p className="w-full text-red-500 text-sm">
                {errors.landmark || "\u00A0"}
              </p>
            </div>

            <div>
              <label
                htmlFor="pincode"
                className="block text-gray-700 font-semibold"
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
                className="w-full input border border-gray-300 rounded-md p-2"
              />
              <p className="w-full text-red-500 text-sm">
                {errors.pincode || "\u00A0"}
              </p>
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-gray-700 font-semibold"
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
                className="w-full input border border-gray-300 rounded-md p-2"
              />
              <p className="w-full text-red-500 text-sm">
                {errors.city || "\u00A0"}
              </p>
            </div>

            <div>
              <label
                htmlFor="state"
                className="block text-gray-700 font-semibold"
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
                className="w-full input border border-gray-300 rounded-md p-2"
              />
              <p className="w-full text-red-500 text-sm">
                {errors.state || "\u00A0"}
              </p>
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-gray-700 font-semibold"
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
                className="w-full input border border-gray-300 rounded-md p-2"
              />
              <p className="w-full text-red-500 text-sm">
                {errors.country || "\u00A0"}
              </p>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-light mr-2"
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
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
