import { useEffect, useState } from "react";
import { useGetNewCustomerData } from "../../hooks";
import BarChart from "react-apexcharts";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const NewCustomerReport: React.FC = () => {
  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
  });

  const { customerData, fetchNewCustomerData } = useGetNewCustomerData();

  useEffect(() => {
    if (formData.start_time && formData.end_time) {
      fetchNewCustomerData(formData.start_time, formData.end_time);
    } else {
      fetchNewCustomerData();
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
      (item: { customer_count: number }) => item.customer_count
    ) || [];

  const totalCustomers = customerData?.reduce(
    (sum: number, customer: { customer_count: number }) =>
      sum + Number(customer.customer_count),
    0
  );

  const data = {
    series: [
      {
        name: "New Customer",
        data: customerCount,
      },
    ],
    options: {
      chart: {
        fontFamily: "inherit",
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%",
          borderRadius: 5,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: "blue",
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
      yaxis: {
        min: 0,
        tickAmount: 5,
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
      fill: {
        opacity: 1,
      },
      states: {
        normal: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        hover: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: "none",
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: "12px",
        },
      },
      colors: ["#ECE852"],
      grid: {
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
    },
  };

  return (
    <div className="col-span-1">
      <div className="card w-full rounded-md">
        <div className="self-end p-3 sm:mt-0">
          <RangePicker
            className="min-w-[80px] sm:w-[250px]"
            popupClassName="custom-rangepicker-dropdown"
            onChange={handleDateChange}
            format="DD-MM-YYYY"
          />
        </div>
        <div className="card-header pt-0  border-none">
          <div className="flex flex-col justify-between">
            <h3 className="card-title">New Customer</h3>
          </div>
          <div className="mt-2">
            <span className="p-3 bg-red-50 rounded-md relative text-gray-500 semibold">
              +{totalCustomers}
            </span>
          </div>
        </div>

        <div className="card-body flex flex-col justify-end items-stretch grow px-0 py-1">
          <BarChart
            options={data.options}
            series={data.series}
            type={data.options.chart.type}
            height={163}
          />
        </div>
      </div>
    </div>
  );
};

export default NewCustomerReport;
