import { useEffect, useState } from "react";
import { useAddUser } from "../../hooks";
import * as Yup from "yup";
import toast from "react-hot-toast";
import useAddAddress from "../../hooks/address/useAddAddress";
import { customerSchema } from "../../validation/userSchema";
import { addressSchema } from "../../validation/addressSchema";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsSubmit: (value: boolean) => void;
  onCustomerCreated: (customer: any, address: any) => void;
}

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  gender: number | null;
  role_id: number;
}

interface Address {
  building_number: string;
  area: string;
  landmark: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
  user_id: number | null;
  full_name: string;
  address_type: number | null;
}

const CustomerModal: React.FC<CustomerModalProps> = ({
  isOpen,
  onClose,
  setIsSubmit,
  onCustomerCreated,
}) => {
  const { addUser, loading: addingCustomer } = useAddUser();
  const { addAddress, loading: addingAddress } = useAddAddress();

  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    gender: null,
    role_id: 5,
  });

  const [addressData, setAddressData] = useState<Address>({
    building_number: "",
    area: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    user_id: null,
    full_name: "",
    address_type: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLatLng, setIsLatLng] = useState(false);
  const [suggesionIsOpen, setSuggesionIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        mobile_number: "",
        gender: null,
        role_id: 5,
      });
      setAddressData({
        building_number: "",
        area: "",
        landmark: "",
        pincode: "",
        city: "",
        state: "",
        country: "",
        user_id: null,
        full_name: "",
        address_type: null,
      });
      setErrors({});
    }
  }, [isOpen]);

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

    try {
      await customerSchema().validate(formData, {
        abortEarly: false,
      });

      await addressSchema.validate(addressData, { abortEarly: false });
      setErrors({});

      const cleanData = { ...formData };
      if (!cleanData.email) {
        delete cleanData.email;
      }

      const userResponse = await addUser(cleanData);

      if (userResponse?.user_id) {
        const formattedData = {
          ...addressData,
          user_id: userResponse.user_id,
          full_name: `${userResponse.first_name} ${userResponse.last_name}`,
        };

        if (!formattedData.landmark) {
          delete formattedData.landmark;
        }

        if (!formattedData.pincode) {
          delete formattedData.pincode;
        }

        const addressResponse = await addAddress(formattedData, false);

        if (addressResponse) {
          onCustomerCreated(userResponse, addressResponse);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 grid items-center justify-center p-4 overflow-auto">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full smobile:min-w-[85%] z-10 relative">
        <button
          className="absolute top-0 right-0 mt-5 mr-5 btn btn-sm btn-icon btn-light btn-outline lg:mr-5 shadow-default"
          onClick={onClose}
        >
          <i className="ki-filled ki-cross"></i>
        </button>
        <form>
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex-1">
              <h3 className="mb-4 text-xl font-semibold">Customer Info</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block font-semibold text-gray-700"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    autoComplete="off"
                    value={formData.first_name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, first_name: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md input"
                  />
                  <p className="text-sm text-red-500">
                    {errors.first_name || "\u00A0"}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="last_name"
                    className="block font-semibold text-gray-700"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    autoComplete="off"
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        last_name: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md input"
                  />
                  <p className="text-sm text-red-500">
                    {errors.last_name || "\u00A0"}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block font-semibold text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    autoComplete="off"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md input"
                  />
                  <p className="text-sm text-red-500">
                    {errors.email || "\u00A0"}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="mobile_number"
                    className="block font-semibold text-gray-700"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    id="mobile_number"
                    name="mobile_number"
                    autoComplete="off"
                    value={formData.mobile_number}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mobile_number: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md input"
                  />
                  <p className="text-sm text-red-500">
                    {errors.mobile_number || "\u00A0"}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-2 font-semibold text-gray-700">
                    Gender
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="gender"
                        value={1}
                        checked={formData.gender === 1}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            gender: parseInt(e.target.value),
                          })
                        }
                        className="radio radio-primary"
                      />
                      <span className="text-sm">Male</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="gender"
                        value={2}
                        checked={formData.gender === 2}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            gender: parseInt(e.target.value),
                          })
                        }
                        className="radio radio-primary"
                      />
                      <span className="text-sm">Female</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="gender"
                        value={3}
                        checked={formData.gender === 3}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            gender: parseInt(e.target.value),
                          })
                        }
                        className="radio radio-primary"
                      />
                      <span className="text-sm">Other</span>
                    </label>
                  </div>
                  <p className="text-sm text-red-500">
                    {errors.gender || "\u00A0"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="mb-4 text-xl font-semibold">Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                <div>
                  <label
                    htmlFor="country"
                    className="block font-semibold text-gray-700"
                  >
                    Address Type
                  </label>
                  <select
                    className="w-full p-2 text-sm border border-gray-300 rounded-md select select-lg"
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
                      Select Type
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
                    {(errors.area && (
                      <p className="w-full text-sm text-red-500">
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
                    htmlFor="building_number"
                    className="block font-semibold text-gray-700"
                  >
                    House Number
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
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 btn btn-light"
              disabled={addingCustomer || addingAddress}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={addingCustomer || addingAddress}
              className={`btn btn-primary ${
                addingCustomer || addingAddress
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {addingCustomer || addingAddress ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;
