import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";

interface Payments {
  created_at: string;
  razorpay_transaction_id: number;
  razorpay_order_id: string;
  currency: string;
  status: any;
  amount: number;
  user_id: number;
  user: any;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: any;
}

const useGetPayments = (
  pageNumber: number = 1,
  perPage: number = 10,
  search: string = "",
  sortColumn?: string,
  sortOrder?: string,
  user_id?: number[],
  status?: string[]
) => {
  const [payments, setPayments] = useState<Payments[]>();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPayments = async () => {
    const token = localStorage.getItem("authToken");

    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append("page_number", pageNumber.toString());
    if (perPage) queryParams.append("per_page", perPage.toString());
    if (search) queryParams.append("search", search);
    if (sortColumn) queryParams.append("sortBy", sortColumn);
    if (sortOrder) queryParams.append("order", sortOrder);
    if (user_id) {
      user_id.forEach((u) => queryParams.append("user_id", u.toString()));
    }
    if (status) {
      status.forEach((status) => queryParams.append("status", status));
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/razorpay/transaction?${queryParams}`,
        {
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        setLoading(false);
        return;
      }

      setPayments(data?.data?.result);
      setCount(data?.data?.count);
    } catch (error: any) {
      toast.error("Network Error : Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [pageNumber, perPage, search, sortColumn, sortOrder, user_id, status]);

  return { payments, count, fetchPayments, loading };
};

export default useGetPayments;
