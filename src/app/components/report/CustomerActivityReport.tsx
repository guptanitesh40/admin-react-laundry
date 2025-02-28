import { useEffect } from "react";
import { useGetCustomerActivityData } from "../../hooks";
import AreaChart from "react-apexcharts";


const CustomerActivityReport: React.FC = () => {
  const { customerActivityData, fetchCustomerActivityData } =
    useGetCustomerActivityData();

  useEffect(() => {
    fetchCustomerActivityData();
  }, []);

  const categories =
    customerActivityData?.map(
      (item: { month: any }) => item.month.split("-")[0]
    ) || [];
  const loginCount =
    customerActivityData?.map(
      (item: { login_count: number }) => item.login_count
    ) || [];

  const data = {
    series: [
      {
        name: "Login Count",
        data: loginCount,
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 240,
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
          bottom: 20,
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
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      tooltip: {
        x: {
          format: "MMM yyyy",
        },
      },
    },
  };

  return (
    <div className="card w-full pb-2.5 max-h-[250px] rounded-md">
      <div className="flex justify-between ml-6 mt-2">
        <div>
          <h3 className="card-title text-lg">Activity</h3>
          <span className="text-gray-500 font-medium">
            Customer Login Count
          </span>
        </div>
      </div>

      <div className="card-body flex flex-col justify-end items-stretch grow px-0 py-1">
      <AreaChart
          options={data.options}
          series={data.series}
          type={data.options.chart.type}
          height={200}
        />
      </div>
    </div>
  );
};

export default CustomerActivityReport;
