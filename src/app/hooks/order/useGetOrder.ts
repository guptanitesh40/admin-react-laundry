import { useState } from "react";
import toast from "react-hot-toast";

interface User {
  email?: string;
  first_name: string;
  last_name: string;
  mobile_number?: string;
  user_id: number;
}

interface OrderLog {
  type: string;
  user: User;
}

interface Order {
  delivery_boy_id: number | null;
  pickup_boy_id: number | null;
  order_invoice: any;
  pending_due_amount: any;
  refund_receipt_url: any;
  order_label: any;
  refund_amount: any;
  refund_descriptions: string;
  refund_status: number;
  order_status_details: any;
  pickup_comment: string;
  workshop_status_name: string;
  branch: any;
  pickup_boy: any;
  delivery_boy: any;
  order_status_name: string;
  notes: any;
  address_details: string;
  estimated_pickup_time: string | number | Date;
  estimated_delivery_time: string | number | Date;
  user: any;
  last_name: any;
  first_name: any;
  transaction_id: string;
  username: string;
  order_id: number;
  user_id: any;
  order_status: number;
  shipping_charge: number;
  express_delivery_charges: number;
  express_delivery_hour: number | null;
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
  normal_delivery_charges: number;
  branch_id: number;
  general_order_label: string;
  delivery_by: number;
  company_id: number | null;
  gstin: string;
  gst_company_name: string;
  company: any;
  orderLogs?: OrderLog[];
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
    const GET_ORDER_URL = `${
      import.meta.env.VITE_BASE_URL
    }/admin/order/${order_id}`;

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
