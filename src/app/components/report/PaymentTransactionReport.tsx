import { useEffect, useState } from "react";
import { useGetPaymentTransactionData } from "../../hooks";
import AreaChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";

const PaymentTransactionReport: React.FC = () => {
  const { paymentTransactionData, fetchPaymentTransactionData } =
    useGetPaymentTransactionData();

  const navigate = useNavigate();

  useEffect(() => {
    fetchPaymentTransactionData();
  }, []);

  const categories =
    paymentTransactionData?.map((item: { month: any }) => item.month) || [];
  const receivedAmount =
    paymentTransactionData?.map(
      (item: { total_amount: any }) => item.total_amount
    ) || [];

  const totalReceivedAmount = paymentTransactionData?.reduce(
    (sum: any, item: { total_transaction_amount: number }) => sum + item.total_transaction_amount,
    0
  );

  const data = {
    series: [
      {
        name: "Received Amount",
        data: receivedAmount,
      },
    ],
    options: {
      chart: {
        type: "area",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#4154f1", "#2eca6a", "#ff771d"],
      fill: {
        gradient: {
          enabled: true,
          opacityFrom: 0.25,
          opacityTo: 0,
        },
      },
      grid: {
        borderColor: "var(--tw-gray-200)",
        strokeDashArray: 5,
        clipMarkers: false,
        yaxis: {
          lines: {
            show: true,
          },
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      stroke: {
        curve: "smooth",
        show: true,
        width: 2,
        linecap: "butt",
        dashArray: 4,
        colors: ["#dbdfe9"],
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: categories,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
        crosshairs: {
          position: "front",
          stroke: {
            color: "var(--tw-primary)",
            width: 1,
            dashArray: 3,
          },
        },
      },
      yaxis: {
        min: 0,
        tickAmount: 5,
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: "var(--tw-gray-500)",
            fontSize: "12px",
          },
          formatter: (value: any) => {
            if (value >= 1000) {
              return `₹${(value / 1000).toFixed(0)}K`;
            }
            return `${value}`;
          },
        },
      },
      markers: {
        size: 2,
        colors: "#dbdfe9",
        strokeColors: "#dbdfe9",
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
      },
      tooltip: {
        x: {
          format: "MMM yyyy",
        },
      },
    },
  };

  const handleNavigateToPaymentList = () => {
    navigate("/payments");
  };

  return (
    <div
      className="col-span-1 cursor-pointer"
      onClick={handleNavigateToPaymentList}
    >
      <div className="card w-full">
        <div className="card-header border-none flex flex-col mt-2 items-start">
          <h3 className="card-title">Payment Report</h3>
          <h5 className="block text-gray-500 text-sm font-bold">
            <div className="flex flex-wrap flex-row gap-x-2">
              <span>Total Received Amount</span>
              <span> ₹{totalReceivedAmount?.toLocaleString()} </span>
            </div>
          </h5>
        </div>

        <div className="card-body flex flex-col justify-end items-stretch grow px-3 py-1">
          <AreaChart
            options={data.options}
            series={data.series}
            type={data.options.chart.type}
            height={225}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentTransactionReport;
