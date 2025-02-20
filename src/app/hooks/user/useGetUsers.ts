import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

interface User {
  total_due_amount: number;
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  gender: string;
  role_id: number;
  branch_ids: [];
  company_ids: [];
}

const useGetUsers = (
  pageNumber: number = 1,
  perPage: number = 10,
  search: string = "",
  sortColumn?: string,
  sortOrder?: string,
  genders? : number[],
  roles?: number | number [],
  companies_ids?: number[],
  branches_ids?: number[]
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = async () => {
    const token = localStorage.getItem("authToken");
    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append("page_number", pageNumber.toString());
    if (perPage) queryParams.append("per_page", perPage.toString());
    if (search) queryParams.append("search", search);
    if (sortColumn) queryParams.append("sort_by", sortColumn);
    if (sortOrder) queryParams.append("order", sortOrder);
    if (genders)  {
      genders.forEach((g) => queryParams.append("genders" , g.toString()));
    }
    if(roles !== undefined){
    if (Array.isArray(roles)) {
      roles.forEach((roles: any) => queryParams.append("roles" , roles.toString()));
    } else {
      queryParams.append("roles", roles.toString());
    }
  }
    if (companies_ids) {
      companies_ids.forEach((c) => queryParams.append("company_id", c.toString()));
    }
    if (branches_ids) {
      branches_ids.forEach((b) => queryParams.append("branches_ids", b.toString()));
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/user?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        return;
      }

      setUsers(data?.data?.users || []);
      setCount(data?.data?.count || 0);
    } catch (error: any) {
      toast.error(error?.message || "Network error: Failed to fetch.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [pageNumber, perPage, search, sortColumn, sortOrder, genders, roles, companies_ids, branches_ids]);

  return { users, count, loading, fetchUsers };
};

export default useGetUsers;
