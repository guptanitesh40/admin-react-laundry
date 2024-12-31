import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const GET_USERS_URL = `${import.meta.env.VITE_BASE_URL}/user`;

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
  roles?: number[],
  companies_ids?: number[],
  branches_ids?: number[]
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = async () => {
    const token = localStorage.getItem("authToken");
    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append("page_number", pageNumber.toString());
    if (perPage) queryParams.append("per_page", perPage.toString());
    if (search) queryParams.append("search", search);
    if (sortColumn) queryParams.append("sortBy", sortColumn);
    if (sortOrder) queryParams.append("order", sortOrder);
    if (genders)  {
      genders. forEach((g) => queryParams.append("genders" , g.toString()));
    }
    if (roles) {
      roles.forEach((r) => queryParams.append("roles", r.toString()));
    }
    if (companies_ids) {
      companies_ids.forEach((c) => queryParams.append("company_id", c.toString()));
    }
    if (branches_ids) {
      branches_ids.forEach((b) => queryParams.append("branches_ids", b.toString()));
    }

    setLoading(true);
    try {
      const response = await fetch(`${GET_USERS_URL}?${queryParams}`, {
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
      setTotalUsers(data?.data?.count || 0);
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

  return { users, totalUsers, loading, fetchUsers };
};

export default useGetUsers;
