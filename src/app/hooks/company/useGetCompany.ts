import { useState } from "react";
import toast from "react-hot-toast";

interface Company {
  gst_number: string;
  email: string;
  company_id: number;
  company_name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  company_owner_name: string;
  phone_number: string;
  mobile_number: string;
  mailto: string;
  website: string;
  logo: null;
  registration_number: string;
  registration_date: string;
  gstin: string;
  company_ownedby: number;
  contract_document: FileList | null;
  gst_percentage: number | null;
  hsn_sac_code: string | null;
  msme_number: string;
  signature_image: null;
}

const useGetCompany = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [company, setCompany] = useState<Company | null>(null);

  const fetchCompany = async (company_id: number) => {
    if (!company_id) {
      setCompany(null);
      return;
    }

    const token = localStorage.getItem("authToken");
    const GET_COMPANY_URL = `${
      import.meta.env.VITE_BASE_URL
    }/companies/${company_id}`;

    setLoading(true);

    try {
      const response = await fetch(GET_COMPANY_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, { position: "top-center" });
        setLoading(false);
        return;
      }

      const data = await response.json();
      setCompany(data?.data?.result);
    } catch (error) {
      toast.error("Network error: Failed to fetch.");
    } finally {
      setLoading(false);
    }
  };

  return { company, loading, fetchCompany };
};

export default useGetCompany;
