import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";
const token = localStorage.getItem("authToken");

const useAddAddress = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const addAddress = async (addressData: any) => {
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

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, { position: "top-center" });
        return false;
      }

      const data = await response.json();
      toast.success(data.message, { position: "top-center" });
      return true;
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
