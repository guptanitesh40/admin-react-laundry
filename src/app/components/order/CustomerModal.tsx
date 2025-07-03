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
    <div className="fixed inset-0 grid overflow-auto items-center justify-center z-50 p-4">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full smobile:min-w-[85%] z-10 relative">
        <button
          className="btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default"
          onClick={onClose}
        >
          <i className="ki-filled ki-cross"></i>
        </button>
        <form>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-4">Customer Info</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-gray-700 font-semibold"
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
                    className="w-full input border border-gray-300 rounded-md p-2"
                  />
                  <p className="text-red-500 text-sm">
                    {errors.first_name || "\u00A0"}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-gray-700 font-semibold"
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
                    className="w-full input border border-gray-300 rounded-md p-2"
                  />
                  <p className="text-red-500 text-sm">
                    {errors.last_name || "\u00A0"}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-semibold"
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
                    className="w-full input border border-gray-300 rounded-md p-2"
                  />
                  <p className="text-red-500 text-sm">
                    {errors.email || "\u00A0"}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="mobile_number"
                    className="block text-gray-700 font-semibold"
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
                    className="w-full input border border-gray-300 rounded-md p-2"
                  />
                  <p className="text-red-500 text-sm">
                    {errors.mobile_number || "\u00A0"}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-gray-700 font-semibold">
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
                  <p className="text-red-500 text-sm">
                    {errors.gender || "\u00A0"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-4">Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                <div>
                  <label
                    htmlFor="country"
                    className="block text-gray-700 font-semibold"
                  >
                    Address Type
                  </label>
                  <select
                    className="select select-lg text-sm w-full p-2 border border-gray-300 rounded-md"
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
                  <p className="w-full text-red-500 text-sm">
                    {errors.address_type || "\u00A0"}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="area"
                    className="block text-gray-700 font-semibold"
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
                    htmlFor="building_number"
                    className="block text-gray-700 font-semibold"
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
                    className="w-full input border border-gray-300 rounded-md p-2"
                  />
                  <p className="w-full text-red-500 text-sm">
                    {errors.building_number || "\u00A0"}
                  </p>
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
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-light mr-2"
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
