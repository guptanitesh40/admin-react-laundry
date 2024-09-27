import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

const GET_BRANCH_URL = `${import.meta.env.VITE_BASE_URL}/branches`;

const useGetBranch = (
  pageNumber: number = 1, 
  perPage: number = 10,
  search: string = '', 
  sortColumn?: string, 
  sortOrder?: string
) => {
  const [branches, setBranches] = useState<any[]>([]);
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

    const url = `${GET_BRANCH_URL}?${queryParams}`;

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
      const allBranches = data?.data?.result || [];
      const totalCount = data?.data?.count || 0;

      setBranches(allBranches);
      setTotalBranches(totalCount);
    } catch (error: any) {
      toast.error(error?.message || 'Network error: Failed to fetch.', {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }, [pageNumber, perPage, sortOrder,sortColumn, search]);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  return { branches, totalBranches, loading,fetchBranches };
};

export default useGetBranch;
