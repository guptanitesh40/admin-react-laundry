import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";
import { login } from "../../utils/authSlice";
import { addUser } from "../../utils/userSlice";
import useGetUserPermissions from "./useGetUserPermissions";

const useValidateToken = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const [loading, setLoading] = useState(true);
  const { fetchUserPermissions } = useGetUserPermissions();

  const validateToken = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/auth/validate-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (data?.data?.user) {
        const permissions = await fetchUserPermissions();

        dispatch(
          login({
            isAuthenticated: true,
            token: data?.data?.token,
            permissions: permissions,
            role_id: data?.data?.user?.role_id,
          })
        );
        dispatch(addUser(data.data.user));
      } else {
        toast.error("Failed to fetch login user details");
        localStorage.removeItem("authToken"); 
      }
    } catch (error) {
      toast.error("Invalid or expired token");
      localStorage.removeItem("authToken");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) validateToken();
  }, []);

  return { loading };
};

export default useValidateToken;
