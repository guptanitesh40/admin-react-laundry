import { useCallback, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const GET_PRODUCT_URL = `${import.meta.env.VITE_BASE_URL}/admin/products`;

interface Product {
  product_id: number;
  name: string;
  image: string; 
  totalProducts:number;
}

const useGetProducts = (
  pageNumber: number = 1,
  perPage: number = 10,
  search: string = "",
  sortColumn?: string,
  sortOrder?: string
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts,setTotalProducts] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProducts = async () => {
    const token = localStorage.getItem('authToken');
    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append('page_number', pageNumber.toString());
    if (perPage) queryParams.append('per_page', perPage.toString());
    if (search) queryParams.append('search', search);
    if (sortColumn) queryParams.append('sort_by', sortColumn);
    if (sortOrder) queryParams.append('order', sortOrder);

    setLoading(true);
    try {
      const response = await fetch(`${GET_PRODUCT_URL}?${queryParams}`, {
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
      const allProducts = data?.data?.result || [];
      const totalCount = data?.data?.count || 0;

      setProducts(allProducts);
      setTotalProducts(totalCount);
    } catch (error: any) {
      toast.error(error?.message || 'Network error: Failed to fetch.', {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pageNumber, perPage, search, sortColumn, sortOrder]);

  return { products, loading, totalProducts, fetchProducts };
};

export default useGetProducts;
