import React, { useMemo, useState } from "react";
import MultiSelect from "../MultiSelect/MultiSelect";
import useGetUsersByRole02 from "../../hooks/user/useGetUserByRole02";
import { useGetBranches, useGetCompanies } from "../../hooks";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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
  const user_role_id = 5;
  const delivery_pickup_role_id = 4;
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  const navigate = useNavigate();

  const [selectedCustomers, setSelectedCustomers] = useState<any[]>([]);
  const [selectedDelPickUsers, setSelectedDelPickUsers] = useState<any[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<any[]>([]);
  const [selectedBranches, setSelectedBranches] = useState<any[]>([]);

  const { users, loading: loadingUsers } = useGetUsersByRole02(
    user_role_id,
    search
  );
  const { users: delivery_pickup_users, loading: loadingUsers2 } =
    useGetUsersByRole02(delivery_pickup_role_id, search2);
  const { companies, loading: loadingCompanies } = useGetCompanies(1, 1000);
  const { branches, loading: loadingBranches } = useGetBranches(
    1,
    1000,
    "",
    "",
    "",
    selectedCompanies
  );

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

  const deliveryPickupOptions = useMemo(() => {
    if (reportTitle !== "Pick Up Report" && reportTitle !== "Delivery Report") {
      return [];
    }

    if (loadingUsers2) {
      return [{ label: "Loading...", value: 0 }];
    }

    return delivery_pickup_users.map((user) => ({
      label: `${user.first_name} ${user.last_name}`,
      value: user.user_id,
    }));
  }, [reportTitle, delivery_pickup_users, loadingUsers2]);

  const companyOptions = useMemo(() => {
    if (loadingCompanies) return [{ label: "Loading...", value: 0 }];
    return companies.map((company) => ({
      label: company.company_name,
      value: company.company_id,
    }));
  }, [companies, loadingCompanies]);

  const branchOptions = useMemo(() => {
    if (loadingBranches) return [{ label: "Loading...", value: 0 }];
    return branches.map((branch) => ({
      label: branch.branch_name,
      value: branch.branch_id,
    }));
  }, [branches, loadingBranches]);

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
    if (selectedDelPickUsers.length) {
      selectedDelPickUsers.forEach((customer_id) => {
        return queryParam.append("driver_id", customer_id);
      });
    }
    if (selectedCompanies.length) {
      selectedCompanies.forEach((company_id) => {
        return queryParam.append("company_id", company_id);
      });
    }
    if (selectedBranches.length) {
      selectedBranches.forEach((branch_id) => {
        return queryParam.append("branch_id", branch_id);
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
      navigate("/report-preview", { state: { url, reportTitle, dynamic_url } });
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
      <div className="flex flex-col gap-3 card-body">
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
            options={branchOptions}
            displayValue="label"
            placeholder="Select Branch"
            selectedValues={selectedBranches}
            onSelect={(selectedList: any[]) => {
              const selectedIds = selectedList.map((item) => item.value);
              setSelectedBranches(selectedIds);
            }}
            onRemove={(selectedList: any[]) => {
              const selectedIds = selectedList.map((item) => item.value);
              setSelectedBranches(selectedIds);
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

        {(reportTitle === "Pick Up Report" ||
          reportTitle === "Delivery Report") && (
          <div className="mui-multiselect-parent">
            <MultiSelect
              options={deliveryPickupOptions}
              defaultOption="No Data Found"
              displayValue="label"
              placeholder={
                reportTitle === "Pick Up Report"
                  ? "Select PickUp Boy"
                  : "Select Delivery Boy"
              }
              selectedValues={selectedDelPickUsers}
              onSelect={(selectedList: any[]) => {
                const selectedIds = selectedList.map((item) => item.value);
                setSelectedDelPickUsers(selectedIds);
              }}
              onRemove={(selectedList: any[]) => {
                const selectedIds = selectedList.map((item) => item.value);
                setSelectedDelPickUsers(selectedIds);
              }}
              setSearch={setSearch2}
              className="w-full"
              isSearchInput={true}
            />
          </div>
        )}
      </div>
      <div className="card-footer">
        <button
          disabled={loading}
          className="relative inline-flex items-center justify-center w-full px-3 py-2 overflow-hidden btn btn-primary"
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
