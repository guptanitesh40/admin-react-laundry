import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

const useAddAddress = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const addAddress = async (addressData: any, showToast = true) => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/address/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (showToast) {
          toast.error(data.message, { position: "top-center" });
        }
        return false;
      }

      if (showToast) {
        toast.success(data.message, { position: "top-center" });
      }
      return data?.data?.result;
    } catch (error: any) {
      toast.error(error?.message || "Error adding banner", {
        position: "top-center",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { addAddress, loading };
};

export default useAddAddress;