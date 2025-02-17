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
    customerData?.map((item: { month: any }) => item.month) || [];
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
          bottom: 20,
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

      <div className="card-body flex flex-col justify-end items-stretch grow px-0 py-1">
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
