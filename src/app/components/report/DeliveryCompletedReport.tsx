import { useEffect } from "react";
import { useGetDeliveryCompletedData } from "../../hooks";
import AreaChart from "react-apexcharts";
import { GrCompliance } from "react-icons/gr";

const DeliveryCompletedReport: React.FC = () => {
  const { deliveryCompletedData, fetchDeliveryCompletedData } =
    useGetDeliveryCompletedData();

  useEffect(() => {
    fetchDeliveryCompletedData();
  }, []);

  const categories = deliveryCompletedData
    ? (deliveryCompletedData || []).map((item: { month: any }) => item.month)
    : [];
  const orders = deliveryCompletedData
    ? (deliveryCompletedData || []).map((item: { count: any }) => item.count)
    : [];
  const orderCount =
    deliveryCompletedData?.reduce(
      (sum: number, order: { count: number }) => sum + Number(order.count),
      0
    ) || 0;

  const data = {
    series: [
      {
        name: "Delivery Completed",
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
        marker: {
          strokeColor: "#1976d2",
        },
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
    <>
      <div className="card pb-2.5 max-h-[300px]">
        <div className="card-body card-fit">
          <div className="flex justify-between ml-8">
            <div>
              <h3 className="font-semibold text-[#64748b]">
                Delivery Completed
              </h3>
              <span className="text-[#384551] font-medium ml-1">
                {orderCount}
              </span>
            </div>
            <div className="mr-10 mt-2">
              <GrCompliance size={23} color="rgb(13 202 240)" />
            </div>
          </div>

          <div className="h-[200px] w-100">
            <div className="relative h-full w-full">
              <AreaChart
                options={data.options}
                series={data.series}
                type={data.options.chart.type}
                height={240}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryCompletedReport;
