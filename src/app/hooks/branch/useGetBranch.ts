import { useState } from "react";
import toast from "react-hot-toast";

interface Branch {
  branchManager: {
    first_name: string;
    last_name: string;
  };
  branch_name: string;
  branch_id: number;
  branch_address: string;
  branch_manager_id: number;
  branch_phone_number: string;
  branch_mobile_number: string;
  branch_email: string;
  branch_registration_number: string;
  company: {
    company_name: string;
  };
  company_id: number;
}

const useGetBranch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [branch, setBranch] = useState<Branch | null>(null);

    const fetchBranch = async (branch_id: number) => {
    if (!branch_id) {
      setBranch(null);
      return;
    }

    const token = localStorage.getItem("authToken");
    const GET_BRANCH_URL = `${import.meta.env.VITE_BASE_URL}/branches/${branch_id}`;

    setLoading(true);

    try {
      const response = await fetch(GET_BRANCH_URL, {
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
      setBranch(data?.data?.result);
    } catch (error) {
      toast.error("Network error: Failed to fetch.");
    } finally {
      setLoading(false);
    }
  };

  return { branch, loading, fetchBranch };
};

export default useGetBranch;
