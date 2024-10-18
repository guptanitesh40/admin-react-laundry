import { useState } from "react";
import toast from "react-hot-toast";

const useAddAddress = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const addAddress = async (addressData: any) => {
    const ADD_ADDRESS_URL = `${import.meta.env.VITE_BASE_URL}/address/admin/`;
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await fetch(ADD_ADDRESS_URL, {
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
