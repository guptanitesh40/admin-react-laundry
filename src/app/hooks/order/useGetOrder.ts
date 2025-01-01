import { useState } from "react";
import toast from "react-hot-toast";

interface Order {
  refund_amount: any;
  refund_descriptions: string;
  refund_status: number;
  order_status_details: any;
  pickup_comment: string;
  workshop_status_name: string;
  branch: any;
  pickup_boy: any;
  order_status_name: string;
  notes: any [];
  address_details: string;
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
  branch_id: number;
}

const useGetOrder = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<Order | null>(null); 
  
    const fetchOrder = async (order_id: number) => {
      
      if (!order_id) {
        setOrder(null); 
        return;
      }
      
      const token = localStorage.getItem("authToken");
      const GET_ORDER_URL = `${import.meta.env.VITE_BASE_URL}/admin/order/${order_id}`;
  
      setLoading(true);
      try {
        const response = await fetch(GET_ORDER_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message, { position: "top-center" });
          setLoading(false);
          return;
        }
  
        setOrder(data?.data?.orders);
      } catch (error: any) {
        toast.error(error?.message || "Network error: Failed to fetch.", {
          position: "top-center",
        });
      } finally {
        setLoading(false); 
      }
    };
  
  
  return { order, loading, fetchOrder };
};

export default useGetOrder;
