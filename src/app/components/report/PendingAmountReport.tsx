import React, { useEffect } from "react";
import PieChart from "react-apexcharts";
import { useGetPendingAmountData } from "../../hooks";

const PendingAmountReport: React.FC = () => {
  const { pendingAmountData, fetchPendingAmountData } =
    useGetPendingAmountData();

  useEffect(() => {
    fetchPendingAmountData();
  }, []);

  const totalAmounts =
    pendingAmountData?.reduce(
      (sum: number, item: any) => sum + item.total_amount,
      0
    ) || 0;

  const pendingAmounts =
    pendingAmountData?.reduce(
      (sum: number, item: any) => sum + item.pending_amount,
      0
    ) || 0;

  const chartOptions = {
    chart: {
      type: "pie",
    },
    labels: ["Total Amount", "Pending Amount"],
    colors: ["#34a853", "#fbbc04"],
    legend: {
      offsetY: -5,
      offsetX: -10,
      fontSize: "14px",
      fontWeight: "500",
      labels: {
        colors: "var(--tw-gray-700)",
        useSeriesColors: false,
      },
      markers: {
        width: 8,
        height: 8,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    tooltip: {
      enabled: true,
      y: {
        formatter: (value: number) => `${value}`,
      },
    },
  };

  const chartSeries = [totalAmounts, pendingAmounts];

  return (
    <div className="col-span-1">
      <div className="card">
        <div className="card-header border-none">
          <h3 className="card-title">Pending Amount</h3>
        </div>

        <div className="card-body grid gap-1 lgmobile:justify-center">
          <PieChart
            options={chartOptions}
            series={chartSeries}
            type="pie"
            height={210}
          />
        </div>
      </div>
    </div>
  );
};

export default PendingAmountReport;
