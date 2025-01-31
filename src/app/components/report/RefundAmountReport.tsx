import React, { useEffect } from "react";
import BarChart from "react-apexcharts";
import { useGetRefundAmountData } from "../../hooks";

const RefundAmountReport: React.FC = () => {
  const { refundAmountData, fetchRefundAmountData } = useGetRefundAmountData();

  useEffect(() => {
    fetchRefundAmountData();
  }, []);

  const categories = refundAmountData?.map((item: any) => item.month) || [];
  const refundAmounts =
    refundAmountData?.map((item: any) => item.total_refund_amount) || [];
  const totalAmounts =
    refundAmountData?.map((item: any) => item.total_amount) || [];

  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        endingShape: "rounded",
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: "var(--tw-gray-500)",
          fontSize: "12px",
        },
      },
      axisTicks: {
        show: false,
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
    colors: ["#1E90FF", "#FF6347"],
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "65%",
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
      name: "Refund Amount",
      data: refundAmounts,
    },
  ];

  return (
    <div className="col-span-1">
      <div className="card w-full">
        <div className="card-header border-none">
          <h2 className="card-title">Refund Amount Report</h2>
        </div>

        <div className="card-body card-fit grid gap-1">
          <div>
            <BarChart
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

export default RefundAmountReport;
