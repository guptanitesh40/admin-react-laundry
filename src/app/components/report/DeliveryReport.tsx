import { useEffect } from "react";
import { useGetDeliveryData } from "../../hooks";
import DonutChart from "react-apexcharts";

const DeliveryReport: React.FC = () => {
  const { deliveryData, fetchDeliveryData } = useGetDeliveryData();

  useEffect(() => {
    fetchDeliveryData();
  }, []);

  const deliveryCompleted = deliveryData?.reduce(
    (sum: any, item: { completed: any }) => item.completed, 0
  )

  const deliveryPending = deliveryData?.reduce(
    (sum: any, item: { pending: any }) => item.pending, 0
  )

  const data = [ deliveryCompleted, deliveryPending]  

  const options = {
    labels: ["Delivery Completed", "Delivery Pending"],
    fill: {
      colors: ["var(--tw-primary)", "var(--tw-brand)"],
    },
    chart: {
      type: "donut",
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

        <div className="card-body grid gap-1">
          <DonutChart
            series={data}
            options={options}
            type="donut"
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryReport;
