import { useEffect, useMemo } from "react";
import { useGetPaymentTypeData } from "../../hooks";
import DonutChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";

const PaymentTypeReport = () => {
  const { paymentTypeData, fetchPaymentTypeData } = useGetPaymentTypeData();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchPaymentTypeData();
  }, []);
  
  const cashOnDelivery = (paymentTypeData ?? []).reduce(
    (sum: number, item: { cash_on_delivery?: number }) => sum + (item.cash_on_delivery ?? 0),
    0
  );
  
  const onlinePayment = (paymentTypeData ?? []).reduce(
    (sum: number, item: { online_payment?: number }) => sum + (item.online_payment ?? 0),
    0
  );
  
  const labels = ["Cash On Delivery", "Online Payment"];
  const data = [cashOnDelivery, onlinePayment];
  
  const options = {
    labels: ["Cash On Delivery", "Online payment"],
    fill: {
      colors: ["var(--tw-primary)", "var(--tw-brand)"],
    },
    chart: {
      type: "donut",
      events: {
        dataPointSelection: (_event: any, _chartContext: any, config: any) => {
          if (config?.dataPointIndex !== undefined) {
            navigate("/orders", {
              state: { paymentType: labels[config.dataPointIndex] },
            });
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
        expandOnClick: true,
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
          <h3 className="card-title">Payment Type</h3>
        </div>

        <div className="card-body grid gap-1 fmobile:justify-center">
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

export default PaymentTypeReport;
