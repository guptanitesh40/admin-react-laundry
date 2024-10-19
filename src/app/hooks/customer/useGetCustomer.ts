import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';

const GET_CUSTOMER_URL = `${import.meta.env.VITE_BASE_URL}/user/customers`;

interface Customer {
  user_id: number;
  name: string;
  totalCustomers: number;
}

const useGetCustomer = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCustomers = useCallback(async (search: string): Promise<Customer[]> => {
    const token = localStorage.getItem('authToken');
    const queryParams = new URLSearchParams();

    if (search) queryParams.append('search', search);

    const url = `${GET_CUSTOMER_URL}?${queryParams}`;

    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message, { position: 'top-center' });
        return [];
      }

      const data = await response.json();
      const allCustomers = data?.data || [];
      const totalCount = data?.data?.count || 0;

      setCustomers(allCustomers);
      setTotalCustomers(totalCount);
      return allCustomers;
    } catch (error: any) {
      toast.error(error?.message || 'Network error: Failed to fetch.', {
        position: "top-center",
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { customers, fetchCustomers, setTotalCustomers, loading };
};

export default useGetCustomer;
