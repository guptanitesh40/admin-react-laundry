import { useState } from "react";
import toast from "react-hot-toast";

interface Address {
  address_id: number;
  building_number:string;
  area: string;
  landmark:string;
  pincode:string;
  city:string;
  state:string;
  country:string;
  user_id:number;
}

const useGetAddress = () => {
  const [address, setAddress] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAddress = async (user_id: number) => {
    const token = localStorage.getItem("authToken");

    const GET_ADDRESS_URL = `${import.meta.env.VITE_BASE_URL}/address/${user_id}/user`;

    try {
      const response = await fetch(GET_ADDRESS_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, { position: "top-center" });
        return;
      }

      const data = await response.json();
      const addressData = data?.data?.result || [];
      setAddress(addressData);
    } catch (error: any) {
      toast.error(error?.message || "Network error: Failed to fetch.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return { address, loading, fetchAddress};
};


export default useGetAddress;