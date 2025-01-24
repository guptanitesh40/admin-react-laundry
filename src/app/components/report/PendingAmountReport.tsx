import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useGetPendingAmountData } from "../../hooks";

const PendingAmountReport: React.FC = () => {
  const { pendingAmountData, fetchPendingAmountData } =
    useGetPendingAmountData();

  useEffect(() => {
    fetchPendingAmountData();
  }, []);

  const categories = pendingAmountData?.map((item: any) => item.month) || [];
  const totalAmounts = pendingAmountData?.map((item: any) => item.total_amount) || [];
  const pendingAmounts =
  pendingAmountData?.map((item: any) => item.pending_amount) || [];

  const chartOptions = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        endingShape: "rounded",
      },
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      maxTicks: 5,
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "var(--tw-gray-500)",
          fontSize: "12px",
        },
      },
      tooltip: {
        enabled: false,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
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
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    colors: ["#34a853", "#fbbc04"],
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "70%",
            },
          },
        },
      },
    ],
  };

  const chartSeries = [
    {
      name: "Total Amount",
      data: totalAmounts,
    },
    {
      name: "Pending Amount",
      data: pendingAmounts,
    },
  ];

  return (
    <div className="col-span-2">
      <div className="card w-full">
        <div className="card-header">
          <h3 className="card-title">Pending Amount Report</h3>
        </div>

        <div className="card-body grid gap-1">
          <div>
            <ReactApexChart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingAmountReport;
