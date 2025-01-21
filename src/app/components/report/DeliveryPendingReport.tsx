import { useEffect } from "react";
import { useGetDeliveryPendingData } from "../../hooks";
import Chart from "react-apexcharts";
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
        height: 200,
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
        curve: "smooth",
        width: 3,
        lineCap: "round",
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
          <div className="card-body card-fit grid gap-1">
            <div className="flex justify-between ml-8">
              <div>
                <h3 className="font-semibold text-[#64748b]">
                  Delivery Pending
                </h3>
                <span className="text-[#384551] font-medium">{orderCount}</span>
              </div>
              <div className="mr-10 mt-2">
                <MdOutlinePendingActions size={26} color="rgb(13 202 240)" />
              </div>
            </div>
            <div className="h-[110px]">
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
