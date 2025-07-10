import React, { useMemo, useState } from "react";
import MultiSelect from "../MultiSelect/MultiSelect";
import useGetUsersByRole02 from "../../hooks/user/useGetUserByRole02";
import { useGetCompanies } from "../../hooks";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import toast from "react-hot-toast";
const { RangePicker } = DatePicker;

interface ReportCardProps {
  reportTitle: string;
  index: number;
  dynamic_url: string;
}

const ReportCard: React.FC<ReportCardProps> = ({
  reportTitle,
  index,
  dynamic_url,
}) => {
  const role_id = 5;
  const [search, setSearch] = useState("");
  const { users, loading: loadingUsers } = useGetUsersByRole02(role_id, search);
  const { companies, loading: loadingCompanies } = useGetCompanies(1, 1000);
  const [selectedCustomers, setSelectedCustomers] = useState<any[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("authToken");

  const customerOptions = useMemo(() => {
    if (loadingUsers) return [{ label: "Loading...", value: 0 }];
    return users.map((user) => ({
      label: `${user.first_name} ${user.last_name}`,
      value: user.user_id,
    }));
  }, [users, loadingUsers]);

  const companyOptions = useMemo(() => {
    if (loadingCompanies) return [{ label: "Loading...", value: 0 }];
    return companies.map((company) => ({
      label: company.company_name,
      value: company.company_id,
    }));
  }, [companies, loadingCompanies]);

  const handleDateChange = (dates: any) => {
    if (dates) {
      setFormData({
        start_time: dayjs(dates[0]).format("DD-MM-YYYY"),
        end_time: dayjs(dates[1]).format("DD-MM-YYYY"),
      });
    } else {
      setFormData({
        start_time: "",
        end_time: "",
      });
    }
  };

  const handleBtnClick = (index: number) => {
    switch (index) {
      case 0:
        downloadReport();
        break;

      case 1:
        downloadReport();
        break;

      case 2:
        downloadReport();
        break;

      case 3:
        downloadReport();
        break;

      case 4:
        downloadReport();
        break;

      case 5:
        downloadReport();
        break;

      case 6:
        downloadReport();
        break;

      default:
        downloadReport();
    }
  };

  const downloadReport = async () => {
    setLoading(true);
    const queryParam = new URLSearchParams();
    if (formData.start_time && formData.end_time) {
      queryParam.append("startDate", formData.start_time);
      queryParam.append("endDate", formData.end_time);
    }
    if (selectedCustomers.length) {
      selectedCustomers.forEach((customer_id) => {
        return queryParam.append("user_id", customer_id);
      });
    }
    if (selectedCompanies.length) {
      selectedCompanies.forEach((company_id) => {
        return queryParam.append("company_id", company_id);
      });
    }

    try {
      const response = await fetch(
        `${BASE_URL}/report/${dynamic_url}?format=excel&${queryParam}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to download report");
      }
      const url = data?.url;
      if (!url) {
        toast.error("Download report not found");
        return;
      }
      const link = document.createElement("a");
      link.href = url;
      link.download = url;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error(error.message || "Network error: Failed to download report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card !shadow-black/10" key={index}>
      <div className="card-header">
        <h3 className="card-title">{reportTitle}</h3>
      </div>
      <div className="card-body flex flex-col gap-3">
        <div>
          <RangePicker
            className="w-full min-w-[80px] px-3 py-2 rounded-md border-gray-300"
            popupClassName="custom-rangepicker-dropdown"
            onChange={handleDateChange}
            format="DD-MM-YYYY"
          />
        </div>

        <div className="mui-multiselect-parent">
          <MultiSelect
            options={companyOptions}
            displayValue="label"
            placeholder="Select Company"
            selectedValues={selectedCompanies}
            onSelect={(selectedList: any[]) => {
              const selectedIds = selectedList.map((item) => item.value);
              setSelectedCompanies(selectedIds);
            }}
            onRemove={(selectedList: any[]) => {
              const selectedIds = selectedList.map((item) => item.value);
              setSelectedCompanies(selectedIds);
            }}
            className="w-full"
            isSearchInput={false}
          />
        </div>

        <div className="mui-multiselect-parent">
          <MultiSelect
            options={customerOptions}
            displayValue="label"
            placeholder="Select Customer"
            selectedValues={selectedCustomers}
            onSelect={(selectedList: any[]) => {
              const selectedIds = selectedList.map((item) => item.value);
              setSelectedCustomers(selectedIds);
            }}
            onRemove={(selectedList: any[]) => {
              const selectedIds = selectedList.map((item) => item.value);
              setSelectedCustomers(selectedIds);
            }}
            setSearch={setSearch}
            className="w-full"
            isSearchInput={true}
          />
        </div>
      </div>
      <div className="card-footer">
        <button
          disabled={loading}
          className="w-full inline-flex items-center justify-center btn btn-primary px-3 py-2 relative overflow-hidden"
          onClick={() => handleBtnClick(index)}
        >
          {loading && <span className="absolute inset-0 loading-bar"></span>}
          <span>{loading ? "Downloading..." : "Download"}</span>
        </button>
      </div>
    </div>
  );
};

export default ReportCard;
