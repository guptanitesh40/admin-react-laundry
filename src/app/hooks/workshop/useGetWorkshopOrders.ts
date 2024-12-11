import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const GET_WORKSHOPORDER_URL = `${
  import.meta.env.VITE_BASE_URL
}/admin/orders/workshop`;

interface WorkshopOrders {
  workshop_status_name: string;
  workshop: any;
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

const useGetWorkshopOrders = (
  pageNumber: number = 1,
  perPage: number = 10,
  search: string = "",
  sortColumn?: string,
  sortOrder?: string,
  orderstatus?: number[],
  customer_id?: number[],
  branch_id?: number[],
  payment_type?: number,
  payment_status?: number[],
  workshop_id?: number[],
  workshop_manager_id?: number[]
) => {
  const [workshopOrders, setWorkshopOrders] = useState<WorkshopOrders[]>();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWorkshopOrders = async () => {
    const token = localStorage.getItem("authToken");
    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append("page_number", pageNumber.toString());
    if (perPage) queryParams.append("per_page", perPage.toString());
    if (search) queryParams.append("search", search);
    if (sortColumn) queryParams.append("sortBy", sortColumn);
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
    if (payment_status) {
      payment_status.forEach((p) =>
        queryParams.append("payment_status", p.toString())
      );
    }
    if (workshop_id) {
      workshop_id.forEach((w) =>
        queryParams.append("workshop_id", w.toString())
      );
    }
    if (workshop_manager_id) {
      workshop_manager_id.forEach((p) =>
        queryParams.append("workshop_manager_id", p.toString())
      );
    }
    if (payment_type)
      queryParams.append("payment_type", payment_type.toString());

    setLoading(true);
    try {
      const response = await fetch(`${GET_WORKSHOPORDER_URL}?${queryParams}`, {
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

      setWorkshopOrders(data?.data?.workshopOrders);
      setCount(data?.data?.count);
    } catch {
      toast.error("Network error: Failed to fetch workshop orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshopOrders();
  }, [
    pageNumber,
    perPage,
    search,
    sortColumn,
    sortOrder,
    orderstatus,
    customer_id,
    branch_id,
    payment_type,
    payment_status,
    workshop_id,
    workshop_manager_id,
  ]);

  return { workshopOrders, loading, count };
};

export default useGetWorkshopOrders;
