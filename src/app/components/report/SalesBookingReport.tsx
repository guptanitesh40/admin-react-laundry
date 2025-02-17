import { useEffect } from "react";
import { useGetSalesData } from "../../hooks";
import AreaChart from "react-apexcharts";

const SalesBookingReport = () => {
  const { salesData, fetchSalesData } = useGetSalesData();

  useEffect(() => {
    fetchSalesData();
  }, []);

  const categories = salesData?.map((item: { month: any }) => item.month) || [];
  const totalSales =
    salesData?.map((item: { total_sales: any }) => item.total_sales) || [];
  const totalCollection =
    salesData?.map(
      (item: { total_collection: any }) => item.total_collection
    ) || [];
  const totalUnpaidAmount = salesData?.map(
    (item: { unpaid_amount: any }) => item.unpaid_amount
  );

  const totalOrderAmount = salesData?.reduce(
    (sum: any, item: { total_sales: any }) => sum + item.total_sales,
    0
  );

  const data = {
    series: [
      {
        name: "Total Sales",
        data: totalSales,
      },
      {
        name: "Total Collection",
        data: totalCollection,
      },
      {
        name: "Total Unpaid",
        data: totalUnpaidAmount,
      },
    ],
    options: {
      chart: {
        height: 280,
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
      xaxis: {
        type: "category",
        categories: categories,
        style: {
          colors: "#6c757d",
        },
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
        colors: ["var(--tw-primary)", "var(--tw-brand)", "var(--tw-warning)"],
        strokeColors: [
          "var(--tw-primary)",
          "var(--tw-brand)",
          "var(--tw-warning)",
        ],
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

      tooltip: {
        x: {
          format: "MMM yyyy",
        },
      },
    },
  };

  return (
    <div className="xl:cols-span-2 sm:cols-span-1 lg:cols-span-1">
      <div className="card w-full">
        <div className="card-header border-none flex flex-col mt-2 items-start">
          <h3 className="card-title">Sales Booking</h3>
          <h5 className="block text-gray-500 text-sm font-bold">
            <div className="flex flex-wrap flex-row gap-x-2">
              <span>Total Order Amount</span>
              <span>₹{totalOrderAmount?.toLocaleString()} </span>
            </div>
          </h5>
        </div>

        <div className="card-body no-padding-left grid gap-1">
          <div className="h-[280px] miniscreen:min-w-[110%] lgmobile:min-w-[110%]">
            <AreaChart
              options={data.options}
              series={data.series}
              type={data.options.chart.type}
              height={data.options.chart.height}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesBookingReport;
