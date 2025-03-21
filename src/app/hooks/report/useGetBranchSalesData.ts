import { useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";

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

  const fetchBranchSalesData = async (start_date?: string, end_date?: string, branch_id?: number) => {
    const token = localStorage.getItem("authToken");
    const queryParams = new URLSearchParams();

    if (start_date) queryParams.append("startDate", start_date);
    if (end_date) queryParams.append("endDate", end_date);
    if (branch_id) queryParams.append("branch_id", branch_id.toString());

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/report/branch-wise-sales-collections?${queryParams}`,
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
