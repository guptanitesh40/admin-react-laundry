import { useState } from "react";
import toast from "react-hot-toast";

const useRestoreUser = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const restoreUser = async (
    user_id: number
  ): Promise<{ success: boolean; message: string }> => {
    setLoading(true);

    const RESTORE_USER_URL = `${
      import.meta.env.VITE_BASE_URL
    }/user/restore/${user_id}`;
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(RESTORE_USER_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, message: result.message };
      }
      return { success: true, message: result.message };
    } catch (error: any) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { restoreUser, loading };
};

export default useRestoreUser;
