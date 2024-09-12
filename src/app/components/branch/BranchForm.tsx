import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { branchSchema } from "../../validation/branchSchema";
import {
  useAddBranch,
  useUpdateBranch,
  useGetBranch,
  useGetCompany,
} from "../../hooks";

interface FormData {
  branch_name: string;
  branch_address: string;
  branch_manager: string;
  branch_phone_number: string;
  branch_email: string;
  branch_registration_number: string;
  company_id: string | null;
}

const BranchForm: React.FC = () => {
  const { addBranch, loading: adding } = useAddBranch();
  const { updateBranch, loading: updating } = useUpdateBranch();
  const { id } = useParams<{ id: string }>();
  const { branches, refetch } = useGetBranch();
  const { companies, refetch: fetchCompany } = useGetCompany();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    branch_name: "",
    branch_address: "",
    branch_manager: "",
    branch_phone_number: "",
    branch_email: "",
    branch_registration_number: "",
    company_id: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refetch();
        await fetchCompany();
      } catch (error) {
        toast.error("Failed to fetch branch or company data.");
      }
    };

    fetchData();
  }, [refetch, fetchCompany]);

  useEffect(() => {
    if (branches.length > 0 && id) {
      const branch = branches.find((b) => b.branch_id === parseInt(id));
      if (branch) {
        setFormData({
          branch_name: branch.branch_name || "",
          branch_address: branch.branch_address || "",
          branch_manager: branch.branch_manager || "",
          branch_phone_number: branch.branch_phone_number || "",
          branch_email: branch.branch_email || "",
          branch_registration_number: branch.branch_registration_number || "",
          company_id: branch.company_id || null,
        });
        setIsEditMode(true);
      }
    }
  }, [branches, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDropdownChange = (id: number, name: string) => {
    setFormData((prev) => ({
      ...prev,
      company_id: String(id),
    }));
    setSelectedCompanyName(name);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await branchSchema.validate(formData, { abortEarly: false });
      if (isEditMode && id) {
        const success = await updateBranch(id, formData);
        if (success) {
          setFormData({
            branch_name: "",
            branch_address: "",
            branch_manager: "",
            branch_phone_number: "",
            branch_email: "",
            branch_registration_number: "",
            company_id: null,
          });
          navigate("/branches");
        }
      } else {
        const success = await addBranch(formData);
        if (success) {
          navigate("/branches");
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

  const handleCancel = () => {
    navigate("/branches");
  };
  return (
    <div className="card max-w-4xl mx-auto p-6 bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? "Edit Branch" : "Add Branch"}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold" htmlFor="branch_name">
              Branch Name
            </label>
            <input
              type="text"
              id="branch_name"
              name="branch_name"
              value={formData.branch_name}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">
              {errors.branch_name || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold" htmlFor="branch_address">
              Branch Address
            </label>
            <input
              type="text"
              id="branch_address"
              name="branch_address"
              value={formData.branch_address}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">
              {errors.branch_address || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold" htmlFor="branch_manager">
              Branch Manager
            </label>
            <input
              type="text"
              id="branch_manager"
              name="branch_manager"
              value={formData.branch_manager}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">
              {errors.branch_manager || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold" htmlFor="branch_phone_number">
              Branch Phone Number
            </label>
            <input
              type="text"
              id="branch_phone_number"
              name="branch_phone_number"
              value={formData.branch_phone_number}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">
              {errors.branch_phone_number || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold" htmlFor="branch_email">
              Branch Email
            </label>
            <input
              type="email"
              id="branch_email"
              name="branch_email"
              value={formData.branch_email}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">
              {errors.branch_email || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label
              className="mb-2 font-semibold"
              htmlFor="branch_registration_number"
            >
              Branch Registration Number
            </label>
            <input
              type="text"
              id="branch_registration_number"
              name="branch_registration_number"
              value={formData.branch_registration_number}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">
              {errors.branch_registration_number || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col relative">
            <label className="mb-2 font-semibold" htmlFor="company_id">
              {isEditMode ? "Company ID" : "Company"}
            </label>

            {isEditMode ? (
              <input
                type="text"
                id="company_id"
                name="company_id"
                value={formData.company_id || ""}
                onChange={(e) =>
                  setFormData({ ...formData, company_id: e.target.value })
                }
                className="bg-gray-200 border border-gray-300 rounded-md px-4 py-2 text-gray-700 w-full"
                disabled
              />
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-gray-200 border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-300 w-full text-left flex justify-between items-center"
                >
                  <span>
                    {companies.find(
                      (company) =>
                        company.company_id === Number(formData.company_id)
                    )?.company_name || "Select Company"}
                  </span>
                  <span className="ml-2">&#9662;</span>
                </button>

                {isDropdownOpen && (
                  <ul className="dropdown-menu scrollable-menu absolute z-10 mt-[73px] w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {companies.map((company) => (
                      <li
                        key={company.company_id}
                        className={`cursor-pointer hover:bg-gray-100 ${
                          company.company_id === Number(formData.company_id)
                            ? "bg-gray-200"
                            : ""
                        }`}
                        onClick={() =>
                          handleDropdownChange(
                            company.company_id,
                            company.company_name
                          )
                        }
                      >
                        <div className="block px-4 py-2 text-sm">
                          {company.company_name}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}

            <p className="text-red-500 text-sm">
              {errors.company_id || "\u00A0"}
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
            ) : isEditMode ? (
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
