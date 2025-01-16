import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect } from "react";
import { useGetPaymentTypeData } from "../../hooks";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PaymentData {
  paymentType: string;
  count: number;
}

const PaymentTypeReport = () => {
  const { paymentTypeData, fetchPaymentTypeData } = useGetPaymentTypeData();

  useEffect(() => {
    fetchPaymentTypeData();
  }, []);

  const aggregatedData = (paymentTypeData || []).reduce((acc: Record<string, number>, item: PaymentData) => {
    acc[item.paymentType] = (acc[item.paymentType] || 0) + item.count;
    return acc;
  }, {});

  const formattedData = {
    labels: Object.keys(aggregatedData),
    datasets: [
      {
        data: Object.values(aggregatedData),
        backgroundColor: Object.keys(aggregatedData).map(
          () => `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
        ),
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Payment Type Report</h3>
      </div>

      <div className="card-body flex justify-center items-center px-3 py-1">
        <div style={{ height: "280px" }}>
          <Pie
            data={formattedData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    boxWidth: 20,
                    padding: 20,
                    usePointStyle: true,
                  },
                },
              },
              cutout: "60%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentTypeReport;
