import { useEffect } from "react";
import { useGetCustomerActivityData } from "../../hooks";
import Chart from "react-apexcharts";

const CustomerActivityReport: React.FC = () => {
  const { customerActivityData, fetchCustomerActivityData } =
    useGetCustomerActivityData();

  useEffect(() => {
    fetchCustomerActivityData();
  }, []);

  const categories =
    customerActivityData?.map((item: { month: any }) => item.month) || [];
  const loginCount =
    customerActivityData?.map((item: { login_count: number }) => item.login_count) || [];

  const data = {
    series: [
      {
        name: "Login Count",
        data: loginCount,
      },
    ],
    options: {
      chart: {
        height: 210,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#4154f1", "#2eca6a", "#ff771d"],
      fill: {
        gradient: {
          enabled: true,
          opacityFrom: 0.25,
          opacityTo: 0,
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
        width: 3,
        colors: ["var(--tw-primary)", "var(--tw-brand)", "var(--tw-warning)"],
      },
      legend: {
        show: false,
      },
      markers: {
        size: 0,
        colors: "var(--tw-primary-light)",
        strokeColors: "var(--tw-primary)",
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
          size: 8,
          sizeOffset: 0,
        },
      },
      xaxis: {
        categories: categories,
        axisBorder: {
          show: false,
        },
        maxTicks: 12,
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: "var(--tw-gray-500)",
            fontSize: "12px",
          },
        },
        crosshairs: {
          position: "front",
          stroke: {
            color: "var(--tw-primary)",
            width: 1,
            dashArray: 3,
          },
        },
        tooltip: {
          enabled: false,
          offsetY: 0,
          style: {
            fontSize: "12px",
          },
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
      <div className="col-span-2">
        <div className="card w-full">
          <div className="card-header">
            <h3 className="card-title">Customer Activity Report</h3>
          </div>

          <div className="card-body grid gap-1">
            <div className="h-[210px]">
              <Chart
                options={data.options}
                series={data.series}
                type={data.options.chart.type}
                height={data.options.chart.height}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerActivityReport;
