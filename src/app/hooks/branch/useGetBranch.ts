import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

const GET_BRANCH_URL = `${import.meta.env.VITE_BASE_URL}/branches`;
const token = localStorage.getItem("authToken");

const useGetBranch = (pageNumber = 1, perPage = 10) => {
  const [branches, setBranches] = useState<any[]>([]);
  const [totalBranches, setTotalBranches] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchBranches = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${GET_BRANCH_URL}?page_number=${pageNumber}&per_page=${perPage}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
  }, [pageNumber, perPage]);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  return { branches, totalBranches, loading, refetch: fetchBranches };
};

export default useGetBranch;
