import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const GET_COMPANY_URL = `${import.meta.env.VITE_BASE_URL}/companies`;
const token = localStorage.getItem("authToken");

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
  logo: string;
  registration_number: string;
  registration_date: string;
  gstin: string;
  company_ownedby: string;
  contract_document: null;
}

const useGetCompany = (
  pageNumber: number = 1,
  perPage: number = 10,
  search: string = '',
  sortColumn?: string,
  sortOrder?: string
) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchCompanies = useCallback(async () => {
    const token = localStorage.getItem("authToken");

    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append("page_number", pageNumber.toString());
    if (perPage) queryParams.append("per_page", perPage.toString());
    if (search) queryParams.append("search", search);
    if (sortColumn) queryParams.append("sort_by", sortColumn);
    if (sortOrder) queryParams.append("order", sortOrder);

    const url = `${GET_COMPANY_URL}?${queryParams}`;

    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, {
          position: "top-center",
        });
        return;
      }

      const data = await response.json();
      const allCompany = data?.data?.result || [];
      const totalCount = data?.data?.count || 0;

      setCompanies(allCompany);
      setTotalCount(totalCount);
    } catch (error: any) {
      toast.error(error?.message || "An error occurred while fetching data", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }, [pageNumber, perPage, sortOrder, sortColumn, search]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return { companies, loading, totalCount, fetchCompanies };
};

export default useGetCompany;
