/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  useGetAddress,
  useGetCompanies,
} from "../../../hooks";
import { useLocation, useNavigate } from "react-router-dom";
import AddressModal from "../AddressModal";
import useGetUsersByRole from "../../../hooks/user/useGetUsersByRole";
import CustomerModal from "../CustomerModal";
import useGetUser from "../../../hooks/user/useGetuser";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import Loading from "../../shimmer/Loading";
import { quickOrderSchema } from "./validation/quickOrderSchema";
import useGetBranchesV2 from "../../../hooks/branch/useGetBranchesV2";
import useAddQuickOrder from "../../../hooks/order/useAddQuickOrder";

interface FormData {
  company_id: number | null;
  branch_id: number;

  user_id: number;
  username: string;
  address_id: number | null;

  description: string;

  express_delivery_charges: number;
  express_delivery_hour: number | null;
  normal_delivery_charges: number;

  payment_type: number;

  gstin: string;
  gst_company_name: string;
}

const OrderForm: React.FC = () => {
  const perPage = 1000;
  const pageNumber = 1;

  const { companies, loading: loadingCompanies } = useGetCompanies(
    pageNumber,
    perPage
  );
  const {
    branches,
    loading: loadingBranches,
    fetchBranches,
  } = useGetBranchesV2();
  const { addQuickOrder, loading: addingQuickOrder } = useAddQuickOrder();

  const currentUserData = useSelector((store) => store?.user);

  const [userSearch, setUserSearch] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(true);

  const [haveGstIn, setHaveGstIn] = useState<boolean>(false);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [userModalIsOpen, setUserModalIsOpen] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const { users, fetchUsersByRole } = useGetUsersByRole();

  const { address, fetchAddress } = useGetAddress();
  const { userData, fetchUser } = useGetUser();
  const user = userData?.user;
  const location = useLocation();
  const navigate = useNavigate();
  const prevUrl = location?.state?.prevUrl || "/orders";
  const inputRef = useRef<HTMLInputElement | null>(null);

  const dropdownRef = useRef<HTMLUListElement>(null);
  const [focusOn, setFocusOn] = useState<boolean>(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    company_id: null,
    branch_id: null,

    username: "",
    user_id: null,
    address_id: null,

    description: "",

    express_delivery_charges: null,
    express_delivery_hour: null,
    normal_delivery_charges: null,

    payment_type: 1,
    gstin: "",
    gst_company_name: "",
  });

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

  useEffect(() => {
    if (address?.length) {
      const defaultAddress =
        address.find((add) => add.is_default) || address[0];

      setFormData((prev) => ({
        ...prev,
        address_id: defaultAddress ? defaultAddress.address_id : null,
      }));
    }
  }, [address]);

  useEffect(() => {
    const fetchData = async () => {
      if (formData.user_id) {
        await fetchAddress(formData.user_id);
        await fetchUser(formData.user_id);
      }
      if (isSubmit) {
        await fetchAddress(formData.user_id);
        setIsSubmit(false);
      }
    };
    fetchData();
  }, [formData.user_id, isSubmit]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (focusOn && (!userSearch || userSearch.trim() === "")) {
        setIsSearchMode(true);
        await fetchUsersByRole(5);
      } else if (userSearch && isSearchMode) {
        await fetchUsersByRole(5, userSearch);
      }
    };
    fetchUserData();
  }, [focusOn, userSearch, isSearchMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await quickOrderSchema.validate(formData, { abortEarly: false });
      setErrors({});

      const payload = {
        ...formData,
        sub_total: 0,
        payment_status: 1,
        transaction_id: "",
        order_status: 1,
      };

      const success = await addQuickOrder(payload);
      if (success) {
        navigate("/orders");
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setFormData((prev) => ({ ...prev, address_id: null, user_id: null }));
    }
    setUserSearch(e.target.value);
    setIsSearchMode(true);
  };

  const handleUserClick = (user: any) => {
    const fullName = `${user.first_name} ${user.last_name}`;
    setUserSearch(fullName);
    setIsSearchMode(false);

    setFormData({
      ...formData,
      username: fullName,
      user_id: user.user_id,
    });
  };

  const handleCancel = () => {
    navigate(`${prevUrl}`);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAddressId = event.target.value;
    setFormData((prev) => ({
      ...prev,
      address_id: Number(selectedAddressId),
    }));
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.user_id) {
      toast.error("Please select the user to add address");
    } else {
      setModalIsOpen(true);
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUserModalIsOpen(true);
  };

  const handleCustomerSelect = (customer: any, address: any) => {
    if (customer) {
      const fullName = `${customer.first_name} ${customer.last_name}`;
      setUserSearch(fullName);
      setIsSearchMode(false);

      setFormData({
        ...formData,
        username: fullName,
        user_id: customer.user_id,
      });
    }

    if (address) {
      setFormData((prev) => ({
        ...prev,
        address_id: address.address_id,
      }));
    }
  };

  const handleAddressSelect = (address: any) => {
    if (address) {
      setFormData((prev) => ({
        ...prev,
        address_id: address.address_id,
      }));
    }
  };

  useEffect(() => {
    if (!loadingCompanies && companies.length > 0) {
      const defaultOption = companies.find(
        (company) => company.gst_percentage === 6
      );

      if (defaultOption) {
        setFormData({
          ...formData,
          company_id: defaultOption.company_id,
        });
      }
    }
  }, [companies, loadingCompanies]);

  useEffect(() => {
    if (formData.company_id) {
      fetchBranches(formData.company_id);
    }
  }, [formData.company_id]);

  useEffect(() => {
    if (branches.length > 0) {
      const userBranchId = currentUserData?.user_branch?.[0];

      const matched = branches.find((b) => b.branch_id === userBranchId);
      const defaultBranchId = matched?.branch_id ?? branches[0].branch_id;

      setFormData((prev) => ({
        ...prev,
        branch_id: defaultBranchId,
      }));
    }
  }, [branches, currentUserData]);

  if (loadingCompanies || loadingBranches) {
    return <Loading />;
  }

  return (
    <div className="container-fixed">
      <div className="card max-w-5xl mx-auto bg-white shadow-md lg:!p-4 xl:!p-6 sm:!p-5 p-3.5">
        <div className="flex">
          <h1 className="mb-6 text-2xl font-bold">Add Quick Order</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 mt-4 md:grid-cols-2 cs1:gap-x-6 gap-x-4 gap-y-5">
            <div className="md:!col-span-2 grid md:!grid-cols-2 cs1:gap-x-6 gap-x-4 items-start grid-cols-1">
              <div className="flex flex-col">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="company_id"
                >
                  Company
                </label>
                <select
                  id="company_id"
                  className="w-full p-2 text-sm border border-gray-300 rounded-md select"
                  value={formData.company_id || ""}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      company_id: e.target.value
                        ? Number(e.target.value)
                        : null,
                    });
                  }}
                >
                  <option value="" disabled>
                    Select Company
                  </option>
                  {companies.length > 0 ? (
                    companies.map((company) => (
                      <option
                        key={company.company_id}
                        value={company.company_id}
                      >
                        {`${company.company_name} (${company.gst_percentage}%)`}
                      </option>
                    ))
                  ) : (
                    <option>No Data available</option>
                  )}
                </select>
                <p className="text-sm text-red-500">
                  {errors.company_id || "\u00A0"}
                </p>
              </div>

              <div>
                <label
                  htmlFor="branch"
                  className="!block text-gray-700 text-sm font-bold mb-2"
                >
                  Branch
                </label>
                <select
                  id="branch"
                  className="w-full p-2 text-sm border border-gray-300 rounded-md select"
                  value={formData.branch_id || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      branch_id: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                >
                  <option value="" disabled>
                    Select Branch
                  </option>
                  {branches.length > 0 ? (
                    branches.map((branch) => (
                      <option key={branch.branch_id} value={branch.branch_id}>
                        {branch.branch_name}
                      </option>
                    ))
                  ) : (
                    <option>No Data Available</option>
                  )}
                </select>
                <p className="w-full text-sm text-red-500">
                  {errors.branch_id || "\u00A0"}
                </p>
              </div>
            </div>

            <div className="relative col-span-1">
              <span className="flex items-center justify-between">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-bold text-gray-700"
                >
                  Customer name
                </label>

                <button
                  type="button"
                  className="-mt-6 btn btn-sm btn-primary sm:btn-lg"
                  onClick={handleAddUser}
                >
                  Add Customer
                </button>
              </span>
              <input
                type="text"
                id="username"
                ref={inputRef}
                autoComplete="off"
                value={userSearch || ""}
                onChange={handleSearchChange}
                className="w-full p-2 border border-gray-300 rounded-md input"
                placeholder="Search customer..."
                onFocus={() => {
                  setFocusOn(true);
                  setIsSearchMode(true);
                }}
              />

              {users && isSearchMode && (
                <ul
                  ref={dropdownRef}
                  className="absolute -mt-2 bg-white border z-10 border-gray-300 rounded-md p-2 w-full text-sm max-h-[400px] overflow-y-auto"
                >
                  {users.length > 0 ? (
                    users.map((user: any) => (
                      <li
                        key={user.user_id}
                        className="p-2 rounded cursor-pointer hover:bg-gray-200"
                        onClick={() => handleUserClick(user)}
                      >
                        {user.first_name} {user.last_name} ({user.mobile_number}
                        )
                      </li>
                    ))
                  ) : (
                    <li className="p-2 text-gray-500">No users found</li>
                  )}
                </ul>
              )}
              <p className="w-full text-sm text-red-500">
                {errors.username || "\u00A0"}
              </p>
            </div>

            <div className="relative col-span-1">
              <span className="flex items-center justify-between">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-bold text-gray-700"
                >
                  Customer address
                </label>

                <button
                  type="button"
                  className="-mt-6 btn btn-sm btn-primary"
                  onClick={handleAddAddress}
                >
                  Add address
                </button>
              </span>

              <select
                id="address"
                value={formData.address_id ?? ""}
                onChange={handleAddressChange}
                className="w-full text-sm border border-gray-300 rounded-md select"
              >
                <option value="" disabled>
                  Select Address
                </option>
                {address.length > 0 && userSearch ? (
                  address.map((addr) => {
                    const {
                      building_number,
                      area,
                      landmark,
                      city,
                      state,
                      country,
                      pincode,
                    } = addr;
                    const parts = [
                      building_number,
                      area,
                      landmark,
                      city,
                      state,
                      country,
                      pincode,
                    ].filter(Boolean);
                    const str = parts.join(", ");

                    return (
                      <option key={addr.address_id} value={addr.address_id}>
                        {str}
                      </option>
                    );
                  })
                ) : (
                  <option disabled>No Address Available</option>
                )}
              </select>
              <p className="w-full text-sm text-red-500">
                {errors.address_id || "\u00A0"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 cs1:!gap-6 gap-4">
            <div className="md:col-span-2">
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-bold text-gray-700"
                >
                  Order Note
                </label>
                <textarea
                  rows={3}
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="w-full h-full p-2 border border-gray-300 rounded-md input"
                />
                <p className="w-full text-sm text-red-500">
                  {errors.description || "\u00A0"}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:!col-span-2">
              <div className="md:!col-span-2 grid sm:!grid-cols-3 cs1:!gap-6 gap-4 grid-cols-1">
                <div className="flex flex-col">
                  <label
                    htmlFor="exp_delivery_time"
                    className="block mb-2 text-sm font-bold text-gray-700"
                  >
                    Express Delivery Time
                  </label>
                  <select
                    className="w-full p-2 text-sm border border-gray-300 rounded-md select"
                    id="exp_delivery_time"
                    value={formData.express_delivery_hour || ""}
                    onChange={(e) =>
                      e.target.value
                        ? setFormData({
                            ...formData,
                            express_delivery_hour: Number(e.target.value),
                            normal_delivery_charges: null,
                          })
                        : setFormData({
                            ...formData,
                            express_delivery_charges: null,
                            express_delivery_hour: null,
                          })
                    }
                  >
                    <option value="">Select Express Delivery Time</option>
                    <option value={24}>24 Hrs</option>
                    <option value={48}>48 Hrs</option>
                    <option value={72}>72 Hrs</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="express_delivery_charges"
                    className="block mb-2 text-sm font-bold text-gray-700"
                  >
                    Express Delivery Charge
                  </label>
                  <input
                    type="text"
                    id="express_delivery_charges"
                    autoComplete="off"
                    min="0"
                    value={formData.express_delivery_charges || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        express_delivery_charges: e.target.value
                          ? Number(e.target.value)
                          : null,
                      })
                    }
                    className={`${
                      formData.normal_delivery_charges > 0
                        ? "input border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed focus:outline-none"
                        : "input border border-gray-300 rounded-md p-2"
                    }`}
                    readOnly={formData.normal_delivery_charges > 0}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="normal_delivery_charges"
                    className="block mb-2 text-sm font-bold text-gray-700"
                  >
                    Normal Delivery Charge
                  </label>
                  <input
                    type="text"
                    id="normal_delivery_charges"
                    min="0"
                    autoComplete="off"
                    value={formData.normal_delivery_charges || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        normal_delivery_charges: e.target.value
                          ? Number(e.target.value)
                          : null,
                      })
                    }
                    className={`${
                      !formData?.express_delivery_charges &&
                      !formData?.express_delivery_hour
                        ? "input border border-gray-300 rounded-md p-2"
                        : "input border border-gray-300 rounded-md p-2 bg-gray-100 !cursor-not-allowed !focus:outline-none"
                    }`}
                    readOnly={
                      !!formData?.express_delivery_charges ||
                      !!formData?.express_delivery_hour
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="payment_method"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                Payment Method
              </label>
              <select
                className="w-full p-2 text-sm border border-gray-300 rounded-md select"
                id="payment_method"
                value={formData.payment_type ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    payment_type: Number(e.target.value),
                  })
                }
              >
                <option value="" disabled>
                  Select Payment Type
                </option>
                <option value={1}>Cash on Delivery</option>
                <option value={2}>Online Payment</option>
              </select>
              <p className="w-full text-sm text-red-500">
                {errors.payment_type || "\u00A0"}
              </p>
            </div>

            <div className="flex flex-col items-start justify-center">
              <label
                htmlFor="have_gst_cb"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                Do you have GSTIN ?
              </label>
              <input
                className="checkbox"
                id="have_gst_cb"
                name="check"
                type="checkbox"
                checked={haveGstIn}
                onChange={(e) => {
                  setHaveGstIn(e.target.checked);
                }}
              />
            </div>

            {haveGstIn && (
              <>
                <div className="flex flex-col">
                  <label
                    htmlFor="gstin"
                    className="block mb-2 text-sm font-bold text-gray-700"
                  >
                    GSTIN
                  </label>
                  <input
                    type="text"
                    id="gstin"
                    autoComplete="off"
                    value={formData.gstin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gstin: e.target.value,
                      })
                    }
                    className="p-2 text-sm text-gray-600 uppercase border border-gray-300 rounded-md input focus:outline-none"
                  />
                  <p className="w-full text-sm text-red-500">
                    {errors.gstin || "\u00A0"}
                  </p>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="gst_company_name"
                    className="block mb-2 text-sm font-bold text-gray-700"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="gst_company_name"
                    autoComplete="off"
                    value={formData.gst_company_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gst_company_name: e.target.value,
                      })
                    }
                    className="p-2 text-sm text-gray-600 border border-gray-300 rounded-md input focus:outline-none"
                  />
                  <p className="w-full text-sm text-red-500">
                    {errors.gst_company_name || "\u00A0"}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className={`btn btn-primary ${
                addingQuickOrder ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={addingQuickOrder}
            >
              {addingQuickOrder ? "Adding..." : "Add Quick Order"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
              disabled={addingQuickOrder}
            >
              Cancel
            </button>
          </div>
        </form>

        <AddressModal
          onAddressAdded={handleAddressSelect}
          isOpen={modalIsOpen}
          setIsSubmit={setIsSubmit}
          onClose={() => setModalIsOpen(false)}
          userId={formData.user_id}
          fullname={formData.username}
        />
        <CustomerModal
          onCustomerCreated={handleCustomerSelect}
          isOpen={userModalIsOpen}
          setIsSubmit={setIsSubmit}
          onClose={() => setUserModalIsOpen(false)}
        />
      </div>
    </div>
  );
};

export default OrderForm;
