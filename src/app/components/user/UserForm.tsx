import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useAddUser,
  useGetBranches,
  useGetCompanies,
  useUpdateUser,
} from "../../hooks";
import * as Yup from "yup";
import { userSchema } from "../../validation/userSchema";
import useGetUser from "../../hooks/user/useGetuser";
import { useNavigate, useParams } from "react-router-dom";
import MultiSelect from "multiselect-react-dropdown";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  mobile_number: string;
  gender: number | null;
  role_id: number | null;
  image: string | File;
  company_ids: any[];
  branch_ids: any[];
} 

const UserForm: React.FC = () => {
  const { addUser, loading: adding } = useAddUser();
  const { updateUser, loading: updating } = useUpdateUser();

  const { id } = useParams<{ id: string }>();
  const user_id = id ? Number(id) : null;
  const perPage = 1000;
  const pageNumber = 1;

  const navigate = useNavigate();

  const { companies, fetchCompanies } = useGetCompanies(pageNumber, perPage);
  const { user, fetchUser } = useGetUser();
  const [companyOptions, setCompanyOptions] = useState([]);
  const { branches, fetchBranches } = useGetBranches(pageNumber, perPage);
  const [branchOptions, setBranchOptions] = useState([]);

  const formDataState: FormData = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    mobile_number: "",
    gender: null,
    role_id: null,
    image: "" as string | File,
    company_ids: [],
    branch_ids: [],
  };

  const [formData, setFormData] = useState(formDataState);
  const [initialFormData, setInitialFormData] = useState(formDataState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      await fetchUser(user_id);
      await fetchCompanies();
      await fetchBranches();
    };
    fetchData();
  }, [user_id]);

  useEffect(() => {
    if (companies) {
      const companyData = companies.map((company) => ({
        company_id: company.company_id,
        company_name: company.company_name,
      }));
      setCompanyOptions(companyData);
    }
  }, [companies]);

  useEffect(() => {
    if (branches) {
      const branchData = branches.map((branch) => ({
        branch_id: branch.branch_id,
        branch_name: branch.branch_name,
      }));
      setBranchOptions(branchData);
    }
  }, [branches]);

  useEffect(() => {
    if (user) {
      const fetchedData = {
        ...formData,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: "",
        mobile_number: user.mobile_number,
        gender: user.gender,
        role_id: user.role_id,
        branch_ids: user.branch_ids,
        company_ids: user.company_ids,
      };
      setFormData(fetchedData);
      setInitialFormData(fetchedData);
    } else {
      setFormData(formDataState);
      setInitialFormData(formDataState);
      setErrors({});
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: files[0].name,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const schema = userSchema(!!user_id);
      await schema.validate(formData, {
        abortEarly: false,
      });

      const isDataChanged = () => {
        return (Object.keys(formData) as (keyof typeof formData)[]).some(
          (key) => {
            if (key === "image") {
              return (
                formData.image instanceof File ||
                formData.image !== initialFormData.image
              );
            }
            return formData[key] !== initialFormData[key];
          }
        );
      };

      if (!isDataChanged()) {
        navigate("/user");
        return;
      }

      let success;
      if (user_id) {
        const formDataToSend = new FormData();
        (Object.keys(formData) as (keyof typeof formData)[]).forEach(
          (key) => {
            if (key === "image" && formData.image instanceof File) {
              formDataToSend.append(key, formData.image);
            } else {
              formDataToSend.append(key, formData[key] as string | Blob);
            }
          }
        );
        success = await updateUser(user_id, formData);
      } else {
        success = await addUser(formData);
      }

      if (success) {
        navigate("/user");
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
    navigate("/user");
  };

  return (
    <div className="card max-w-4xl mx-auto p-6 bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-6">
        {user_id ? "Edit user detail" : "Add user"}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="first_name" className="mb-2 font-semibold">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name || ""}
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
            <label htmlFor="last_name" className="mb-2 font-semibold">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name || ""}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">
              {errors.last_name || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-semibold">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">{errors.email || "\u00A0"}</p>
          </div>

          <div className="flex flex-col">
            <label htmlFor="mobile_number" className="mb-2 font-semibold">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile_number"
              name="mobile_number"
              value={formData.mobile_number || ""}
              onChange={(e) =>
                setFormData({ ...formData, mobile_number: e.target.value })
              }
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">
              {errors.mobile_number || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password || ""}
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
              className="select border border-gray-300 rounded-md p-2 w-full text-sm"
              value={formData.role_id === null ? "" : formData.role_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role_id: e.target.value ? parseInt(e.target.value) : null,
                })
              }
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value={2}>Sub Admin</option>
              <option value={3}>Branch Manager</option>
              <option value={4}>Delivery Boy</option>
              <option value={5}>Customer</option>
              <option value={6}>Workshop Manager</option>
              <option value={7}>Vendor</option>
            </select>
            <p className="text-red-500 text-sm">{errors.role_id || "\u00A0"}</p>
          </div>

          {formData.role_id === 2 && (
            <div className="flex flex-col">
              <label className="mb-2 font-semibold" htmlFor="role_id">
                Company
              </label>
              <MultiSelect
                options={companyOptions}
                displayValue="company_name"
                selectedValues={companyOptions.filter((option) =>
                  formData.company_ids.includes(option.company_id)
                )}
                onSelect={(selectedList) => {
                  setFormData({
                    ...formData,
                    company_ids: selectedList.map(
                      (company: { company_id: any }) => company.company_id
                    ),
                  });
                }}
                onRemove={(selectedList) => {
                  setFormData({
                    ...formData,
                    company_ids: selectedList.map(
                      (company: { company_id: any }) => company.company_id
                    ),
                  });
                }}
                isObject={true}
              />
              <p className="text-red-500 text-sm">
                {errors.company_ids || "\u00A0"}
              </p>
            </div>
          )}

          {formData.role_id === 3 && (
            <div className="flex flex-col">
              <label className="mb-2 font-semibold" htmlFor="role_id">
                Branch
              </label>
              <MultiSelect
                options={branchOptions}
                displayValue="branch_name"
                selectedValues={branchOptions.filter((option) =>
                  formData.branch_ids.includes(option.branch_id)
                )}
                onSelect={(selectedList) => {
                  setFormData({
                    ...formData,
                    branch_ids: selectedList.map(
                      (branch: { branch_id: any }) => branch.branch_id
                    ),
                  });
                }}
                onRemove={(selectedList) => {
                  setFormData({
                    ...formData,
                    branch_ids: selectedList.map(
                      (branch: { branch_id: any }) => branch.branch_id
                    ),
                  });
                }}
                isObject={true}
              />
              <p className="text-red-500 text-sm">
                {errors.branch_ids || "\u00A0"}
              </p>
            </div>
          )}

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Gender</label>
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
            <p className="text-red-500 text-sm">{errors.gender || "\u00A0"}</p>
          </div>

          {user_id && (
            <div className="flex flex-col">
              <label htmlFor="image" className="mb-2 font-semibold">
                Profile Photo
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="input border border-gray-300 rounded-md p-2"
              />
              <p className="text-red-500 text-sm">{errors.image || "\u00A0"}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-4">
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

export default UserForm;