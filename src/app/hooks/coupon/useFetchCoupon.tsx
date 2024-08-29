import { useCallback, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const FETCH_COUPON_URL = `${import.meta.env.VITE_BASE_URL}/admin/coupon`;

const token = localStorage.getItem('authToken');

interface Coupon {
  coupon_id: number;
  code: string;
  discount_value: string;
  discount_type: number;
  start_time: string;
  end_time: string;
  title: string;
  description: string;
  coupon_type: number;
  maximum_usage_count_per_user: number;
  total_usage_count: number;
}

const useFetchCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCoupons = useCallback(async () => {
    if (!token) {
      toast.error('No authentication token found.', { position: 'top-center' });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(FETCH_COUPON_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, { position: 'top-center' });
        return;
      }

      const data = await response.json();

      const couponData = data?.data?.map((coupon: any) => ({
        coupon_id: coupon.coupon_id,
        code: coupon.code,
        discount_value: coupon.discount_value,
        discount_type: coupon.discount_type,
        start_time: coupon.start_time,
        end_time: coupon.end_time,
        title: coupon.title,
        description: coupon.description,
        coupon_type: coupon.coupon_type,
        maximum_usage_count_per_user: coupon.maximum_usage_count_per_user,
        total_usage_count: coupon.total_usage_count,
      })) || [];
      
      setCoupons(couponData);

    } catch (err: any) {
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        toast.error('Network error: Failed to fetch.', { position: 'top-center' });
      } else {
        toast.error('An unexpected error occurred.', { position: 'top-center' });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  return { coupons, loading, refetch: fetchCoupons };
};

export default useFetchCoupons;
