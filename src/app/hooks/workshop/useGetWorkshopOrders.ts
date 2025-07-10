import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";

interface WorkshopOrders {
  created_at: any;
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
  order_status_details: any;
  shipping_charge: number;
  express_delivery_charges: number;
  coupon_code: string;
  coupon_discount: number;
  description: string;
  address_id: number | null;
  paid_amount: number;
  payment_types: string;
  payment_statuses: number;
  kasar_amount: number;
  items: any[];
  sub_total: number;
  total: number;
  shipping_charges: number;
  branches_ids: number;
}

interface WorkshopOrderData {
  workshopOrders: WorkshopOrders[];
  count: number;
  total_amount: number;
  paid_amount: number;
  total_quantity: number;
  kasar_amount: number;
}

const useGetWorkshopOrders = (
  pageNumber: number = 1,
  perPage: number = 10,
  search: string = "",
  sortColumn?: string,
  sortOrder?: string,
  order_statuses?: number[],
  customer_ids?: number[],
  branches_ids?: number[],
  payment_types?: number,
  payment_statuses?: number[],
  workshop_ids?: number[],
  workshop_manager_ids?: number[],
  start_date?: string,
  end_date?: string
) => {
  const [workshopOrderData, setWorkshopOrderData] =
    useState<WorkshopOrderData[]>();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWorkshopOrders = async () => {
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
    if (payment_statuses) {
      payment_statuses.forEach((p) =>
        queryParams.append("payment_statuses", p.toString())
      );
    }
    if (workshop_ids) {
      workshop_ids.forEach((w) =>
        queryParams.append("workshop_ids", w.toString())
      );
    }
    if (workshop_manager_ids) {
      workshop_manager_ids.forEach((p) =>
        queryParams.append("workshop_manager_ids", p.toString())
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
      const response = await fetch(
        `${BASE_URL}/admin/orders/workshop?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        setLoading(false);
        return;
      }

      setWorkshopOrderData(data?.data || {});
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
    order_statuses,
    customer_ids,
    branches_ids,
    payment_types,
    payment_statuses,
    workshop_ids,
    workshop_manager_ids,
    start_date,
    end_date,
  ]);

  return { workshopOrderData, loading, count, fetchWorkshopOrders };
};

export default useGetWorkshopOrders;
