import { useEffect, useState } from "react";
import { useGetInActiveCustomerData } from "../../hooks";
import AreaChart from "react-apexcharts";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const InActiveCustomerReport = () => {
  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
  });

  const { customerData, fetchInActiveCustomerData } =
    useGetInActiveCustomerData();

  useEffect(() => {
    if (formData.start_time && formData.end_time) {
      fetchInActiveCustomerData(formData.start_time, formData.end_time);
    } else {
      fetchInActiveCustomerData();
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

  const categories =
    customerData?.map((item: { month: any }) => item.month.split("-")[0]) || [];
  const customerCount =
    customerData?.map(
      (item: { not_active_count: number }) => item.not_active_count
    ) || [];

  const data = {
    series: [
      {
        name: "No Active Customer",
        data: customerCount,
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 200,
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#4154f1"],
      fill: {
        gradient: {
          enabled: true,
          opacityFrom: 0.25,
          opacityTo: 0.1,
        },
      },
      grid: {
        borderColor: "rgba(0, 0, 0, 0)",
        strokeDashArray: 5,
        padding: {
          top: 0,
          right: 0,
          bottom: 2,
          left: 8,
        },
      },
      stroke: {
        curve: "smooth",
        show: true,
        width: 3,
        colors: ["#4154f1"],
      },
      legend: {
        show: false,
      },
      xaxis: {
        type: "category",
        categories: categories,
        labels: {
          show: true,
          style: {
            colors: "#6B7280",
            fontSize: "12px",
            fontWeight: 500,
          },
        },
        axisTicks: {
          show: true,
          color: "#D1D5DB",
          height: 6,
        },
        axisBorder: {
          show: true,
          color: "#D1D5DB",
        },
        crosshairs: {
          position: "front",
          stroke: {
            color: "#3B82F6",
            width: 1,
            dashArray: 3,
          },
        },
      },
      markers: {
        size: customerCount?.length === 1 ? 3 : 0,
        colors: "#4154f1",
        strokeColors: "#4154f1",
        strokeWidth: 4,
        hover: {
          size: 5,
        },
      },
      yaxis: {
        min: 0,
        tickAmount: 1,
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: "var(--tw-gray-500)",
            fontSize: "12px",
          },
          formatter: (value: any) => {
            if (value >= 1000) {
              return `₹${(value / 1000).toFixed(0)}K`;
            }
            return value.toString();
          },
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
    <div className="card w-full pb-2.5 max-h-[300px] rounded-md">
      <div className="self-end p-3 sm:mt-0">
        <RangePicker
          className="min-w-[80px] sm:w-[250px]"
          popupClassName="custom-rangepicker-dropdown"
          onChange={handleDateChange}
          format="DD-MM-YYYY"
        />
      </div>
      <div className="flex justify-between ml-5">
        <div>
          <h3 className="card-title text-lg">In Active Customer</h3>
        </div>
      </div>

      <div className="card-body flex flex-col justify-end items-stretch grow px-0 py-3">
        <AreaChart
          options={data.options}
          series={data.series}
          type={data.options.chart.type}
          height={data.options.chart.height}
        />
      </div>
    </div>
  );
};

export default InActiveCustomerReport;
