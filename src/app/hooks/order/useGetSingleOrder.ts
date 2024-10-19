import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Order {
  estimated_pickup_time: string | number | Date;
  estimated_delivery_time: string | number | Date;
  user: any;
  last_name: any;
  first_name: any;
  transaction_id: string;
  username: string;
  order_id: number;
  user_id: number;
  order_status: number;
  shipping_charge: number;
  express_delivery_charges: number;
  coupon_code: string;
  coupon_discount: number;
  description: string;
  address_id: number;
  paid_amount: number;
  payment_type: number;
  payment_status: number;
  kasar_amount: number;
  items: any[];
  sub_total: number;
  total: number;
  shipping_charges: number;
}

const useGetSingleOrder = (order_id: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<Order | null>(null); 
  
  useEffect(() => {
    const fetchOrder = async () => {
      
      if (!order_id) {
        setOrder(null); 
        return;
      }
  
      const token = localStorage.getItem("authToken");
      const GET_ORDER_URL = `${import.meta.env.VITE_BASE_URL}/admin/orders/${order_id}`;
  
      setLoading(true);

      try {
        const response = await fetch(GET_ORDER_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.message, { position: "top-center" });
          setLoading(false);
          return;
        }
  
        const data = await response.json();
        setOrder(data?.data); 
      } catch (error: any) {
        toast.error(error?.message || "Network error: Failed to fetch.", {
          position: "top-center",
        });
      } finally {
        setLoading(false); 
      }
    };
  
    fetchOrder();
  }, [order_id]); 
  
  return { order, loading };
};

export default useGetSingleOrder;
