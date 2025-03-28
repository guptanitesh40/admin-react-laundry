import { useEffect, useRef, useState } from "react";
import useGetUsersByRole from "../../hooks/user/useGetUsersByRole";
import { sendPaymentLinkSchema } from "../../validation/sendPaymentLinkSchema";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useGeneratePaymentLink } from "../../hooks";
import LoadingSpinner from "../shimmer/LoadingSpinner";

interface SendPaymentLinkModalProps {
  modalOpen: boolean;
  onClose: () => void;
}

const SendPaymentLinkModal: React.FC<SendPaymentLinkModalProps> = ({
  modalOpen,
  onClose,
}) => {
  const { users, fetchUsersByRole } = useGetUsersByRole();
  const { generatePaymentLink, loading: sendingLink } =
    useGeneratePaymentLink();

  const [userSearch, setUserSearch] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(true);
  const [focusOn, setFocusOn] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    user_id: null,
    amount: "",
    customer: {
      name: "",
      contact: "",
      email: "",
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (focusOn && (!userSearch || userSearch.trim() === "")) {
        await fetchUsersByRole(5);
      } else if (userSearch && isSearchMode) {
        await fetchUsersByRole(5, userSearch);
      }
    };
    fetchUserData();
  }, [focusOn, userSearch, isSearchMode]);

  useEffect(() => {
    if (!modalOpen) {
      setUserSearch("");
      setFormData({
        user_id: null,
        amount: "",
        customer: {
          name: "",
          contact: "",
          email: "",
        },
      });
      setErrors({});
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsSearchMode(false);
        setFocusOn(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSearch(e.target.value);
    setIsSearchMode(true);
    if (e.target.value === "") {
      setFormData({
        user_id: null,
        amount: "",
        customer: {
          name: "",
          contact: "",
          email: "",
        },
      });
    }
  };

  const handleUserClick = (user: any) => {
    const fullName = `${user.first_name} ${user.last_name}`;
    setUserSearch(fullName);
    setIsSearchMode(false);
    setFormData({
      user_id: user.user_id,
      amount: "",
      customer: {
        name: fullName,
        contact: user.mobile_number || "",
        email: user.email || "",
      },
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        [id]: value,
      },
    }));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      amount: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await sendPaymentLinkSchema.validate(formData, { abortEarly: false });

      const formattedData = {
        ...formData,
        amount: Number(formData.amount),
        currency: "INR",
      };

      await generatePaymentLink(formattedData);

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

  if (!modalOpen) return null;

  return (
    <>
      <div className="fixed inset-0 grid overflow-auto place-items-center z-50 p-4">
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>

        <div className="p-5 rounded-lg shadow-lg z-10 relative bg-white w-full max-w-[400px] mdmobile:max-w-full">
          <button
            className="btn btn-sm btn-icon btn-light btn-outline absolute top-0 right-0 mr-5 mt-5 lg:mr-5 shadow-default"
            onClick={onClose}
          >
            <i className="ki-filled ki-cross"></i>
          </button>
          <h2 className="sm:text-2xl font-bold mb-6">Fill Customer Info</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
              <div className="relative flex flex-col">
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-bold mb-1"
                >
                  Customer Name
                </label>
                <input
                  type="text"
                  id="username"
                  ref={inputRef}
                  autoComplete="off"
                  value={userSearch}
                  onChange={handleSearchChange}
                  className="input border border-gray-300 rounded-md p-2 w-full"
                  placeholder="Search name..."
                  onFocus={() => {
                    setFocusOn(true);
                    setIsSearchMode(true);
                  }}
                />

                {users && isSearchMode && (
                  <ul
                    ref={dropdownRef}
                    className="absolute mt-[64px] bg-white border z-10 border-gray-300 rounded-md p-2 w-full text-sm max-h-[300px] overflow-y-auto"
                  >
                    {users.length > 0 ? (
                      users.map((user: any) => (
                        <li
                          key={user.user_id}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleUserClick(user)}
                        >
                          {user.first_name} {user.last_name} (
                          {user.mobile_number})
                        </li>
                      ))
                    ) : (
                      <li className="p-2 text-gray-500">No users found</li>
                    )}
                  </ul>
                )}
                <p className="text-red-500 text-sm">
                  {errors.user_id || "\u00A0"}
                </p>
              </div>

              <div className="relative flex flex-col">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-1"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  autoComplete="off"
                  value={formData.customer.email}
                  onChange={handleInputChange}
                  className="input border border-gray-300 rounded-md p-2 w-full"
                />
                <p className="text-red-500 text-sm">
                  {errors["customer.email"] || "\u00A0"}
                </p>
              </div>

              <div className="relative flex flex-col">
                <label
                  htmlFor="contact"
                  className="block text-gray-700 text-sm font-bold mb-1"
                >
                  Mobile number
                </label>
                <input
                  type="text"
                  id="contact"
                  autoComplete="off"
                  value={formData.customer.contact}
                  onChange={handleInputChange}
                  className="input border border-gray-300 rounded-md p-2 w-full"
                />
                <p className="text-red-500 text-sm">
                  {errors["customer.contact"] || "\u00A0"}
                </p>
              </div>

              <div className="relative flex flex-col">
                <label
                  htmlFor="amount"
                  className="block text-gray-700 text-sm font-bold mb-1"
                >
                  Amount
                </label>
                <input
                  type="text"
                  id="amount"
                  autoComplete="off"
                  value={formData.amount}
                  onChange={handleAmountChange}
                  className="input border border-gray-300 rounded-md p-2 w-full"
                />
                <p className="text-red-500 text-sm">
                  {errors.amount || "\u00A0"}
                </p>
              </div>

              <div className="flex mt-4 justify-self-end">
                <button
                  type="submit"
                  className="btn btn-primary mr-2"
                  disabled={sendingLink}
                >
                  {sendingLink ? (
                    <>
                      Sending... <LoadingSpinner />
                    </>
                  ) : (
                    <>Send Link </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-light"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SendPaymentLinkModal;
