import { useEffect } from "react";
import { useGetDeliveryPendingData } from "../../hooks";
import AreaChart from "react-apexcharts";
import { MdOutlinePendingActions } from "react-icons/md";

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

  const orderCount =
    deliveryPendingData?.reduce(
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
        type: "area",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
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
        show: true,
        curve: "smooth",
        lineCap: "butt",
        width: 2,
        dashArray: 0,
      },
      grid: {
        borderColor: "rgba(0, 0, 0, 0)",
        padding: {
          top: 0,
          right: 0,
          bottom: 60,
          left: 0,
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
      markers:
        deliveryPendingData?.length === 1
          ? {
              size: 2,
              colors: "#1976d2",
              strokeColors: "#1976d2",
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
            }
          : {
              size: 0,
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
      <div className="card pb-2.5 max-h-[300px]">
        <div className="flex justify-between ml-8 mt-2">
          <div>
            <h3 className="card-title">Delivery Pending</h3>
            <span className="text-gray-500 font-medium">{orderCount}</span>
          </div>
          <div className="mr-10 mt-2">
            <MdOutlinePendingActions size={26} color="rgb(13 202 240)" />
          </div>
        </div>

        <div className="card-body flex flex-col justify-end items-stretch grow px-0 py-1">
          <AreaChart
            options={data.options}
            series={data.series}
            type={data.options.chart.type}
            height={240}
          />
        </div>
      </div>
    </>
  );
};

export default DeliveryPendingReport;
