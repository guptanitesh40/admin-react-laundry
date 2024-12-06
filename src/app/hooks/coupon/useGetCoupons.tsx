import { useCallback, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const FETCH_COUPON_URL = `${import.meta.env.VITE_BASE_URL}/admin/coupon`;

interface Coupon {
  coupon_id: number;
  code: string;
  discount_value: number;
  discount_type: number;
  start_time: string;
  end_time: string;
  title: string;
  description: string;
  coupon_type: number;
  maximum_usage_count_per_user: number;
  total_usage_count: number;
}

const useGetCoupons = (
  pageNumber: number,
  perPage: number,
  search: string = '',
  sortColumn?: string,
  sortOrder?: string,
  discount_type?: number,
  coupon_type?: number[],
) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalCoupons,setTotalCoupons] = useState(0);

  const fetchCoupons = async () => {
    const token = localStorage.getItem("authToken");
    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append("page_number", pageNumber.toString());
    if (perPage) queryParams.append("per_page", perPage.toString());
    if (search) queryParams.append("search", search);
    if (sortColumn) queryParams.append("sort_by", sortColumn);
    if (sortOrder) queryParams.append("order", sortOrder);
    if (discount_type) queryParams.append("discount_type", discount_type.toString());
    if (coupon_type) {
      coupon_type.forEach((c) => queryParams.append("coupon_type", c.toString()));
    }

    setLoading(true);
    try {
      const response = await fetch(`${FETCH_COUPON_URL}?${queryParams}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, { position: 'top-center' });
        return;
      }

      const data = await response.json();
      const allCoupon = data?.data?.result || [];
      const totalCount = data?.data?.count || 0;
      
      setCoupons(allCoupon);
      setTotalCoupons(totalCount);
    } catch (error: any) {
      toast.error(error?.message || 'Network error: Failed to fetch.', {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, [pageNumber, perPage, search, sortColumn, sortOrder, coupon_type, discount_type]);

  return { coupons, totalCoupons, loading, fetchCoupons };
};

export default useGetCoupons;
