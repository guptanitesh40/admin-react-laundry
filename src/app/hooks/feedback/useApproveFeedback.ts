import { useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";
const token = localStorage.getItem("authToken");

const useApproveFeedback = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const approveFeedback = async (feedback_id: number, statusValue: any) => {
    setLoading(true);   

    try {
      const response = await fetch(`${BASE_URL}/feedback/approved/${feedback_id}`, {
        method: "PATCH",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          'Content-type': 'application/json',
        },
        body: JSON.stringify({status: statusValue})
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message, { position: "top-center" });
        setLoading(false);
        return;
      }

      toast.success(data.message, { position: "top-center" });
      return true;
    } catch (error: any) {
      toast.error(error || "Network Error : Failed to approve feeback");
    } finally {
      setLoading(false);
    }
  };

  return { approveFeedback, loading }
};

export default useApproveFeedback;
