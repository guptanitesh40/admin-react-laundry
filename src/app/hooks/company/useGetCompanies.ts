import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const GET_COMPANY_URL = `${import.meta.env.VITE_BASE_URL}/companies`;

interface Company {
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
  company_ownedby: string;
  contract_document: FileList | null;
}

const useGetCompany = (
  pageNumber: number = 1,
  perPage: number = 10,
  search: string = "",
  sortColumn?: string,
  sortOrder?: string,
  companies_ownedby?: number
) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchCompanies = async () => {
    const token = localStorage.getItem("authToken");
    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append("page_number", pageNumber.toString());
    if (perPage) queryParams.append("per_page", perPage.toString());
    if (search) queryParams.append("search", search);
    if (sortColumn) queryParams.append("sort_by", sortColumn);
    if (sortOrder) queryParams.append("order", sortOrder);
    if (companies_ownedby)
      queryParams.append("companies_ownedby", companies_ownedby.toString());

    setLoading(true);
    try {
      const response = await fetch(`${GET_COMPANY_URL}?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        return;
      }

      setCompanies(data?.data?.result || []);
      setTotalCount(data?.data?.count || 0);
    } catch (error) {
      toast.error("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [pageNumber, perPage, search, sortColumn, sortOrder, companies_ownedby]);

  return { companies, loading, totalCount, fetchCompanies };
};

export default useGetCompany;
