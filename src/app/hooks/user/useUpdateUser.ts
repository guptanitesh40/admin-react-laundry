import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

const useUpdateUser = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateUser = async (
    user_id: number,
    formData: any
  ): Promise<boolean> => {
    const token = localStorage.getItem("authToken");

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/user/${user_id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, { position: "top-center" });
        return false;
      }

      const data = await response.json();
      toast.success(data.message, { position: "top-center" });
      return true;
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading };
};

export default useUpdateUser;
