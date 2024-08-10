import { useState, useCallback } from "react";
import toast from "react-hot-toast";

const useSignin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const Signin = useCallback(async (username, password, roleId) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://3.109.181.159:3000/auth/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role_id: roleId }), // Use role_id here
      });

      if (!res.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await res.json();

      localStorage.setItem("authToken", data.token);

      toast.success("Login successful!");
      return true; 
    } catch (error) {
      toast.error(error.message);
      return false; 
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, Signin, error };
};

export default useSignin;
