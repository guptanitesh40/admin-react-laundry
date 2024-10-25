import { useState } from "react";
import toast from "react-hot-toast";

interface Branch {
  branch_id: number;
  branch_name: string;
  branch_address: string;
  branch_phone_number: string;
  branch_email: string;
  branch_registration_number: string;
  company_id: number;
  branch_manager_id: string;
}

const useGetBranchesOnId = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [branches, setBranches] = useState<Branch | any>(null);

  const fetchBranchesOnId = async (company_id: number) => {
    if (!company_id) {
      setBranches(null);
      return;
    }

    const token = localStorage.getItem("authToken");
    const GET_BRANCHES_URL = `${import.meta.env.VITE_BASE_URL}/branches/company/${company_id}`;

    setLoading(true);

    try {
      const response = await fetch(GET_BRANCHES_URL, {
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
      setBranches(data?.data);
    } catch (error) {
      toast.error("Network error: Failed to fetch.");
    } finally {
      setLoading(false);
    }
  };

  return { branches, loading, fetchBranchesOnId };
};

export default useGetBranchesOnId;
