import { useEffect, useState } from "react";
import { useGetBranches, useGetBranchSalesData } from "../../hooks";
import AreaChart from "react-apexcharts";
import { DatePicker } from "antd";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const BranchSalesCollectionReport: React.FC = () => {
  const { branchSalesData, fetchBranchSalesData } = useGetBranchSalesData();
  const { branches } = useGetBranches(1, 1000);

  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
    branchId: undefined,
  });

  useEffect(() => {
    const { start_time, end_time, branchId } = formData;

    if (start_time || end_time || branchId !== undefined) {
      fetchBranchSalesData(start_time, end_time, branchId);
    } else {
      fetchBranchSalesData();
    }
  }, [formData]);

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    if (dates) {
      setFormData({
        ...formData,
        start_time: dayjs(dates[0]).format("DD-MM-YYYY"),
        end_time: dayjs(dates[1]).format("DD-MM-YYYY"),
      });
    } else {
      setFormData({
        ...formData,
        start_time: "",
        end_time: "",
      });
    }
  };

  const salesBranches = [
    ...new Set(branchSalesData?.map((item: any) => item.branch_name)),
  ];

  const totalSalesAmount = branchSalesData?.reduce(
    (sum: number, item: any) => sum + (item.total_collection || 0),
    0
  );

  const months = [
    ...new Set(branchSalesData?.map((item: any) => item.month)),
  ].sort();

  const series = salesBranches.map((branch) => {
    const branchData = branchSalesData
      ?.filter((item: any) => item.branch_name === branch)
      .reduce((acc: any, curr: any) => {
        acc[curr.month] = curr.total_collection;
        return acc;
      }, {});

    const data = months.map((month) => branchData[month] ?? 0);

    return {
      name: branch,
      data,
    };
  });

  const data = {
    series,
    options: {
      chart: {
        height: 300,
        type: "area",
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      colors: ["#4154f1", "#2eca6a", "#ff771d", "#ff4560", "#00e396"],
      fill: {
        gradient: {
          enabled: true,
          opacityFrom: 0.25,
          opacityTo: 0,
        },
      },
      grid: {
        borderColor: "#e0e0e0",
        strokeDashArray: 5,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        type: "category",
        categories: months,
        labels: {
          style: {
            colors: "#6B7280",
            fontSize: "12px",
            fontWeight: 500,
          },
        },
        axisTicks: { show: true, color: "#D1D5DB", height: 6 },
        axisBorder: { show: true, color: "#D1D5DB" },
        crosshairs: {
          position: "front",
          stroke: { color: "#3B82F6", width: 1, dashArray: 3 },
        },
      },
      legend: { show: false },
      markers: {
        size: months?.length === 1 ? 4 : 0,
      },
      yaxis: {
        min: 0,
        tickAmount: 5,
        axisTicks: { show: false },
        labels: {
          style: {
            colors: "var(--tw-gray-500)",
            fontSize: "12px",
          },
          formatter: (value: any) =>
            value >= 1000 ? `₹${(value / 1000).toFixed(0)}K` : value.toString(),
        },
      },
      tooltip: {
        x: {
          format: "MMM yyyy",
        },
        y: {
          formatter: (value: number) => `₹${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="col-span-2">
      <div className="card w-full">
        <div className="card-header border-none flex flex-col mt-2 items-start w-full mdesktop:!flex-row">
          <div className="flex justify-end w-full mmobile:justify-end mmobile:flex-col mmobile:gap-y-3 sm:w-auto sm:order-none mb-2 sm:mb-0 mdesktop:order-last gap-x-5">
            <div className="flex justify-end">
              <select
                id="branch"
                className="select border border-gray-300 rounded-md p-2 w-[200px] text-sm"
                value={formData.branchId || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    branchId: e.target.value ? Number(e.target.value) : null,
                  })
                }
              >
                <option value="">Select Branch</option>
                {branches.length > 0 ? (
                  branches.map((branch) => (
                    <option key={branch.branch_id} value={branch.branch_id}>
                      {branch.branch_name}
                    </option>
                  ))
                ) : (
                  <option>No Data Available</option>
                )}
              </select>
            </div>

            <div className="flex justify-end">
              <RangePicker
                className="min-w-[80px] sm:w-[250px]"
                popupClassName="custom-rangepicker-dropdown"
                onChange={handleDateChange}
                format="DD-MM-YYYY"
              />
            </div>
          </div>

          <div className="flex justify-between smmobile:flex-wrap items-center w-full">
            <div>
              <h3 className="card-title">Branch Sales Collection</h3>
              <h5 className="block text-gray-500 text-sm font-bold">
                <div className="flex flex-wrap align-items flex-row gap-x-2">
                  <span>Total Sales Amount</span>
                  <span>₹{totalSalesAmount?.toLocaleString()} </span>
                </div>
              </h5>
            </div>
          </div>
        </div>

        <div className="card-body flex flex-col justify-end items-stretch grow px-3 py-1">
          <AreaChart
            options={data.options}
            series={data.series}
            type={data.options.chart.type}
            height={data.options.chart.height}
          />
        </div>
      </div>
    </div>
  );
};

export default BranchSalesCollectionReport;
