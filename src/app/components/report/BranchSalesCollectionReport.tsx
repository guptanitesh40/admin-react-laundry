import { useEffect, useState } from "react";
import { useGetBranchSalesData } from "../../hooks";
import AreaChart from "react-apexcharts";
import { DatePicker } from "antd";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const BranchSalesCollectionReport: React.FC = () => {
  const { branchSalesData, fetchBranchSalesData } = useGetBranchSalesData();

  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    if (formData.start_time && formData.end_time) {
      fetchBranchSalesData(formData.start_time, formData.end_time);
    } else {
      fetchBranchSalesData();
    }
  }, [formData]);

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
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

  const branches = [
    ...new Set(branchSalesData?.map((item: any) => item.branch_name)),
  ];

  const months = [
    ...new Set(branchSalesData?.map((item: any) => item.month)),
  ].sort();

  const series = branches.map((branch) => {
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

  const generateUniqueColors = (count: number) => {
    return Array.from(
      { length: count },
      (_, i) => `hsl(${(i * 360) / count}, 80%, 50%)`
    );
  };

  const branchColors = generateUniqueColors(branches.length);

  const data = {
    series,
    options: {
      chart: {
        height: 300,
        type: "area",
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      colors: branchColors,
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0.3, 
          opacityFrom: 0.08,   
          opacityTo: 0.05,     
          stops: [0, 80],    
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
      },
    },
  };

  return (
    <div className="col-span-2">
      <div className="card w-full">
        <div className="card-header border-none flex flex-col mt-2 items-start w-full desktop:!flex-row">
          <div className="flex justify-end w-full sm:w-auto sm:order-none mb-2 sm:mb-0 desktop:order-last">
            <RangePicker
              className="min-w-[80px] sm:w-[250px]"
              dropdownClassName="custom-rangepicker-dropdown"
              onChange={handleDateChange}
              format="DD-MM-YYYY"
            />
          </div>

          <div className="flex justify-between smmobile:flex-wrap items-center w-full">
            <div className="fmobile:flex fmobile:gap-2 fmobile:items-center">
              <h3 className="card-title">Branch Wise Sales Collection</h3>
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
