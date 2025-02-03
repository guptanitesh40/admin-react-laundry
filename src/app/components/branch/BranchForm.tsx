import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { branchSchema } from "../../validation/branchSchema";
import {
  useAddBranch,
  useUpdateBranch,
  useGetBranch,
  useGetCompanies,
} from "../../hooks";
import useGetUsersByRole from "../../hooks/user/useGetUsersByRole";

interface FormData {
  branch_name: string;
  branch_address: string;
  branch_manager_id: number;
  branch_phone_number: string;
  branch_email: string;
  branch_registration_number: string;
  company_id: number;
}

const BranchForm: React.FC = () => {
  const { addBranch, loading: adding } = useAddBranch();
  const { updateBranch, loading: updating } = useUpdateBranch();

  const { id } = useParams<{ id: string }>();
  const branch_id = Number(id);
  const perPage = 1000;
  const pageNumber = 1;

  const { branch, fetchBranch } = useGetBranch();
  const { companies } = useGetCompanies(pageNumber, perPage);
  const { users, fetchUsersByRole } = useGetUsersByRole();

  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    branch_name: "",
    branch_address: "",
    branch_manager_id: null,
    branch_phone_number: "",
    branch_email: "",
    branch_registration_number: "",
    company_id: null,
  });

  const [initialFormData, setInitialFormData] = useState({
    branch_name: "",
    branch_address: "",
    branch_manager_id: null,
    branch_phone_number: "",
    branch_email: "",
    branch_registration_number: "",
    company_id: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      await fetchBranch(branch_id);
      await fetchUsersByRole(3);
    };
    fetchData();
  }, [branch_id]);

  useEffect(() => {
    if (branch) {
      const fetchedData = {
        branch_name: branch.branch_name,
        branch_address: branch.branch_address,
        branch_manager_id: branch.branch_manager_id,
        branch_phone_number: branch.branch_phone_number,
        branch_email: branch.branch_email,
        branch_registration_number: branch.branch_registration_number,
        company_id: branch.company_id,
      };

      setFormData(fetchedData);
      setInitialFormData(fetchedData);
    }
  }, [branch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await branchSchema.validate(formData, { abortEarly: false });

      const isDataChanged = () => {
        return (Object.keys(formData) as (keyof typeof formData)[]).some(
          (key) => {
            return formData[key] !== initialFormData[key];
          }
        );
      };

      if (!isDataChanged()) {
        navigate("/branches");
        return;
      }

      let success;
      if (branch_id) {
        success = await updateBranch(id, formData);
      } else {
        success = await addBranch(formData);
      }
      if (success) {
        navigate("/branches");
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

  const handleCancel = () => {
    navigate("/branches");
  };

  return (
    <div className="card max-w-4xl mx-auto p-6 bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-6">
        {branch_id ? "Edit Branch" : "Add Branch"}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold" htmlFor="company_id">
              Company
            </label>
            <select
              id="company_id"
              className="select border border-gray-300 rounded-md p-2 w-full text-sm"
              value={formData.company_id || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  company_id: e.target.value ? Number(e.target.value) : null,
                })
              }
            >
              <option value="" disabled>
                Select Company
              </option>
              {companies.length > 0 ? (
                companies.map((company) => (
                  <option key={company.company_id} value={company.company_id}>
                    {company.company_name}
                  </option>
                ))
              ) : (
              <option>No Data available</option>
              )}
            </select>
            <p className="text-red-500 text-sm">
              {errors.company_id || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold" htmlFor="branch_manager_id">
              Branch Manager
            </label>
            <select
              id="branch_manager_id"
              className="select border border-gray-300 rounded-md p-2 w-full text-sm"
              value={formData.branch_manager_id || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  branch_manager_id: e.target.value
                    ? Number(e.target.value)
                    : null,
                })
              }
            >
              <option value="" disabled>
                Select Branch Manager
              </option>
              {users ? (
                users.map((user: any) => (
                  <option key={user.user_id} value={user.user_id}>
                    {user.first_name} {user.last_name}
                  </option>
                ))
              ) : (
                <option>No Data available</option>
              )}
            </select>
            <p className="text-red-500 text-sm">
              {errors.branch_manager_id || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold" htmlFor="branch_name">
              Branch Name
            </label>
            <input
              type="text"
              id="branch_name"
              name="branch_name"
              value={formData.branch_name || ""}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">
              {errors.branch_name || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold" htmlFor="branch_address">
              Branch Address
            </label>
            <input
              type="text"
              id="branch_address"
              name="branch_address"
              value={formData.branch_address || ""}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">
              {errors.branch_address || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold" htmlFor="branch_phone_number">
              Branch Phone Number
            </label>
            <input
              type="text"
              id="branch_phone_number"
              name="branch_phone_number"
              value={formData.branch_phone_number || ""}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">
              {errors.branch_phone_number || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold" htmlFor="branch_email">
              Branch Email
            </label>
            <input
              type="text"
              id="branch_email"
              name="branch_email"
              value={formData.branch_email || ""}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">
              {errors.branch_email || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label
              className="block text-gray-700 font-semibold"
              htmlFor="branch_registration_number"
            >
              Branch Registration Number
            </label>
            <input
              type="text"
              id="branch_registration_number"
              name="branch_registration_number"
              value={formData.branch_registration_number || ""}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">
              {errors.branch_registration_number || "\u00A0"}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className={`btn btn-primary mt-5 ${
              adding || updating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={adding || updating}
          >
            {adding || updating ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="ml-2">Saving...</span>
              </>
            ) : branch_id ? (
              "Update Branch"
            ) : (
              "Add Branch"
            )}
          </button>
          <button
            type="button"
            className="mx-5 btn btn-light mt-5"
            onClick={handleCancel}
            disabled={adding || updating}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BranchForm;
