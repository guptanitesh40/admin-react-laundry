import { useEffect } from "react";
import { useGetCustomerActivityData } from "../../hooks";
import LineChart from "react-apexcharts";

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
        type: "line", 
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#00ff00"],
      fill: {
        gradient: {
          enabled: false, 
        },
      },
      grid: {
        borderColor: "var(--tw-gray-200)",
        strokeDashArray: 5,
        clipMarkers: false,
        yaxis: {
          lines: {
            show: true,
          },
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      stroke: {
        curve: "smooth",
        show: true,
        width: 2,
        linecap: "round",
        dashArray: 0,
        colors: ["#00ff00"],
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: categories,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
        crosshairs: {
          position: "front",
          stroke: {
            color: "var(--tw-primary)",
            width: 1,
            dashArray: 3,
          },
        },
      },
      markers: {
        size: 2,
        colors: "#00ff00",
        strokeColors: "#00ff00",
        strokeWidth: 4,
        strokeOpacity: 1,
        strokeDashArray: 0,
        fillOpacity: 1,
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        showNullDataPoints: true,
        hover: {
          size: 4,
          sizeOffset: 0,
        },
      },
      yaxis: {
        min: 0,
        tickAmount: 8,
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
            return `${value}`;
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
    <>
      <div className="col-span-1">
        <div className="card w-full">
          <div className="card-header border-none">
            <h3 className="card-title">Customer Activity</h3>
          </div>

          <div className="card-body grid gap-1">
            <div className="h-[235px]">
              <LineChart
                options={data.options}
                series={data.series}
                type={data.options.chart.type}
                height={230}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerActivityReport;
