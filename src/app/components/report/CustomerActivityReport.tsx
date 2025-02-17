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
    customerActivityData?.map((item: { month: any }) => item.month) || [];
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
          bottom: 31,
          left: 0,
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
        categories: categories,
        labels: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        crosshairs: {
          show: false,
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
        show: false,
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
    <div className="card pb-2.5 max-h-[250px] rounded-md">
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
