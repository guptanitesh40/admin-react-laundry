import { useEffect } from "react";
import { useGetDeliveryPendingData } from "../../hooks";
import Chart from "react-apexcharts";

const DeliveryPendingReport = () => {
  const { deliveryPendingData, fetchDeliveryPendingData } =
    useGetDeliveryPendingData();

  useEffect(() => {
    fetchDeliveryPendingData();
  }, []);

  const categories = deliveryPendingData
    ? (deliveryPendingData || []).map((item: { month: any }) => item.month)
    : [];
  const orders = deliveryPendingData
    ? (deliveryPendingData || []).map((item: { count: any }) => item.count)
    : [];

  const orderCount = deliveryPendingData?.reduce(
      (sum: number, order: { count: number }) => sum + Number(order.count),
      0
    ) || 0;  

  const data = {
    series: [
      {
        name: "Delivery Pending",
        data: orders,
      },
    ],
    options: {
      chart: {
        height: 200,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      markers: {
        size: 6,
        colors: ["#ffffff"],
        strokeColors: "#4154f1",
        strokeWidth: 3,
        hover: {
          size: 8,
        },
      },
      colors: ["#4154f1", "#2eca6a", "#ff771d"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.4,
          stops: [0, 90, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
        lineCap: "round",
      },
      grid: {
        borderColor: "rgba(0, 0, 0, 0)",
        padding: {
          top: -20,
          right: 0,
          bottom: 20,
          left: 12,
        },
        marker: {
          strokeColor: "#1976d2",
        },
      },
      yaxis: {
        show: false,
      },
      xaxis: {
        type: "category",
        categories: categories,
        style: {
          colors: "#6c757d",
        },
        axisBorder: {
          show: false,
        },
        crosshairs: {
          show: false,
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
        <div className="card pb-2.5 w-full">
          <div className="card-body grid gap-1">
            <div className="flex flex-col">
              <h3 className="card-title">Delivery Pending</h3>
              <span className="text-[#384551] font-medium ml-1">{orderCount}</span>
            </div>
            <div style={{ height: "150px" }}>
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

export default DeliveryPendingReport;
