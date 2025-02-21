import { useEffect, useState } from "react";
import { useAddUser } from "../../hooks";
import * as Yup from "yup";
import { customerSchema } from "../../validation/userSchema";
import toast from "react-hot-toast";

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsSubmit: (value: boolean) => void;
}

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  gender: number | null;
  role_id: number;
}

const CustomerModal: React.FC<CustomerModalProps> = ({
  isOpen,
  onClose,
  setIsSubmit,
}) => {
  const { addUser, loading } = useAddUser();

  const formDataState: FormData = {
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    gender: null,
    role_id: 5,
  };

  const [formData, setFormData] = useState(formDataState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        mobile_number: "",
        gender: null,
        role_id: 5,
      });
      setErrors({});
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const schema = customerSchema();
      await schema.validate(formData, {
        abortEarly: false,
      });

      await addUser(formData);
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
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg smobile:min-w-[85%] z-10 relative">
        <button
          className="btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default"
          onClick={onClose}
        >
          <i className="ki-filled ki-cross"></i>
        </button>
        <h2 className="text-2xl font-bold mb-6">Add New Customer</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
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
                value={formData.first_name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                className="w-full input border border-gray-300 rounded-md"
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
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    last_name: e.target.value,
                  })
                }
                className="w-full input border border-gray-300 rounded-md"
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
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full input border border-gray-300 rounded-md"
              />
              <p className="text-red-500 text-sm">{errors.email || "\u00A0"}</p>
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
                value={formData.mobile_number}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    mobile_number: e.target.value,
                  })
                }
                className="w-full input border border-gray-300 rounded-md"
              />
              <p className="text-red-500 text-sm">
                {errors.mobile_number || "\u00A0"}
              </p>
            </div>

            <div>
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

          <div className="flex justify-end mt-4">
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

export default CustomerModal;
