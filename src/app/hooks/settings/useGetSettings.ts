import {  useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";

interface settingsData {
  data: any;
  home_promotion_banner_website: string | undefined;
}

const useGetSettings = () => {
  const [loading, setLoading] = useState<boolean>();
  const [settingsData, setSettingsData] = useState<settingsData | undefined>();

  const fetchSetting = async () => {
    const token = localStorage.getItem("authToken");

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/admin/settings`, {
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

      setSettingsData(data);
    } catch (error: any) {
      toast.error(error || "Network Error: Fail to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return { settingsData, fetchSetting, loading };
};

export default useGetSettings;
