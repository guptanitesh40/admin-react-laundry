import { useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";
const token = localStorage.getItem("authToken");

interface BranchSalesData {
  branch_id: number;
  branch_name: string;
  total_sales: number;
  unpaid_amount: number;
  total_collection: number;
  month: string;
}

const useGetBranchSalesData = () => {
  const [branchSalesData, setBranchSalesData] = useState<BranchSalesData[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBranchSalesData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/branch-wise-sales-collections`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        setLoading(false);
        return;
      }

      setBranchSalesData(data);
    } catch {
      toast.error("Network error: Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return { branchSalesData, loading, fetchBranchSalesData }
};

export default useGetBranchSalesData;
