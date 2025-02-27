import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAddAddress from "../../hooks/address/useAddAddress";
import * as Yup from "yup";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: number;
  setIsSubmit: (value: boolean) => void;
}

const schema = Yup.object().shape({
  pincode: Yup.string()
    .required("Pin Code is required")
    .matches(/^[0-9]{6}$/, "Pincode must be 6 digit"),
  address_type: Yup.number().required("Address type is required"),
});

const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  userId,
  setIsSubmit,
}) => {
  const { addAddress, loading } = useAddAddress();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [addressData, setAddressData] = useState({
    building_number: "",
    area: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    user_id: null,
    address_type: null,
  });

  useEffect(() => {
    if (isOpen) {
      if (userId) {
        setAddressData((prevData) => ({
          ...prevData,
          user_id: userId,
        }));
      }
    } else {
      setAddressData({
        building_number: "",
        area: "",
        landmark: "",
        pincode: "",
        city: "",
        state: "",
        country: "",
        user_id: null,
        address_type: null,
      });
      setErrors({});
    }
  }, [isOpen, userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await schema.validate(addressData, { abortEarly: false });

      if (userId) {
        await addAddress(addressData);
      }
      setIsSubmit(true);
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
                htmlFor="building_number"
                className="block text-gray-700 font-semibold"
              >
                Building Number
              </label>
              <input
                type="text"
                id="building_number"
                name="building_number"
                value={addressData.building_number}
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    building_number: e.target.value,
                  })
                }
                className="w-full input border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label
                htmlFor="area"
                className="block text-gray-700 font-semibold"
              >
                Area
              </label>
              <input
                type="text"
                id="area"
                name="area"
                value={addressData.area}
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    area: e.target.value,
                  })
                }
                className="w-full input border border-gray-300 rounded-md p-2"
              />
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
                value={addressData.landmark}
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    landmark: e.target.value,
                  })
                }
                className="w-full input border border-gray-300 rounded-md p-2"
              />
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
                value={addressData.city}
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    city: e.target.value,
                  })
                }
                className="w-full input border border-gray-300 rounded-md p-2"
              />
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
                value={addressData.state}
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    state: e.target.value,
                  })
                }
                className="w-full input border border-gray-300 rounded-md p-2"
              />
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
                value={addressData.country}
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    country: e.target.value,
                  })
                }
                className="w-full input border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-gray-700 font-semibold"
              >
                Address Type
              </label>
              <select 
              className="select select-lg text-sm"
              onChange={(e) => setAddressData({
                ...addressData,
                address_type: Number(e.target.value)
              })}
              >
                <option value="" selected disabled className="badge-danger badge-outline">
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
