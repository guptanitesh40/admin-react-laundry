import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateCompany = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateCompany = async (
    company_id: number,
    formData: any
  ): Promise<boolean> => {
    const token = localStorage.getItem("authToken");

    const UPDATE_COMPANY_URL = `${
      import.meta.env.VITE_BASE_URL
    }/companies/${company_id}`;

    const data = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        if (
          key === "logo" ||
          key === "contract_document" ||
          key === "signature_image"
        ) {
          if (formData[key] instanceof File) {
            data.append(key, formData[key]);
          }
        } else {
          data.append(key, formData[key]);
        }
      }
    }

    setLoading(true);
    try {
      const response = await fetch(UPDATE_COMPANY_URL, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message, { position: "top-center" });
        return true;
      }

      const errorData = await response.json();
      toast.error(errorData.message, { position: "top-center" });
      return false;
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { updateCompany, loading };
};

export default useUpdateCompany;
