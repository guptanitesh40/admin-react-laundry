import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";

interface Feedback {
  created_at: any;
  feedback_id: number;
  rating: number;
  comment: string;
  is_publish: any;
  order_id: number;
  order: any;
  user_id: number;
  user: any;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: any;
}

const useGetFeedbacks = (
  pageNumber: number = 1,
  perPage: number = 10,
  search: string = "",
  sortColumn?: string,
  sortOrder?: string,
  rating?: number[],
  is_publish?: number, 
) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState(0);

  const fetchFeedbacks = async () => {
    const token = localStorage.getItem("authToken");
    
    const queryParams = new URLSearchParams();

    if (pageNumber) queryParams.append("page_number", pageNumber.toString());
    if (perPage) queryParams.append("per_page", perPage.toString());
    if (search) queryParams.append("search", search);
    if (sortColumn) queryParams.append("sort_by", sortColumn);
    if (sortOrder) queryParams.append("order", sortOrder);
    if(is_publish) queryParams.append("is_publish", is_publish.toString());
    if (rating) {
      rating.forEach((r) => queryParams.append("rating", r.toString()));
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/feedback?${queryParams}`, {
        method: "GET",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        setLoading(false);
        return;
      }

      setFeedbacks(data?.data?.feedbacks || []);
      setCount(data?.data?.count);
    } catch (error: any) {
      toast.error(error || "Network Error : Failed to fetch feedbacks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [pageNumber, perPage, search, sortColumn, sortOrder, is_publish, rating]);

  return { feedbacks, fetchFeedbacks, loading, count };
};

export default useGetFeedbacks;
