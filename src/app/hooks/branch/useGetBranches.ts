import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

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

const useGetBranches = (
  pageNumber: number = 1,
  perPage: number = 10,
  search: string = "",
  sortColumn?: string,
  sortOrder?: string,
  company_id?: number[],
  branch_manager_ids?: number[]
) => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchBranches = async () => {
    const token = localStorage.getItem("authToken");
    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append("page_number", pageNumber.toString());
    if (perPage) queryParams.append("per_page", perPage.toString());
    if (search) queryParams.append("search", search);
    if (sortColumn) queryParams.append("sort_by", sortColumn);
    if (sortOrder) queryParams.append("order", sortOrder);
    if (company_id) {
      company_id.forEach((c) => queryParams.append("company_id", c.toString()));
    }
    if (branch_manager_ids) {
      branch_manager_ids.forEach((b) =>
        queryParams.append("branch_manager_ids", b.toString())
      );
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/branches?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      // console.log("Branches Data : ", data.data.result);

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        return;
      }

      setBranches(data?.data?.result || []);
      setCount(data?.data?.count || 0);
    } catch (error) {
      toast.error("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, [
    pageNumber,
    perPage,
    search,
    sortColumn,
    sortOrder,
    company_id,
    branch_manager_ids,
  ]);

  return { branches, count, loading, fetchBranches };
};

export default useGetBranches;
