import { useEffect } from "react";
import { useGetInActiveCustomerData } from "../../hooks";
import AreaChart from "react-apexcharts";

const InActiveCustomerReport = () => {
  const { customerData, fetchInActiveCustomerData } =
    useGetInActiveCustomerData();

  useEffect(() => {
    fetchInActiveCustomerData();
  }, []);

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
    <div className="card pb-2.5 max-h-[250px] rounded-md">
      <div className="flex justify-between ml-5 mt-2">
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
