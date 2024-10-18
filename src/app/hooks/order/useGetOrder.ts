import { useCallback, useEffect, useState } from "react";
import toast, { Toast } from "react-hot-toast";

const GET_ORDER_URL = `${import.meta.env.VITE_BASE_URL}/admin/orders`;
const token = localStorage.getItem("authToken");

interface Order {
    estimated_pickup_time: string;
    estimated_delivery_time: string;
    user: any;
    username: string;
    order_id: number; 
    user_id: number; 
    order_status: string; 
    shipping_charge: number;
    express_delivery_charges: number;
    coupon_code: string; 
    coupon_discount: number; 
    description: string; 
    address_id: number | null; 
    paid_amount: number;
    payment_type: string;
    payment_status: string; 
    kasar_amount: number; 
    items: any[];
    sub_total: number;
    total: number;
    shipping_charges: number; 
}
const useGetOrder = (
  pageNumber: number = 1,
  perPage: number = 10,
  search: string = "",
  sortColumn?: string,
  sortOrder?: string
) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);

    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append("page_number", pageNumber.toString());
    if (perPage) queryParams.append("per_page", perPage.toString());
    if (search) queryParams.append("search", search);
    if (sortColumn) queryParams.append("sort_by", sortColumn);
    if (sortOrder) queryParams.append("order", sortOrder);

    try {
      const response = await fetch(`${GET_ORDER_URL}?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, { position: "top-center" });
        return;
      }


      const data = await response.json();
      const allOrders = data?.data?.orders || [];
      const totalCount = data?.data?.count || 0;

      setOrders(allOrders);
      setTotalOrders(totalCount);
    } catch (error: any) {
      toast.error(error?.message || "Network error: Failed to fetch.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }, [pageNumber, perPage, sortOrder, sortColumn, search]);

  return { orders, totalOrders, loading, fetchOrders };
};

export default useGetOrder;
