import { useEffect } from "react";
import { useGetPaymentTypeData } from "../../hooks";
import DonutChart from "react-apexcharts";

interface PaymentData {
  payment_type: string;
  count: number;
}

const PaymentTypeReport = () => {
  const { paymentTypeData, fetchPaymentTypeData } = useGetPaymentTypeData();

  useEffect(() => {
    fetchPaymentTypeData();
  }, []);

  const aggregatedData = (paymentTypeData || []).reduce(
    (acc: Record<string, number>, item: PaymentData) => {
      acc[item.payment_type] = (acc[item.payment_type] || 0) + item.count;
      return acc;
    },
    {}
  );

  const data = Object.values(aggregatedData);
  const labels = Object.keys(aggregatedData);

  const options = {
    labels: labels,
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
        <div className="card-header">
          <h3 className="card-title">Payment Type Report</h3>
        </div>

        <div className="card-body grid gap-1">
          <div style={{ height: "210px" }}>
            <DonutChart series={data} options={options} type="donut" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTypeReport;
