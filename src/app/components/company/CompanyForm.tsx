import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAddCompany, useGetCompany, useUpdateCompany } from "../../hooks";
import toast from "react-hot-toast";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import * as Yup from "yup";
import { companySchema } from "../../validation/companySchema";

const CompanyForm: React.FC = () => {
  const { addCompany, loading: adding } = useAddCompany();
  const { updateCompany, loading: updating } = useUpdateCompany();

  const { id } = useParams<{ id: string }>();
  const company_id = Number(id);

  const { company, fetchCompany } = useGetCompany();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company_name: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    company_owner_name: "",
    phone_number: "",
    mobile_number: "",
    email: "",
    website: "",
    logo: "" as string | File,
    registration_number: "",
    registration_date: "",
    gstin: "",
    company_ownedby: null,
    contract_document: null,
  });

  const [initialFormData, setInitialFormData] = useState({
    company_name: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    company_owner_name: "",
    phone_number: "",
    mobile_number: "",
    email: "",
    website: "",
    logo: "" as string | File,
    registration_number: "",
    registration_date: "",
    gstin: "",
    company_ownedby: null,
    contract_document: null,
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    const fetchCompanyData = async () => {
      await fetchCompany(company_id);
    };
    fetchCompanyData();
  }, [company_id]);

  useEffect(() => {
    if (company) {
      const fetchedData = {
        company_name: company.company_name,
        address: company.address,
        city: company.city,
        state: company.state,
        zip_code: company.zip_code,
        company_owner_name: company.company_owner_name,
        phone_number: company.phone_number,
        mobile_number: company.mobile_number,
        email: company.email,
        website: company.website,
        logo: company.logo,
        registration_number: company.registration_number,
        registration_date: company.registration_date,
        gstin: company.gstin,
        company_ownedby: company.company_ownedby,
        contract_document: company.contract_document,
      };

      setFormData(fetchedData);
      setInitialFormData(fetchedData);
    }
  }, [company]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files : value,
    }));
  };

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    setFormData((prev) => ({
      ...prev,
      registration_date: newValue ? newValue.format("MM-DD-YYYY") : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const schema = companySchema(!!company_id);
      await schema.validate(formData, { abortEarly: false });

      const isDataChanged = () => {
        return (Object.keys(formData) as (keyof typeof formData)[]).some(
          (key) => {
            if (key === "logo") {
              return (
                formData.logo instanceof File ||
                formData.logo !== initialFormData.logo
              );
            }
            return formData[key] !== initialFormData[key];
          }
        );
      };

      if (!isDataChanged()) {
        navigate("/branches");
        return;
      }

      let success;
      if (company_id) {
        success = await updateCompany(company_id, formData);
      } else {
        success = await addCompany(formData);
      }
      if (success) {
        navigate("/companies");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const formErrors: any = {};
        error.inner.forEach((err) => {
          formErrors[err.path] = err.message;
        });
        setErrors(formErrors);
      } else {
        toast.error("Failed to submit the form. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    navigate("/companies");
  };


  return (
    <div className="card max-w-4xl mx-auto p-6 bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-6">
        {company_id ? "Edit Company" : "Add Company"}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold" htmlFor="company_name">
              Company name
            </label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">
              {errors.company_name || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">{errors.address || "\u00A0"}</p>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold" htmlFor="city">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">{errors.city || "\u00A0"}</p>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold" htmlFor="state">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">{errors.state || "\u00A0"}</p>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold" htmlFor="zip_code">
              Zip code
            </label>
            <input
              type="text"
              id="zip_code"
              name="zip_code"
              value={formData.zip_code}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">
              {errors.zip_code || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold" htmlFor="company_owner_name">
              Company owner name
            </label>
            <input
              type="text"
              id="company_owner_name"
              name="company_owner_name"
              value={formData.company_owner_name}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">
              {errors.company_owner_name || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold" htmlFor="phone_number">
              Phone number 1
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">
              {errors.phone_number || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold" htmlFor="mobile_number">
             Phone number 2
            </label>
            <input
              type="text"
              id="mobile_number"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">
              {errors.mobile_number || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">{errors.email || "\u00A0"}</p>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold" htmlFor="website">
              Website
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">{errors.website || "\u00A0"}</p>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold" htmlFor="image">
              Logo
            </label>
            <input
              type="file"
              id="image"
              name="image" 
              accept="image/*"
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">{errors.logo || "\u00A0"}</p>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold" htmlFor="registration_number">
              Registration Number
            </label>
            <input
              type="text"
              id="registration_number"
              name="registration_number"
              value={formData.registration_number}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">
              {errors.registration_number || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold" htmlFor="registration_date">
              Registration Date
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={
                  formData.registration_date
                    ? dayjs(formData.registration_date)
                    : null
                }
                onChange={handleDateChange}
                format="DD-MM-YYYY"
                renderInput={(params) => (
                  <input
                    {...params}
                    id="registration_date"
                    name="registration_date"
                    className="input border border-gray-300 rounded-md p-2"
                  />
                )}
              />
            </LocalizationProvider>
            <p className="text-red-500 text-sm">
              {errors.registration_date || "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold" htmlFor="gstin">
              GSTIN
            </label>
            <input
              type="text"
              id="gstin"
              name="gstin"
              value={formData.gstin}
              onChange={handleChange}
              className="input border border-gray-300 rounded-md p-2"
            />
            <p className="text-red-500 text-sm">{errors.gstin || "\u00A0"}</p>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold" htmlFor="company_ownedby">
              Company owned by
            </label>
            <select
              className="select border border-gray-300 rounded-md p-2 w-full text-sm"
              id="company_ownedby"
              value={formData.company_ownedby ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  company_ownedby: Number(e.target.value),
                })
              }
            >
              <option value="" disabled>
                Select Ownership
              </option>
              <option value={1}>Own</option>
              <option value={2}>Other Company</option>
            </select>
            <p className="w-full text-red-500 text-sm">
              {errors.company_ownedby || "\u00A0"}
            </p>
          </div>

          {formData.company_ownedby === 2 && (
            <div className="flex flex-col">
              <label className="block text-gray-700 font-semibold" htmlFor="contract_document">
                Contract Document
              </label>
              <input
                type="file"
                id="contract_document"
                name="contract_document"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2"
              />
              <p className="text-red-500 text-sm">
                {errors.contract_document || "\u00A0"}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-start mt-6">
          <button
            type="submit"
            className="btn btn-primary mr-4"
            disabled={adding || updating}
          >
            {company_id ? "Update Company" : "Add Company"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;
