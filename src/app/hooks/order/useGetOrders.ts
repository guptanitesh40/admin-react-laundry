import { useEffect, useState } from "react";
import toast, { Toast } from "react-hot-toast";

const GET_ORDERS_URL = `${import.meta.env.VITE_BASE_URL}/admin/orders`;

interface Order {
  branch: any;
  address_details: string | null;
  gst: number;
  estimated_pickup_time: string;
  estimated_delivery_time: string;
  user: any;
  username: string;
  order_id: number;
  user_id: number;
  order_status: number;
  shipping_charge: number;
  express_delivery_charges: number;
  coupon_code: string;
  coupon_discount: number;
  description: string;
  address_id: number | null;
  paid_amount: number;
  payment_type: string;
  payment_status: number;
  kasar_amount: number;
  items: any[];
  sub_total: number;
  total: number;
  shipping_charges: number;
  branch_id: number;
}
const useGetOrders = (
  pageNumber: number = 1,
  perPage: number = 10,
  search: string = "",
  sortColumn?: string,
  sortOrder?: string,
  orderstatus?: number[],
  customer_id?: number[],
  branch_id?: number[],
  pickup_boy_id?: number[],
  delivery_boy_id?: number[],
  payment_type?: number,
  payment_status?: number[]
) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchOrders = async () => {
    const token = localStorage.getItem("authToken");
    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append("page_number", pageNumber.toString());
    if (perPage) queryParams.append("per_page", perPage.toString());
    if (search) queryParams.append("search", search);
    if (sortColumn) queryParams.append("sort_by", sortColumn);
    if (sortOrder) queryParams.append("order", sortOrder);
    if (orderstatus) {
      orderstatus.forEach((o) =>
        queryParams.append("orderstatus", o.toString())
      );
    }
    if (customer_id) {
      customer_id.forEach((c) =>
        queryParams.append("customer_id", c.toString())
      );
    }
    if (branch_id) {
      branch_id.forEach((b) => queryParams.append("branch_id", b.toString()));
    }
    if (pickup_boy_id) {
      pickup_boy_id.forEach((p) =>
        queryParams.append("pickup_boy_id", p.toString())
      );
    }
    if (delivery_boy_id) {
      delivery_boy_id.forEach((d) =>
        queryParams.append("delivery_boy_id", d.toString())
      );
    }
    if (payment_status) {
      payment_status.forEach((p) =>
        queryParams.append("payment_status", p.toString())
      );
    }
    if (payment_type)
      queryParams.append("payment_type", payment_type.toString());

    setLoading(true);
    try {
      const response = await fetch(`${GET_ORDERS_URL}?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        return;
      }

      setOrders(data?.data?.orders || []);
      setTotalOrders(data?.data?.count || 0);
    } catch (error: any) {
      toast.error(error || "Network error: Failed to fetch.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [
    pageNumber,
    perPage,
    search,
    sortColumn,
    sortOrder,
    orderstatus,
    customer_id,
    branch_id,
    pickup_boy_id,
    delivery_boy_id,
    payment_type,
    payment_status,
  ]);

  return { orders, totalOrders, loading, fetchOrders };
};

export default useGetOrders;
