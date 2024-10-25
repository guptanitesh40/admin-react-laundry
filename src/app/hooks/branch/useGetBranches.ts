import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

interface Branch {
  branchManager:{
    first_name: string;
    last_name: string;
  };
  branch_name: string;
  branch_id: number;
  branch_address: string;
  branch_manager_id: string;
  branch_phone_number: string;
  branch_email: string;
  branch_registration_number: string;
  company:{
    company_name: string;
  };
  company_id:number;
}

const GET_BRANCH_URL = `${import.meta.env.VITE_BASE_URL}/branches`;

const useGetBranches = (
  pageNumber: number = 1, 
  perPage: number = 10,
  search: string = '', 
  sortColumn?: string, 
  sortOrder?: string
) => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [totalBranches, setTotalBranches] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchBranches = useCallback(async () => {
    const token = localStorage.getItem("authToken");
   
    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append('page_number', pageNumber.toString());
    if (perPage) queryParams.append('per_page', perPage.toString());
    if (search) queryParams.append('search', search);
    if (sortColumn) queryParams.append('sortBy', sortColumn);
    if (sortOrder) queryParams.append('order', sortOrder);

    setLoading(true);
    try {
      const response = await fetch(`${GET_BRANCH_URL}?${queryParams}`, {
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
      const allBranches = data?.data?.result || [];
      const totalCount = data?.data?.count || 0;

      setBranches(allBranches);
      setTotalBranches(totalCount);
    } catch (error) {
      toast.error("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  }, [pageNumber, perPage, sortOrder,sortColumn, search]);

  return { branches, totalBranches, loading, fetchBranches };
};

export default useGetBranches;
