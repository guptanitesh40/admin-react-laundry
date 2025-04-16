import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";

interface SettingsResponse {
  [key: string]: string;
}

const useFetchSettings = () => {
  const [settings, setSettings] = useState<SettingsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSettings = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("Authentication token not found!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/admin/settings`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.message || "Failed to fetch settings", {
          position: "top-center",
        });
        return;
      }

      setSettings(data?.data || {});
    } catch {
      toast.error("Network Error: Failed to fetch settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return { settings, loading };
};

export default useFetchSettings;
