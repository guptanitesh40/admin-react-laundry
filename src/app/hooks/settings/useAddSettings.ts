import { useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";
const token = localStorage.getItem("authToken");

const useAddSettings = () => {
  const [loading, setLoading] = useState<boolean>();

  const addSetting = async (settings: any) => {
    setLoading(true);

    try {

      const payload = { settings }

      const response = await fetch(`${BASE_URL}/admin/settings`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        return false;
      }

      toast.success(data.message, { position: "top-center" });
      return true;
    } catch (error: any) {
      toast.error(error || "Network Error : Fail to add data", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return { addSetting, loading };
};

export default useAddSettings;
