import { useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";

interface Branch {
  branchManager: {
    first_name: string;
    last_name: string;
  };
  branch_name: string;
  branch_id: number;
  branch_address: string;
  branch_manager_id: string;
  branch_phone_number: string;
  branch_mobile_number: string;
  branch_email: string;
  branch_registration_number: string;
  company: {
    company_name: string;
  };
  company_id: number;
}

const useGetBranchesV2 = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBranches = async (company_id: number) => {
    if (!company_id) return;

    setLoading(true);
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${BASE_URL}/branches?company_id=${company_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to fetch branches", {
          position: "top-center",
        });
        return;
      }

      const branchList = data?.data?.result || [];
      setBranches(branchList);
    } catch (err) {
      toast.error("Error fetching branches", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return {
    branches,
    loading,
    fetchBranches,
  };
};

export default useGetBranchesV2;
