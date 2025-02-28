import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetDeliveryData } from "../../hooks";
import DonutChart from "react-apexcharts";

const DeliveryReport: React.FC = () => {
  const navigate = useNavigate();
  const { deliveryData, fetchDeliveryData } = useGetDeliveryData();

  useEffect(() => {
    fetchDeliveryData();
  }, []);

  const deliveryCompleted = deliveryData?.reduce(
    (sum: number, item: { completed: number }) => sum + item.completed,
    0
  ) || 0;

  const deliveryPending = deliveryData?.reduce(
    (sum: number, item: { pending: number }) => sum + item.pending,
    0
  ) || 0;

  const labels = ["Delivery Completed", "Delivery Pending"];
  const data = [deliveryCompleted, deliveryPending];

  const options = {
    labels,
    fill: {
      colors: ["var(--tw-primary)", "var(--tw-brand)"],
    },
    chart: {
      type: "donut",
      events: {
        dataPointSelection: (_event: any, _chartContext: any, config: any) => {
          if (config?.dataPointIndex === 0) {
            navigate("/delivered-orders");
          } else if (config?.dataPointIndex === 1) {
            navigate("/orders");
          }
        },
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["var(--tw-light)"],
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
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
  };

  return (
    <div className="col-span-1">
      <div className="card">
        <div className="card-header border-none">
          <h3 className="card-title">Delivery Report</h3>
        </div>
        <div className="card-body grid gap-1 fmobile:justify-center">
          <DonutChart series={data} options={options} type="donut" height={200} />
        </div>
      </div>
    </div>
  );
};

export default DeliveryReport;
