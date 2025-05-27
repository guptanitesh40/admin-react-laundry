import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

interface User {
  total_pending_amount: number;
  user: any;
  orders: any;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  password: string;
  gender: number;
  role_id: number;
  image: string;
  branch_ids: [];
  company_ids: [];
}

const useGetUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [count, setCount] = useState<number>(0);

  const fetchUser = async (
    user_id: number,
    pageNumber: number = 1,
    perPage: number = 100
  ) => {
    if (!user_id) {
      setUserData(null);
      return;
    }

    const token = localStorage.getItem("authToken");
    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append("page_number", pageNumber.toString());
    if (perPage) queryParams.append("per_page", perPage.toString());

    setLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/user/${user_id}?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, { position: "top-center" });
        setLoading(false);
        return;
      }

      const data = await response.json();

      setUserData(data?.data);
      setCount(data?.data?.count);
      return data?.data?.user?.orders;
    } catch (error: any) {
      toast.error(error?.message || "Network error: Failed to fetch.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return { userData, loading, count, fetchUser };
};

export default useGetUser;
