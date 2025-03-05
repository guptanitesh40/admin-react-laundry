import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";
import { login, logout } from "../../utils/authSlice";
import { addUser, removeUser } from "../../utils/userSlice";
import useGetUserPermissions from "./useGetUserPermissions";

const useValidateToken = () => {
  const dispatch = useDispatch();
  const storedToken = localStorage.getItem("authToken");
  const [loading, setLoading] = useState(true);
  const { fetchUserPermissions } = useGetUserPermissions();

  const validateToken = async () => {
    if (!storedToken) {
      dispatch(logout());
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/auth/validate-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({ token: storedToken }),
      });

      const data = await response.json();

      if (response.ok) {
        const permissions = await fetchUserPermissions(storedToken);

        dispatch(addUser(data.data.user));

        dispatch(
          login({
            isAuthenticated: true,
            token: data?.data?.token || storedToken,
            permissions,
            role_id: data?.data?.user?.role_id ?? null,
          })
        );
      } else {
        handleLogout();
      }
    } catch (error) {
      toast.error("Oops! Something went wrong. Please log in again.", {
        className: "toast-error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };

  useEffect(() => {
    validateToken();
  }, []);

  return { loading };
};

export default useValidateToken;
