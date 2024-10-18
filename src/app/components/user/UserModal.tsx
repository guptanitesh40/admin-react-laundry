import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAddUser, useUpdateUser } from "../../hooks";
import * as Yup from "yup";
import { userSchema } from "../../validation/userSchema";
import useGetUser from "../../hooks/user/useGetuser";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsSubmit: (value: boolean) => void;
  user_id?:number;
}

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  setIsSubmit,
  user_id,
}) => {
  const { addUser, loading: adding } = useAddUser();
  const { updateUser, loading: updating } = useUpdateUser();

  const { user } = useGetUser(user_id);
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    mobile_number: "",
    gender: null,
    role_id: null,
    otp: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      if (user) {
        setFormData({
          ...formData,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          password: user.password,
          mobile_number: user.mobile_number,
          gender: user.gender,
          role_id: user.role_id,
        });
      } else {
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          mobile_number: "",
          gender: null,
          role_id: null,
          otp: "",
        });
      }
    } else {
      setErrors({});
    }
  }, [isOpen, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();
    try {
      const schema = userSchema(!!user_id);

      await schema.validate(formData, {
        abortEarly: false,
      });

      if (user_id) {
        await updateUser(user_id, formData);
      } else {
        await addUser(formData);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full z-10 relative">
        <button
          className="btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 shadow-default"
          onClick={onClose}
        >
          <i className="ki-filled ki-cross"></i>
        </button>
        <h1 className="text-2xl font-bold mb-6">
          {user_id ? "Edit user detail" : "Add user"}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="mb-2 font-semibold" htmlFor="first_name">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                className="input border border-gray-300 rounded-md p-2"
              />
              <p className="text-red-500 text-sm">
                {errors.first_name || "\u00A0"}
              </p>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-semibold" htmlFor="last_name">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                className="input border border-gray-300 rounded-md p-2"
              />
              <p className="text-red-500 text-sm">
                {errors.last_name || "\u00A0"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="mb-2 font-semibold" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="input border border-gray-300 rounded-md p-2"
              />
              <p className="text-red-500 text-sm">{errors.email || "\u00A0"}</p>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-semibold" htmlFor="mobile_number">
                Mobile Number
              </label>
              <input
                type="text"
                id="mobile_number"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={(e) =>
                  setFormData({ ...formData, mobile_number: e.target.value })
                }
                className="input border border-gray-300 rounded-md p-2"
              />
              <p className="text-red-500 text-sm">
                {errors.mobile_number || "\u00A0"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="mb-2 font-semibold" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="input border border-gray-300 rounded-md p-2"
              />
              <p className="text-red-500 text-sm">
                {errors.password || "\u00A0"}
              </p>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-semibold" htmlFor="role_id">
                Role
              </label>
              <select
                id="role_id"
                className="select border border-gray-300 rounded-md p-2 w-full"
                value={formData.role_id === null ? "" : formData.role_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role_id: e.target.value ? parseInt(e.target.value) : "",
                  })
                }
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value={1}>Super Admin</option>
                <option value={2}>Sub Admin</option>
                <option value={3}>Branch Manager</option>
                <option value={4}>Delivery Boy</option>
                <option value={5}>Customer</option>
                <option value={6}>Workshop Manager</option>
              </select>
              <p className="text-red-500 text-sm">
                {errors.role_id || "\u00A0"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="mb-2 font-semibold" htmlFor="password">
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

            {!user_id && (
              <div className="flex flex-col">
                <label className="mb-2 font-semibold" htmlFor="otp">
                  Enter OTP
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={(e) =>
                      setFormData({ ...formData, otp: e.target.value })
                    }
                    className="input border border-gray-300 rounded-md p-2 flex-grow"
                  />
                  <button className="btn btn-primary ml-2 px-4 py-2">
                    Send OTP
                  </button>
                </div>
                <p className="text-red-500 text-sm">{errors.otp || "\u00A0"}</p>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className={`btn btn-primary ${
                adding || updating ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={adding || updating}
            >
              {adding || updating
                ? adding
                  ? "Adding..."
                  : "Updating..."
                : user_id
                ? "Update user"
                : "Add user"}
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={onClose}
              disabled={adding || updating}
            >
              Cancel
            </button>
          </div>
        
        </form>
      </div>
    </div>
  );
};

export default UserModal;
