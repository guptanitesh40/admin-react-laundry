import React, { useMemo, useState } from "react";
import MultiSelect from "../MultiSelect/MultiSelect";
import { useGetBranches, useGetCompanies, useGetServices } from "../../hooks";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;

interface NewReportCardProps {
  reportTitle: string;
  dynamic_url: string;
}

const NewReportCard: React.FC<NewReportCardProps> = ({
  reportTitle,
  dynamic_url,
}) => {
  const [selectedServices, setSelectedServices] = useState<any[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<any[]>([]);
  const [selectedBranches, setSelectedBranches] = useState<any[]>([]);

  const { companies, loading: loadingCompanies } = useGetCompanies(1, 1000);
  const { branches, loading: loadingBranches } = useGetBranches(
    1,
    1000,
    "",
    "",
    "",
    selectedCompanies
  );

  const { services, loading: loadingServices } = useGetServices(1, 10000);

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
  });
  const navigate = useNavigate();

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

  const serviceOptions = useMemo(() => {
    if (loadingServices) {
      return [{ label: "Loading...", value: 0 }];
    }

    return services.map((service) => ({
      label: `${service.name}`,
      value: service.service_id,
    }));
  }, [services, loadingServices]);

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

  const downloadReport = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem("authToken");
    setLoading(true);
    const queryParam = new URLSearchParams();
    if (formData.start_time && formData.end_time) {
      queryParam.append("startDate", formData.start_time);
      queryParam.append("endDate", formData.end_time);
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

    if (setSelectedServices.length) {
      selectedServices.forEach((service_id) => {
        return queryParam.append("service_id", service_id);
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
      // navigate("/report-preview", { state: { url, reportTitle } });
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
    <div className="card !shadow-black/10">
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
            options={serviceOptions}
            defaultOption="No Data Found"
            displayValue="label"
            placeholder={"Select Service"}
            selectedValues={selectedServices}
            onSelect={(selectedList: any[]) => {
              const selectedIds = selectedList.map((item) => item.value);
              setSelectedServices(selectedIds);
            }}
            onRemove={(selectedList: any[]) => {
              const selectedIds = selectedList.map((item) => item.value);
              setSelectedServices(selectedIds);
            }}
            className="w-full"
            isSearchInput={true}
          />
        </div>
      </div>

      <div className="card-footer">
        <button
          disabled={loading}
          className="relative inline-flex items-center justify-center w-full px-3 py-2 overflow-hidden btn btn-primary"
          onClick={downloadReport}
        >
          {loading && <span className="absolute inset-0 loading-bar"></span>}
          <span>{loading ? "Downloading..." : "Download"}</span>
        </button>
      </div>
    </div>
  );
};

export default NewReportCard;
