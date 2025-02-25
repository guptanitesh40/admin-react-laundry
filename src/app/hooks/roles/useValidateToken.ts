import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";
import { login } from "../../utils/authSlice";
import { addUser } from "../../utils/userSlice";

const useValidateToken = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const [loading, setLoading] = useState(true);

  const validateToken = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/auth/validate-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({token})
      });

      const data = await response.json();

      if (response.ok && data.success) {
        dispatch(login({ 
          token: data.data.token, 
          permissions: data.data.permissions, 
          role: data.data.user.role 
        }));
        dispatch(addUser(data.data.user));
      } else {
        throw new Error(data.message || "Invalid token");
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
