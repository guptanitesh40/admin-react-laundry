import { useState } from "react";
import toast from "react-hot-toast";

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

    const fetchUser = async (user_id: number) => {

      if (!user_id) {
        setUserData(null); 
        return;
      }

      const token = localStorage.getItem("authToken");
      const GET_USER_URL = `${import.meta.env.VITE_BASE_URL}/user/${user_id}`;

      setLoading(true);

      try {
        const response = await fetch(GET_USER_URL, {
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
        setUserData(data?.data);
      } catch (error: any) {
        toast.error(error?.message || "Network error: Failed to fetch.", {
          position: "top-center",
        });
      } finally {
        setLoading(false);
      }
    };

  return { userData, loading, fetchUser };
};

export default useGetUser;
