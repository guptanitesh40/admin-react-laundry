import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

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
  created_at: any;
  branch: any;
  address_details: string | null;
  gst: number;
  estimated_pickup_time: string;
  estimated_delivery_time: string;
  user: any;
  username: string;
  order_id: number;
  user_id: number;
  order_status_details: any;
  order_status: number;
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
  quantity: any;
  sub_total: number;
  total: number;
  normal_delivery_charges: number;
  branch_id: number;
  start_date: string;
  end_date: string;
  confirm_by_user?: any;
  delivered_by_user?: any;
  delivery_date: string;
  orderLogs?: OrderLog[];
}

interface OrdersData {
  orders: Order[];
  count: number;
  total_amount: number;
  paid_amount: number;
  total_quantity: number;
  kasar_amount: number;
}

const useGetOrders = (
  pageNumber: number = 1,
  perPage: number = 10,
  search: string = "",
  sortColumn?: string,
  sortOrder?: string,
  order_statuses?: number[],
  customer_ids?: number[],
  branches_ids?: number[],
  pickup_boy_ids?: number[],
  delivery_boy_ids?: number[],
  payment_types?: number,
  payment_statuses?: number[],
  start_date?: string,
  end_date?: string,
  list: string = "",
  orderList: string = ""
) => {
  const [orderData, setOrderData] = useState<OrdersData>();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchOrders = async () => {
    const token = localStorage.getItem("authToken");
    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append("page_number", pageNumber.toString());
    if (perPage) queryParams.append("per_page", perPage.toString());
    if (search) queryParams.append("search", search);
    if (sortColumn) queryParams.append("sort_by", sortColumn);
    if (sortOrder) queryParams.append("order", sortOrder);
    if (order_statuses) {
      order_statuses.forEach((o) =>
        queryParams.append("order_statuses", o.toString())
      );
    }
    if (customer_ids) {
      customer_ids.forEach((c) =>
        queryParams.append("customer_ids", c.toString())
      );
    }
    if (branches_ids) {
      branches_ids.forEach((b) =>
        queryParams.append("branches_ids", b.toString())
      );
    }
    if (pickup_boy_ids) {
      pickup_boy_ids.forEach((p) =>
        queryParams.append("pickup_boy_ids", p.toString())
      );
    }
    if (delivery_boy_ids) {
      delivery_boy_ids.forEach((d) =>
        queryParams.append("delivery_boy_ids", d.toString())
      );
    }
    if (list) {
      queryParams.append("list", list);
    }
    if (orderList) {
      queryParams.append("orderList", orderList);
    }
    if (payment_statuses) {
      payment_statuses.forEach((p) =>
        queryParams.append("payment_statuses", p.toString())
      );
    }
    if (payment_types)
      queryParams.append("payment_types", payment_types.toString());

    if (start_date && end_date) {
      queryParams.append("start_date", start_date);
      queryParams.append("end_date", end_date);
    }
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/admin/orders?${queryParams}`, {
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
      setOrderData(data?.data || {});
      setCount(data?.data?.count || 0);
    } catch (error: any) {
      toast.error(error || "Network error: Failed to fetch.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [
    pageNumber,
    perPage,
    search,
    sortColumn,
    sortOrder,
    order_statuses,
    customer_ids,
    branches_ids,
    pickup_boy_ids,
    delivery_boy_ids,
    payment_types,
    payment_statuses,
    start_date,
    end_date,
  ]);

  return { orderData, count, loading, fetchOrders };
};

export default useGetOrders;
